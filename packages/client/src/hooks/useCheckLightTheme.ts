import { useReadLocalStorage } from './useLocalStorage';

function useCheckLightTheme() {
  const isLightThemeStored = useReadLocalStorage('isLightTheme');

  const isLightTheme = isLightThemeStored === 'true';

  return { isLightTheme };
}

export default useCheckLightTheme;
