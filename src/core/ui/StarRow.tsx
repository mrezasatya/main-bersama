import { IconStar } from '../art/icons';

export function StarRow({
  earned,
  total = 3,
  animate = false,
}: {
  earned: number;
  total?: number;
  animate?: boolean;
}) {
  return (
    <div className={`star-row ${animate ? 'is-animated' : ''}`} aria-label={`${earned} bintang`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`star ${i < earned ? 'is-on' : ''}`}
          style={{ animationDelay: `${0.15 + i * 0.35}s` }}
        >
          <IconStar filled={i < earned} />
        </span>
      ))}
    </div>
  );
}
