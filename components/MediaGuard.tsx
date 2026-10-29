'use client';

import { useEffect } from 'react';

const MEDIA = 'img, video, picture, canvas, svg image';

/**
 * Keeps the casual "Save image / Save video as" routes closed: no right-click menu and no dragging on
 * pictures and clips. Text, links and form fields keep their normal menus. A determined visitor can still
 * screen-record, so this deters rather than protects.
 */
export default function MediaGuard() {
  useEffect(() => {
    const block = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(MEDIA)) event.preventDefault();
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('dragstart', block);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('dragstart', block);
    };
  }, []);
  return null;
}
