import { Art, ART_KEYS } from '../core/art';

/** Halaman pengembangan untuk memeriksa semua gambar (hanya di mode dev). */
export default function Galeri() {
  return (
    <div className="page parent">
      <h1>Galeri gambar ({ART_KEYS.length})</h1>
      <div className="galeri">
        {ART_KEYS.map((k) => (
          <figure key={k} className="galeri-item">
            <Art k={k} />
            <figcaption>{k}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
