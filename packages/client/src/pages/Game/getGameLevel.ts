const SERVER_PORT = 3002;

export const getGameLevel = async (
  level: number,
): Promise<{ matrix: number[][] }> => {
  const baseUrl = `http://localhost:${SERVER_PORT}`;
  const queryParams = new URLSearchParams({
    level: level.toString(),
  });

  const url = `${baseUrl}/level?${queryParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
