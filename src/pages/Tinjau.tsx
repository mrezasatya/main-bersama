import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STICKERS } from '../core/progress';
import { loadAllContent } from '../games/registry';
import type { ContentItem } from '../types';

interface Row {
  source: string;
  items: Pick<ContentItem, 'id' | 'speak' | 'tags'>[];
}

/** Daftar konten berstatus 'perlu-ditinjau' (mode peninjauan pendamping). */
export default function Tinjau() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    void loadAllContent().then((all) => {
      const games = all.map(({ game, items }) => ({
        source: `${game.meta.title} (${items.length} item)`,
        items: items.filter((it) => it.review === 'perlu-ditinjau'),
      }));
      const stickers = {
        source: `Album Stiker (${STICKERS.length} stiker)`,
        items: STICKERS.filter((s) => s.review === 'perlu-ditinjau').map((s) => ({
          id: s.id,
          speak: s.name,
          tags: [s.category],
        })),
      };
      setRows([...games, stickers]);
    });
  }, []);

  return (
    <div className="page parent">
      <header className="page-bar">
        <Link className="btn btn-ghost btn-md" to="/pendamping">
          Kembali
        </Link>
        <h1>Tinjau Konten</h1>
      </header>
      {!rows && <p>Memuat…</p>}
      {rows?.map((r) => (
        <section key={r.source} className="panel">
          <h2>{r.source}</h2>
          {r.items.length === 0 ? (
            <p>Tidak ada item yang perlu ditinjau.</p>
          ) : (
            <table className="review-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Teks</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                {r.items.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <code>{it.id}</code>
                    </td>
                    <td>{it.speak}</td>
                    <td>{it.tags.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
      <p className="muted">
        Untuk menandai sudah ditinjau, ubah <code>review</code> menjadi <code>"ditinjau"</code> di
        berkas <code>content.json</code> permainan terkait.
      </p>
    </div>
  );
}
