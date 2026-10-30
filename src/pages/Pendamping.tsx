import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AgePicker } from '../app/AgePicker';
import { usePwa } from '../app/pwa';
import { IconBack } from '../core/art';
import { useVoiceStatus } from '../core/audio';
import { useProgress, useSettings } from '../core/progress';
import { BigButton } from '../core/ui';
import { GAMES } from '../games/registry';

function VoiceWarning() {
  const { ready, supported, hasIndonesian } = useVoiceStatus();
  if (!ready) return null;
  if (!supported)
    return (
      <div className="notice notice-warn">
        Browser ini tidak mendukung suara ucapan. Instruksi tetap tampil sebagai teks dan gambar.
      </div>
    );
  if (!hasIndonesian)
    return (
      <div className="notice notice-warn">
        Perangkat ini belum punya suara Bahasa Indonesia, jadi instruksi tidak dibacakan. Pasang
        suaranya dengan panduan di bawah, lalu buka ulang aplikasi.
      </div>
    );
  return null;
}

function ResetProgress() {
  const [step, setStep] = useState(0);
  const reset = useProgress((s) => s.reset);
  if (step === 0)
    return (
      <BigButton variant="soft" size="md" onClick={() => setStep(1)}>
        Setel ulang progres
      </BigButton>
    );
  if (step === 1)
    return (
      <div className="confirm">
        <p>Semua bintang, level, dan stiker di perangkat ini akan hilang. Lanjutkan?</p>
        <BigButton variant="soft" size="md" onClick={() => setStep(2)}>
          Ya, lanjutkan
        </BigButton>
        <BigButton variant="ghost" size="md" onClick={() => setStep(0)}>
          Batal
        </BigButton>
      </div>
    );
  if (step === 2)
    return (
      <div className="confirm">
        <p>
          <strong>Konfirmasi terakhir.</strong> Tindakan ini tidak bisa dibatalkan.
        </p>
        <BigButton
          variant="soft"
          size="md"
          onClick={() => {
            reset();
            setStep(3);
          }}
        >
          Hapus semua progres
        </BigButton>
        <BigButton variant="ghost" size="md" onClick={() => setStep(0)}>
          Batal
        </BigButton>
      </div>
    );
  return <p className="notice">Progres sudah disetel ulang.</p>;
}

