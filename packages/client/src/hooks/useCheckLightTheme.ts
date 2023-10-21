import { useReadLocalStorage } from './useLocalStorage';

function useCheckLightTheme() {
  const isLightTheme = useReadLocalStorage('isLightTheme');

  const availableChangeThemeToDark = isLightTheme === 'true';

  return { availableChangeThemeToDark, isLightTheme };
}

export default useCheckLightTheme;
