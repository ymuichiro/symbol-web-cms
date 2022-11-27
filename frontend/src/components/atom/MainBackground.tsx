import { FC, useEffect, useState } from 'react';
import backgroundImage from '@/assets/background/header-background.webp';

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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '80vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1,
        opacity: backgroundOpacity,
        WebkitMaskImage: 'linear-gradient(rgb(0,0,0),rgb(0,0,0),rgb(0,0,0),rgba(0,0,0,0))',
      }}
    />
  );
};

export default MainBackground;
