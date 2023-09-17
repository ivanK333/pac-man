export type Point = {
  x: number;
  y: number;
};

export type QueueItem = {
  point: Point;
  distance: number;
};

export type PathItem = {
  point: Point;
  parent: Point;
  distance: number;
  nextStep?: Point;
};

const isInsideMatrix = (point: Point, matrix: number[][]): boolean => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  return point.x >= 0 && point.x < numRows && point.y >= 0 && point.y < numCols;
};
const isPassage = (point: Point, matrix: number[][]): boolean => {
  if (!isInsideMatrix(point, matrix)) return false;
  return matrix[point.y][point.x] !== 1;
};

const isVisited = (visited: boolean[][], point: Point): boolean => {
  try {
    return visited[point.y][point.x];
  } catch {
    return false;
  }
};

const getNeighbors = (point: Point): Point[] => [
  { x: point.x - 1, y: point.y },
  { x: point.x + 1, y: point.y },
  { x: point.x, y: point.y - 1 },
  { x: point.x, y: point.y + 1 },
];

export const findShortestPath = (
  matrix: number[][],
  start: Point,
  end: Point,
): PathItem[] | null => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  let searching = true;

  //   console.log('start =>', start, matrix[start.y][start.x]);
  //   console.log(matrix[end.y][end.x]);
  const visited: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false),
  );

  const queue: QueueItem[] = [{ point: start, distance: 0 }];
  const path: PathItem[] = [];

  // while (queue.length > 0) {
  //   for (let i = 0; i < 12; i++) {
  while (searching) {
    const { point, distance } = queue.shift()!;
    visited[point.y][point.x] = true;

    // Reconstruct the path
    if (point.x === end.x && point.y === end.y) {
      //   let current = end;
      //   while (current.x !== start.x || current.y !== start.y) {
      //     const prevStep = path[path.length - 1];
      //     current = prevStep!.point;
      //     prevStep!.nextStep = current;
      //   }

      const traceback = findPathToRoot(path, end);
      console.log('=!!!=====>', JSON.parse(JSON.stringify(traceback)));
      searching = false;

      if (!traceback) return null;
      return traceback.reverse();
    }

    // Find paths
    const neighbors = getNeighbors(point);
    // console.log('=======', neighbors);
    for (const neighbor of neighbors) {
      //   console.log(
      //     neighbor,
      //     isInsideMatrix(neighbor, matrix),
      //     isPassage(neighbor, matrix),
      //     !isVisited(visited, neighbor),
      //   );
      //   if (isInsideMatrix(neighbor, matrix))
      //     console.log('====>', matrix[neighbor.y][neighbor.x]);

      if (
        isInsideMatrix(neighbor, matrix) &&
        isPassage(neighbor, matrix) &&
        !isVisited(visited, neighbor)
      ) {
        // console.log(
        //   JSON.parse(
        //     JSON.stringify({ point: neighbor, distance: distance + 1 }),
        //   ),
        // );
        queue.push({ point: neighbor, distance: distance + 1 });
        visited[neighbor.y][neighbor.x] = true;
        path.push({ point: neighbor, parent: point, distance: distance + 1 });
      }
    }

    // console.log('queue after: ', JSON.parse(JSON.stringify(queue)));
  }

  return null; // No path found
};

const findPathToRoot = (
  tree: PathItem[],
  targetPoint: { x: number; y: number },
): PathItem[] | null => {
  // Find the node with the target point
  const targetNode = tree.find(
    (node) => node.point.x === targetPoint.x && node.point.y === targetPoint.y,
  );

  if (!targetNode) {
    return null; // Target point not found in the tree
  }

  const path: PathItem[] = [];
  let currentNode = targetNode;

  while (currentNode !== null) {
    path.unshift(currentNode); // Add the current node to the beginning of the path
    currentNode =
      tree.find(
        (node) =>
          node.point.x === currentNode.parent?.x &&
          node.point.y === currentNode.parent?.y,
      ) || null;
  }

  return path;
};
