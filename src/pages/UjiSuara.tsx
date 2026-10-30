import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  audioState,
  currentVoice,
  isIndonesian,
  noteFreq,
  rankIndonesianVoices,
  scoreVoice,
  sfx,
  speak,
  stopSpeaking,
  tone,
  unlockAudio,
  useVoiceStatus,
  type SpeakOutcome,
} from '../core/audio';
import { useSettings } from '../core/progress';

const SAMPLES = [
  { label: 'Sapaan', text: 'Halo! Ayo main bersama. Siapa namamu?' },
  {
    label: 'Angka',
    text: 'Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.',
  },
  {
    label: 'Bunyi hewan',
    text: 'Kambing berbunyi mbeek. Ayam berkokok kukuruyuk. Kucing mengeong meong.',
  },
  { label: 'Suku kata', text: 'Ba, bi, bu, be, bo. Bola. Ku-da. Ma-ta-ha-ri.' },
  { label: 'Instruksi', text: 'Mana bola merah? Ayo coba lagi. Hore, kamu berhasil!' },
  {
    label: 'Cerita',
    text: 'Pagi itu, Kancil berjalan ke tepi sungai. Ia ingin menyeberang, tetapi airnya dalam. Apa yang harus dilakukan Kancil?',
  },
];

const OUTCOME_TEXT: Record<SpeakOutcome, string> = {
  spoken: 'Selesai dibacakan.',
  'no-voice': 'Tidak ada suara Bahasa Indonesia. Teks tetap tampil di layar.',
  unsupported: 'Browser tidak mendukung suara ucapan.',
  error: 'Terjadi galat saat membacakan.',
  interrupted: 'Dihentikan.',
};

const SCALES: Record<string, string[]> = {
  'Do-re-mi (C mayor)': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  'Pentatonik (do-re-mi-sol-la)': ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'],
};

function playScale(notes: string[], type: OscillatorType) {
  notes.forEach((n, i) => tone(noteFreq(n), 0.4, { type, delay: i * 0.3, gain: 0.3 }));
}

