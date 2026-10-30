import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { EMPTY_MANIFEST, voiceKey } from '../../src/core/audio/voiceKey';
import { PRAISE, rewardStars } from '../../src/core/audio/phrases';
import { collectPhrases } from './collect';
import { ElevenLabsError, createClient } from './elevenlabs';
import { clipFile, generateVoice } from './generate';

const voice = { voiceId: 'v', modelId: 'm', outputFormat: 'mp3_22050_32', version: 'aaa111' };
const phrase = (text: string, source = 'ui') => ({ key: voiceKey(text), text, sources: [source] });

const fakeClient = (fail: (t: string, n: number) => Error | null = () => null) => {
  const calls: string[] = [];
  return {
    calls,
    synthesize: async (t: string) => {
      calls.push(t);
      const err = fail(t, calls.filter((c) => c === t).length);
      if (err) throw err;
      return new TextEncoder().encode(`audio:${t}`);
    },
  };
};

describe('pengumpulan kalimat', () => {
  it('memuat konten permainan, kalimat UI, judul, dan stiker tanpa duplikat', async () => {
    const phrases = await collectPhrases();
    const texts = phrases.map((p) => p.text);
    expect(texts).toContain('Mana bola merah?');
    expect(texts).toContain(PRAISE[0]);
    expect(texts).toContain(rewardStars(3));
    expect(texts).toContain('Cari Warna');
    expect(texts).toContain('Stiker baru: Matahari!');
    expect(new Set(phrases.map((p) => p.key)).size).toBe(phrases.length);
  });
});

describe('generateVoice', () => {
  const dir = () => mkdtempSync(join(tmpdir(), 'voice-'));

  it('uji kering tidak memanggil API', async () => {
    const client = fakeClient();
    const r = await generateVoice({
      phrases: [phrase('Halo'), phrase('Dadah')],
      manifest: EMPTY_MANIFEST,
      outDir: dir(),
      client,
      voice,
      dryRun: true,
    });
    expect(r.todo).toHaveLength(2);
    expect(r.chars).toBe(9);
    expect(client.calls).toEqual([]);
  });

  it('membuat berkas, mengisi manifest, dan melewati yang sudah ada', async () => {
    const out = dir();
    const client = fakeClient();
    const phrases = [phrase('Halo'), phrase('Dadah')];
    const r1 = await generateVoice({
      phrases,
      manifest: EMPTY_MANIFEST,
      outDir: out,
      client,
      voice,
    });
    expect(r1.generated).toBe(2);
    const file = clipFile(voiceKey('Halo'), voice.version);
    expect(readFileSync(join(out, file), 'utf8')).toBe('audio:Halo');
    expect(r1.manifest.clips[voiceKey('Halo')]).toEqual({ file, text: 'Halo' });

    const r2 = await generateVoice({ phrases, manifest: r1.manifest, outDir: out, client, voice });
    expect(r2.todo).toHaveLength(0);
    expect(client.calls).toHaveLength(2);
  });

  it('membuat ulang dan menghapus berkas lama saat suara diganti', async () => {
    const out = dir();
    const phrases = [phrase('Halo')];
    const r1 = await generateVoice({
      phrases,
      manifest: EMPTY_MANIFEST,
      outDir: out,
      client: fakeClient(),
      voice,
    });
    const r2 = await generateVoice({
      phrases,
      manifest: r1.manifest,
      outDir: out,
      client: fakeClient(),
      voice: { ...voice, version: 'bbb222' },
    });
    expect(r2.generated).toBe(1);
    expect(readdirSync(out)).toEqual([clipFile(voiceKey('Halo'), 'bbb222')]);
  });

  it('menghapus rekaman kalimat yang sudah tidak dipakai (hanya pada proses penuh)', async () => {
    const out = dir();
    const r1 = await generateVoice({
      phrases: [phrase('Halo'), phrase('Lama')],
      manifest: EMPTY_MANIFEST,
      outDir: out,
      client: fakeClient(),
      voice,
    });
    writeFileSync(join(out, 'sampah.mp3'), '');
    const r2 = await generateVoice({
      phrases: [phrase('Halo')],
      manifest: r1.manifest,
      outDir: out,
      client: fakeClient(),
      voice,
    });
    expect(r2.pruned).toBe(2);
    expect(Object.keys(r2.manifest.clips)).toEqual([voiceKey('Halo')]);
  });

  it('--limit dan --only membatasi kalimat tanpa menghapus yang lain', async () => {
    const out = dir();
    const phrases = [phrase('A1', 'ui'), phrase('B1', 'g'), phrase('B2', 'g')];
    const r = await generateVoice({
      phrases,
      manifest: EMPTY_MANIFEST,
      outDir: out,
      client: fakeClient(),
      voice,
      only: 'g',
      limit: 1,
    });
    expect(r.todo.map((p) => p.text)).toEqual(['B1']);
    expect(r.pruned).toBe(0);
  });

  it('mencoba ulang galat 429 dengan jeda', async () => {
    const client = fakeClient((_t, n) => (n < 3 ? new ElevenLabsError('sibuk', 429, true) : null));
    const waits: number[] = [];
    const r = await generateVoice({
      phrases: [phrase('Halo')],
      manifest: EMPTY_MANIFEST,
      outDir: dir(),
      client,
      voice,
      sleep: async (ms) => void waits.push(ms),
    });
    expect(r.generated).toBe(1);
    expect(waits).toEqual([1000, 2000]);
  });

  it('berhenti total pada kunci API salah dan menyimpan hasil sebagian', async () => {
    const out = dir();
    const client = fakeClient((t) =>
      t === 'B' ? new ElevenLabsError('unauthorized', 401, false) : null,
    );
    const err = (await generateVoice({
      phrases: [phrase('A'), phrase('B'), phrase('C'), phrase('D')],
      manifest: EMPTY_MANIFEST,
      outDir: out,
      client,
      voice,
      concurrency: 1,
    }).catch((e: unknown) => e)) as { partial: { generated: number } };
    expect(err.partial.generated).toBe(1);
    expect(client.calls).toEqual(['A', 'B']);
    expect(existsSync(join(out, clipFile(voiceKey('A'), voice.version)))).toBe(true);
  });
});

