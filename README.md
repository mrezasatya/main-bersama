# Main Bersama

Web app permainan edukatif untuk anak usia 2-6 tahun, didampingi orang tua. Bahasa Indonesia,
tanpa akun, tanpa iklan, tanpa pelacak, bisa dipasang dan dimainkan offline (PWA).

- Brief lengkap: [`main-bersama-brief.md`](main-bersama-brief.md)
- Konteks untuk Claude Code: [`CLAUDE.md`](CLAUDE.md)

## Menjalankan

```bash
npm install
npm run dev
```

Pemeriksaan lengkap (lint, format, tipe, tes, validasi konten, build):

```bash
npm run check
```

Smoke test di 3 ukuran layar (setelah build):

```bash
npm run test:e2e
```

## Rekaman suara (ElevenLabs)

Semua kalimat yang dibacakan aplikasi dibuat sekali menjadi MP3 dengan ElevenLabs, disimpan di
`public/voice/`, lalu di-commit. Aplikasi memutar rekaman itu (juga offline). Kalimat yang belum
punya rekaman dibacakan suara perangkat. Kunci API hanya dipakai di komputer Anda, tidak pernah di
aplikasi atau di Vercel.

1. Salin `.env.example` menjadi `.env.local`, lalu isi `ELEVENLABS_API_KEY`.
2. Pilih suara. Suara dari Voice Library harus ditambahkan ke **My Voices** dulu, lalu:

   ```bash
   npm run voice -- --list-voices
   ```

   Salin `voice_id` ke `ELEVENLABS_VOICE_ID`.

3. Cek jumlah kalimat dan karakter (gratis, tanpa memanggil API):

   ```bash
   npm run voice -- --dry-run
   ```

4. Buat beberapa rekaman dulu, lalu dengarkan di halaman Uji Suara (`npm run dev`):

   ```bash
   npm run voice -- --limit 5
   ```

5. Kalau suaranya sudah cocok, buat semuanya:

   ```bash
   npm run voice
   ```

6. Commit folder `public/voice`, lalu push.

Skrip ini aman dijalankan berulang: hanya kalimat baru atau yang berubah yang dibuat, jadi kuota
tidak terbuang. Mengganti suara, model, atau pengaturan suara otomatis membuat ulang semua
rekaman. `--force` membuat ulang semuanya, dan `--only <id-permainan|ui|stiker|judul>` membatasi
ke satu sumber.

## Deploy ke Vercel

1. Di Vercel: **Add New → Project → Import** repositori GitHub ini.
2. Framework preset **Vite**, build `npm run build`, output `dist` (sudah diatur di `vercel.json`).
3. Beri nama proyek `main-bersama` (atau `main-bersama-anak` bila sudah dipakai).
4. Branch `main` = produksi; branch lain dan PR otomatis mendapat preview deployment.

## Status

Fase 0 (fondasi + Uji Suara) selesai. Permainan contoh: **Cari Warna** (40 item, di luar katalog 30).
