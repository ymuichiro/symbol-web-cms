import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const MainBackground: FC = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.6);
  const router = useRouter();

  const onScrollHandle = () => {
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
        backgroundImage: `url(${router.basePath}/assets/img/header-background.png)`,
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
