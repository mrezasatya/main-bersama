import { render } from '@testing-library/react';
import { ART_KEYS, BASIC_KEYS } from './keys';
import { ART, Art } from './registry';
import { shade } from './colors';

describe('core/art', () => {
  it('registri komponen sama persis dengan daftar ART_KEYS', () => {
    expect(Object.keys(ART).sort()).toEqual([...ART_KEYS].sort());
    expect(new Set(ART_KEYS).size).toBe(ART_KEYS.length);
  });

  it('setiap gambar merender SVG tanpa galat', () => {
    for (const k of ART_KEYS) {
      const { container, unmount } = render(<Art k={k} />);
      expect(container.querySelector('svg'), k).not.toBeNull();
      unmount();
    }
  });

  it('benda dasar menerima warna parametrik', () => {
    for (const k of BASIC_KEYS) {
      const { container, unmount } = render(<Art k={k} color="#123456" />);
      expect(container.innerHTML).toContain('#123456');
      unmount();
    }
  });

  it('shade menggelapkan dan menerangkan warna', () => {
    expect(shade('#808080', -0.5)).toBe('#404040');
    expect(shade('#000000', 1)).toBe('#ffffff');
  });
});
