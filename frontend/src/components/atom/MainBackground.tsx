import { FC, useEffect, useState } from 'react';
import backgroundImage from '@/assets/background/header-background.webp';
import Image from 'next/image';

/**
 * Top page background.
 * The background is darkened by one step when scrolling.
 */
const MainBackground: FC = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.6);

  const onScrollHandle = (): void => {
    const position = window.scrollY;
    if (position.toString() !== 'NaN' && position < 1000) {
      const currentOpacity = 0.6 - position / 1000;
      if (currentOpacity > 0.3) {
        setBackgroundOpacity(currentOpacity);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', onScrollHandle);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '80vh', zIndex: -1 }}>
      <Image
        fill
        priority={true}
        alt='symbol シンボル XYM ジム NEM ネム blockchain'
        src={backgroundImage}
        sizes='100vw'
        style={{
          objectFit: 'cover',
          opacity: backgroundOpacity,
          WebkitMaskImage: 'linear-gradient(rgb(0,0,0),rgb(0,0,0),rgb(0,0,0),rgba(0,0,0,0))',
        }}
      />
    </div>
  );
};

export default MainBackground;
