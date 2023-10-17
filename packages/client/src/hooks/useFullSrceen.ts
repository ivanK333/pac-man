import { useState } from 'react';

function useFullScreen() {
  const [fullScreen, setFullScreen] = useState(false);

  function open() {
    setFullScreen(!fullScreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return { fullScreen, open };
}

export default useFullScreen;