describe('klien ElevenLabs', () => {
  it('mengirim permintaan TTS sesuai API', async () => {
    let req: { url: string; init: RequestInit } | null = null;
    const client = createClient({
      apiKey: 'kunci',
      voiceId: 'suara1',
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_22050_32',
      voiceSettings: { stability: 0.5, similarity_boost: 0.75, style: 0, use_speaker_boost: true },
      fetchImpl: (async (url: string, init: RequestInit) => {
        req = { url, init };
        return new Response(new Uint8Array([1, 2, 3]));
      }) as typeof fetch,
    });
    expect(await client.synthesize('Halo')).toEqual(new Uint8Array([1, 2, 3]));
    expect(req!.url).toBe(
      'https://api.elevenlabs.io/v1/text-to-speech/suara1?output_format=mp3_22050_32',
    );
    expect((req!.init.headers as Record<string, string>)['xi-api-key']).toBe('kunci');
    expect(JSON.parse(req!.init.body as string)).toMatchObject({
      text: 'Halo',
      model_id: 'eleven_multilingual_v2',
    });
  });

  it('menandai 429 sebagai bisa dicoba ulang dan 401 tidak', async () => {
    const mk = (status: number) =>
      createClient({
        apiKey: 'k',
        voiceId: 'v',
        modelId: 'm',
        outputFormat: 'f',
        voiceSettings: { stability: 0, similarity_boost: 0, style: 0, use_speaker_boost: false },
        fetchImpl: (async () => new Response('{"detail":"x"}', { status })) as typeof fetch,
      });
    await expect(mk(429).synthesize('a')).rejects.toMatchObject({ retryable: true });
    await expect(mk(401).synthesize('a')).rejects.toMatchObject({ retryable: false, status: 401 });
  });
});
