import { render } from '@testing-library/react';
import { ART_KEYS } from './keys';
import { ART, Art } from './registry';
import { shade } from './colors';

describe('core/art', () => {
  it('registri komponen sama persis dengan daftar ART_KEYS', () => {
    expect(Object.keys(ART).sort()).toEqual([...ART_KEYS].sort());
  });

  it('setiap komponen merender SVG dengan warna parametrik', () => {
    for (const k of ART_KEYS) {
      const { container, unmount } = render(<Art k={k} color="#123456" />);
      expect(container.querySelector('svg')).not.toBeNull();
      expect(container.innerHTML).toContain('#123456');
      unmount();
    }
  });

  it('shade menggelapkan dan menerangkan warna', () => {
    expect(shade('#808080', -0.5)).toBe('#404040');
    expect(shade('#000000', 1)).toBe('#ffffff');
  });
});
