const SERVER_PORT = 3002;

export const fetchGameLevel = async (level: number): Promise<number[][]> => {
  const baseUrl = `http://localhost:${SERVER_PORT}`;
  const queryParams = new URLSearchParams({
    level: level.toString(),
  });

  const url = `${baseUrl}/level?${queryParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.matrix;
};

export const fetchLevelsNumber = async (): Promise<number> => {
  const baseUrl = `http://localhost:${SERVER_PORT}`;

  const url = `${baseUrl}/levels`;

  const response = await fetch(url);

  const data = await response.json();
  console.log(data);
  return data.levels;
};
