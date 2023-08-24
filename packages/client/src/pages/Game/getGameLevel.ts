export const getGameLevel = async (level: number): Promise<any> => {
  const baseUrl = `http://localhost:${3002}`;
  const queryParams = new URLSearchParams({
    level: level.toString(),
  });

  const url = `${baseUrl}/level?${queryParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