export default function UjiSuara() {
  const { supported, ready, voices } = useVoiceStatus();
  const settings = useSettings();
  const [text, setText] = useState(SAMPLES[0]!.text);
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState('');
  const [ctxState, setCtxState] = useState(audioState());

  useEffect(() => {
    const t = window.setInterval(() => setCtxState(audioState()), 1000);
    return () => {
      window.clearInterval(t);
      stopSpeaking();
    };
  }, []);

  const online = navigator.onLine;
  const indo = rankIndonesianVoices(voices, online);
  const active = currentVoice();
  const listed = showAll ? voices : indo;

  const run = async (t: string, opts: Parameters<typeof speak>[1] = {}) => {
    setStatus('Membacakan…');
    const started = performance.now();
    const out = await speak(t, opts);
    const secs = ((performance.now() - started) / 1000).toFixed(1);
    setStatus(`${OUTCOME_TEXT[out]}${out === 'spoken' ? ` (${secs} detik)` : ''}`);
  };

  return (
    <div className="page parent">
      <header className="page-bar">
        <Link className="btn btn-ghost btn-md" to="/pendamping">
          Kembali
        </Link>
        <h1>Uji Suara</h1>
      </header>

      <section className="panel">
        <h2>Ringkasan perangkat</h2>
        <dl className="kv">
          <dt>Suara ucapan (TTS)</dt>
          <dd>{supported ? 'Didukung' : 'Tidak didukung'}</dd>
          <dt>Jumlah suara terdeteksi</dt>
          <dd>{ready ? voices.length : 'memuat…'}</dd>
          <dt>Suara Bahasa Indonesia</dt>
          <dd>{indo.length}</dd>
          <dt>Suara yang dipakai</dt>
          <dd>
            {active
              ? `${active.name} (${active.lang}${active.localService ? ', lokal' : ', jaringan'})`
              : '—'}
            {settings.voiceURI ? ' · dipilih manual' : ' · otomatis'}
          </dd>
          <dt>Koneksi</dt>
          <dd>{online ? 'Online' : 'Offline'}</dd>
          <dt>Web Audio</dt>
          <dd>{ctxState}</dd>
          <dt>Browser</dt>
          <dd className="small">{navigator.userAgent}</dd>
        </dl>
        {indo.some((v) => !v.localService) && (
          <p className="muted">
            Suara "jaringan" butuh internet. Saat offline, aplikasi otomatis memilih suara lokal
            bila ada.
          </p>
        )}
      </section>

      <section className="panel">
        <h2>Uji kalimat</h2>
        <div className="chip-row">
          {SAMPLES.map((s) => (
            <button key={s.label} type="button" className="chip" onClick={() => setText(s.text)}>
              {s.label}
            </button>
          ))}
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} />
        <div className="btn-row">
          <button type="button" className="btn btn-primary btn-md" onClick={() => void run(text)}>
            Bacakan
          </button>
          <button type="button" className="btn btn-ghost btn-md" onClick={() => stopSpeaking()}>
            Hentikan
          </button>
        </div>
        {status && <p className="notice">{status}</p>}
      </section>

      <section className="panel">
        <h2>Uji kecepatan bicara</h2>
        <p className="muted">Bandingkan, lalu pilih yang paling jelas untuk anak.</p>
        <div className="btn-row">
          {[0.7, 0.8, 0.85, 0.9, 1].map((r) => (
            <button
              key={r}
              type="button"
              className={`btn btn-md ${settings.speechRate === r ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => {
                settings.update({ speechRate: r });
                void run('Mana bola merah? Ayo cari bersama.', { rate: r });
              }}
            >
              {r.toFixed(2)}
            </button>
          ))}
        </div>
        <p className="muted">Kecepatan yang dipilih: {settings.speechRate.toFixed(2)}</p>
      </section>

      <section className="panel">
        <h2>Daftar suara</h2>
        <label className="field field-inline">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
          <span>Tampilkan semua bahasa</span>
        </label>
        <div className="btn-row">
          <button
            type="button"
            className={`btn btn-md ${settings.voiceURI === null ? 'btn-primary' : 'btn-soft'}`}
            onClick={() => settings.update({ voiceURI: null })}
          >
            Pilih otomatis
          </button>
        </div>
        {listed.length === 0 ? (
          <p className="notice notice-warn">
            Tidak ada suara Bahasa Indonesia. Lihat panduan pemasangan di halaman Pendamping.
          </p>
        ) : (
          <table className="review-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Bahasa</th>
                <th>Jenis</th>
                <th>Skor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listed.map((v) => (
                <tr key={v.voiceURI} className={active?.voiceURI === v.voiceURI ? 'is-active' : ''}>
                  <td>{v.name}</td>
                  <td>{v.lang}</td>
                  <td>{v.localService ? 'lokal' : 'jaringan'}</td>
                  <td>{isIndonesian(v) ? scoreVoice(v, online) : '—'}</td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn btn-soft btn-sm"
                      onClick={() => void run(text, { voiceURI: v.voiceURI })}
                    >
                      Uji
                    </button>
                    {isIndonesian(v) && (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => settings.update({ voiceURI: v.voiceURI })}
                      >
                        Pakai
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="panel">
        <h2>Uji nada (Web Audio)</h2>
        <p className="muted">
          Di iPad/iPhone, bila nada tidak terdengar, matikan sakelar senyap atau naikkan volume.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-soft btn-md" onClick={() => void unlockAudio()}>
            Aktifkan audio
          </button>
          {Object.entries(SCALES).map(([name, notes]) => (
            <button
              key={name}
              type="button"
              className="btn btn-soft btn-md"
              onClick={() => playScale(notes, 'triangle')}
            >
              {name}
            </button>
          ))}
          <button type="button" className="btn btn-soft btn-md" onClick={() => tone(440, 1)}>
            Nada A 440 Hz
          </button>
        </div>
        <h3>Efek bawaan</h3>
        <div className="btn-row">
          <button type="button" className="btn btn-soft btn-md" onClick={sfx.success}>
            Berhasil
          </button>
          <button type="button" className="btn btn-soft btn-md" onClick={sfx.tryAgain}>
            Coba lagi
          </button>
          <button type="button" className="btn btn-soft btn-md" onClick={sfx.star}>
            Bintang
          </button>
          <button type="button" className="btn btn-soft btn-md" onClick={sfx.tap}>
            Ketuk
          </button>
        </div>
        <h3>Suara + nada bersamaan</h3>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-soft btn-md"
            onClick={() => {
              sfx.success();
              void run('Hore, kamu berhasil!');
            }}
          >
            Uji tumpang tindih
          </button>
        </div>
      </section>
    </div>
  );
}
