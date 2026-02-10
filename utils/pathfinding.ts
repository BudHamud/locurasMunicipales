export interface Point {
    x: number;
    y: number;
}

export type Grid = boolean[][];

/**
 * Basic BFS Pathfinding for unweighted grid.
 * Returns array of points from start to end, or null if no path found.
 */
export const findPath = (
    start: Point,
    end: Point,
    isWalkable: (x: number, y: number) => boolean,
    gridSize: number = 25
): Point[] | null => {
    // Queue stores [currentPoint, pathSoFar]
    const queue: { point: Point; path: Point[] }[] = [
        { point: start, path: [start] }
    ];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
        const { point, path } = queue.shift()!;

        if (point.x === end.x && point.y === end.y) {
            return path;
        }

        const neighbors = [
            { x: point.x + 1, y: point.y }, // Right
            { x: point.x - 1, y: point.y }, // Left
            { x: point.x, y: point.y + 1 }, // Down
            { x: point.x, y: point.y - 1 }  // Up
        ];

        for (const neighbor of neighbors) {
            // Check bounds
            if (
                neighbor.x >= 0 && neighbor.x < gridSize &&
                neighbor.y >= 0 && neighbor.y < gridSize
            ) {
                const key = `${neighbor.x},${neighbor.y}`;
                if (!visited.has(key)) {
                    // Check if walkable
                    if (isWalkable(neighbor.x, neighbor.y)) {
                        visited.add(key);
                        queue.push({ point: neighbor, path: [...path, neighbor] });
                    }
                }
            }
        }
    }

    return null; // No path found
};
