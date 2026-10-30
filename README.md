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

## Deploy ke Vercel

1. Di Vercel: **Add New → Project → Import** repositori GitHub ini.
2. Framework preset **Vite**, build `npm run build`, output `dist` (sudah diatur di `vercel.json`).
3. Beri nama proyek `main-bersama` (atau `main-bersama-anak` bila sudah dipakai).
4. Branch `main` = produksi; branch lain dan PR otomatis mendapat preview deployment.

## Status

Fase 0 (fondasi + Uji Suara) selesai. Permainan contoh: **Cari Warna** (40 item, di luar katalog 30).