export default function Pendamping() {
  const navigate = useNavigate();
  const settings = useSettings();
  const { needRefresh, offlineReady, update } = usePwa();

  return (
    <div className="page parent">
      <header className="page-bar">
        <BigButton variant="ghost" size="md" icon={<IconBack />} onClick={() => navigate('/')}>
          Menu
        </BigButton>
        <h1>Untuk Pendamping</h1>
      </header>

      {needRefresh && (
        <div className="notice notice-info">
          Versi baru tersedia.{' '}
          <button type="button" className="link-btn" onClick={update}>
            Perbarui sekarang
          </button>{' '}
          (atau otomatis saat aplikasi dibuka ulang).
        </div>
      )}
      {offlineReady && !needRefresh && (
        <div className="notice">Aplikasi siap dimainkan tanpa internet.</div>
      )}
      <VoiceWarning />

      <section className="panel">
        <h2>Usia anak</h2>
        <p className="muted">Mengatur jumlah pilihan dan tingkat kesulitan awal.</p>
        <AgePicker />
      </section>

      <section className="panel">
        <h2>Suara</h2>
        <label className="field">
          <span>Volume: {Math.round(settings.volume * 100)}%</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            onChange={(e) => settings.update({ volume: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>Kecepatan bicara: {settings.speechRate.toFixed(2)}</span>
          <input
            type="range"
            min={0.6}
            max={1.1}
            step={0.05}
            value={settings.speechRate}
            onChange={(e) => settings.update({ speechRate: Number(e.target.value) })}
          />
        </label>
        <Link className="btn btn-soft btn-md" to="/pendamping/uji-suara">
          Buka Uji Suara
        </Link>
      </section>

      <section className="panel">
        <h2>Pengingat istirahat</h2>
        <label className="field field-inline">
          <input
            type="checkbox"
            checked={settings.breakReminder}
            onChange={(e) => settings.update({ breakReminder: e.target.checked })}
          />
          <span>Tampilkan "Yuk istirahat" setelah</span>
          <select
            value={settings.breakMinutes}
            onChange={(e) => settings.update({ breakMinutes: Number(e.target.value) })}
          >
            {[10, 15, 20, 30].map((m) => (
              <option key={m} value={m}>
                {m} menit
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="panel">
        <h2>Pasang di layar utama (bisa main tanpa internet)</h2>
        <h3>iPad / iPhone (Safari)</h3>
        <ol>
          <li>Buka alamat aplikasi di Safari.</li>
          <li>
            Ketuk ikon <strong>Bagikan</strong> (kotak dengan panah ke atas). Pada versi iPadOS
            terbaru, ikon ini bisa berada di menu <strong>•••</strong>.
          </li>
          <li>
            Pilih <strong>Tambah ke Layar Utama</strong>, lalu <strong>Tambah</strong>.
          </li>
        </ol>
        <h3>Tablet Android (Chrome)</h3>
        <ol>
          <li>Buka alamat aplikasi di Chrome.</li>
          <li>
            Ketuk menu <strong>⋮</strong> lalu <strong>Instal aplikasi</strong> atau{' '}
            <strong>Tambahkan ke layar utama</strong>.
          </li>
        </ol>
        <p className="muted">
          Buka aplikasi sekali saat online setelah dipasang agar semua isi tersimpan untuk dimainkan
          offline.
        </p>
      </section>

      <section className="panel">
        <h2>Memasang suara Bahasa Indonesia</h2>
        <p className="muted">
          Nama menu bisa sedikit berbeda tergantung merek dan versi perangkat.
        </p>
        <h3>iPad / iPhone</h3>
        <ol>
          <li>
            Buka <strong>Pengaturan → Aksesibilitas → Konten Lisan → Suara</strong>.
          </li>
          <li>
            Pilih <strong>Bahasa Indonesia</strong>, lalu unduh suara yang tersedia (versi
            "Ditingkatkan"/"Enhanced" biasanya lebih natural).
          </li>
          <li>Tutup aplikasi Main Bersama sepenuhnya, lalu buka lagi.</li>
        </ol>
        <h3>Android</h3>
        <ol>
          <li>
            Buka <strong>Pengaturan → Sistem → Bahasa & masukan → Output text-to-speech</strong>.
          </li>
          <li>
            Pilih mesin <strong>Google</strong> (Speech Services by Google), ketuk ikon pengaturan,
            lalu <strong>Instal data suara → Bahasa Indonesia</strong>.
          </li>
          <li>Tutup Chrome sepenuhnya, lalu buka lagi.</li>
        </ol>
        <p className="muted">
          Cek hasilnya di halaman <Link to="/pendamping/uji-suara">Uji Suara</Link>.
        </p>
      </section>

      <section className="panel">
        <h2>Tips mendampingi</h2>
        <ul>
          <li>Duduk di samping anak dan ikut menyebut nama benda atau warna dengan keras.</li>
          <li>Puji usahanya ("Kamu terus mencoba!"), bukan hanya hasilnya.</li>
          <li>Sesi pendek 10-15 menit lebih baik daripada lama sekaligus.</li>
          <li>Layar tidak menggantikan benda nyata: lanjutkan dengan aktivitas di bawah.</li>
        </ul>
      </section>

      <section className="panel">
        <h2>Aktivitas nyata per permainan</h2>
        {GAMES.map(({ meta, guide }) => (
          <div key={meta.id} className="guide">
            <h3>{meta.title}</h3>
            <p>{guide.tujuan}</p>
            <ul>
              {guide.aktivitas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Peninjauan konten</h2>
        <label className="field field-inline">
          <input
            type="checkbox"
            checked={settings.reviewMode}
            onChange={(e) => settings.update({ reviewMode: e.target.checked })}
          />
          <span>Mode peninjauan</span>
        </label>
        {settings.reviewMode && (
          <Link className="btn btn-soft btn-md" to="/pendamping/tinjau">
            Lihat konten yang perlu ditinjau
          </Link>
        )}
      </section>

      <section className="panel">
        <h2>Progres</h2>
        <ResetProgress />
      </section>

      <section className="panel">
        <h2>Privasi</h2>
        <p>
          Tanpa akun, tanpa iklan, tanpa pelacak. Progres hanya tersimpan di perangkat ini. Versi{' '}
          {__APP_VERSION__}.
        </p>
      </section>
    </div>
  );
}
