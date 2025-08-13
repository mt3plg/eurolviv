import {useRef, useEffect} from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

export const VideoPlayer = ({src, autoplay = true}: {src: string; autoplay?: boolean}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!container.current || playerRef.current) return;

    const videoEl = document.createElement('video-js');
    videoEl.className = 'video-js vjs-big-play-centered w-full h-full';
    container.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      autoplay,
      muted: true,
      loop: true,
      controls: false,
      responsive: true,
      fluid: true,
      preload: 'metadata',
      playsinline: true,
      sources: [
        {
          src,
          type: src.endsWith('.m3u8')
            ? 'application/x-mpegURL'
            : 'video/mp4',
        },
      ],
    });
  }, [src, autoplay]);

  useEffect(() => () => {
    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  }, []);

  return (
    <div data-vjs-player className='w-full h-full'>
      <div ref={container} className='w-full h-full'/>
    </div>
  );
};
