import { useReadLocalStorage } from './useLocalStorage';

function useUserId() {
  const userId = useReadLocalStorage('userId');

  return { userId };
}

export default useUserId;
