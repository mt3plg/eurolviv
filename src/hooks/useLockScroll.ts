import { useEffect } from 'react';

export const useLockScroll = (elementOrRef: React.RefObject<HTMLElement | null> | HTMLElement | null, lock: boolean) => {
  useEffect(() => {
    const el = (elementOrRef && 'current' in elementOrRef) ? elementOrRef.current : elementOrRef;
    if (!el) return;

    if (lock) {
      const scrollTop = el.scrollTop;
      el.style.overflow = 'hidden';
      el.dataset.scrollTop = String(scrollTop);
    } else {
      el.style.overflow = '';
      const scrollTop = el.dataset.scrollTop ? parseInt(el.dataset.scrollTop) : 0;
      el.scrollTop = scrollTop;
      delete el.dataset.scrollTop;
    }
    return () => {
      el.style.overflow = '';
      const scrollTop = el.dataset.scrollTop ? parseInt(el.dataset.scrollTop) : 0;
      el.scrollTop = scrollTop;
      delete el.dataset.scrollTop;
    }
  }, [lock, elementOrRef]);
};
