/** Klien minimal REST API ElevenLabs (tanpa SDK, hanya fetch). */

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId: string;
  outputFormat: string;
  /** Dikirim sebagai language_code bila diisi (hanya model yang mendukung penegakan bahasa). */
  languageCode?: string;
  voiceSettings: {
    stability: number;
    similarity_boost: number;
    style: number;
    use_speaker_boost: boolean;
    speed?: number;
  };
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export interface VoiceSummary {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
}

export class ElevenLabsError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly retryable: boolean,
  ) {
    super(message);
  }
}

const DEFAULT_BASE = 'https://api.elevenlabs.io';

async function errorFrom(res: Response): Promise<ElevenLabsError> {
  let detail = '';
  try {
    detail = JSON.stringify((await res.json()) as unknown);
  } catch {
    detail = await res.text().catch(() => '');
  }
  // 429 = terlalu banyak permintaan bersamaan; 5xx = gangguan sementara.
  const retryable = res.status === 429 || res.status >= 500;
  return new ElevenLabsError(
    `ElevenLabs ${res.status}: ${detail.slice(0, 300)}`,
    res.status,
    retryable,
  );
}

export function createClient(cfg: ElevenLabsConfig) {
  const base = cfg.baseUrl ?? DEFAULT_BASE;
  const f = cfg.fetchImpl ?? fetch;
  const headers = { 'xi-api-key': cfg.apiKey };

  return {
    async synthesize(text: string): Promise<Uint8Array> {
      const url = `${base}/v1/text-to-speech/${encodeURIComponent(cfg.voiceId)}?output_format=${encodeURIComponent(cfg.outputFormat)}`;
      const body: Record<string, unknown> = {
        text,
        model_id: cfg.modelId,
        voice_settings: cfg.voiceSettings,
      };
      if (cfg.languageCode) body.language_code = cfg.languageCode;
      const res = await f(url, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw await errorFrom(res);
      return new Uint8Array(await res.arrayBuffer());
    },

    async listVoices(): Promise<VoiceSummary[]> {
      const res = await f(`${base}/v1/voices`, { headers });
      if (!res.ok) throw await errorFrom(res);
      return ((await res.json()) as { voices: VoiceSummary[] }).voices;
    },

    /** Sisa kuota karakter bulan ini; null bila tidak bisa dibaca (izin kunci API terbatas). */
    async quota(): Promise<{ used: number; limit: number } | null> {
      const res = await f(`${base}/v1/user/subscription`, { headers });
      if (!res.ok) return null;
      const j = (await res.json()) as { character_count: number; character_limit: number };
      return { used: j.character_count, limit: j.character_limit };
    },
  };
}

export type ElevenLabsClient = ReturnType<typeof createClient>;
