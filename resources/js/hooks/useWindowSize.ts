import { useState, useEffect } from 'react';

interface WindowSize {
  width: number
  height: number
}

export default function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });
  // const [size, setSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return size;
}