class Node {
    constructor(vertex, edges) {
        this.vertex = vertex;
        this.edges = edges;
    }
}

function createEdges(i, j) {
    const edges = [];

    // two steps forward
    edges.push([i + 2, j + 1], [i + 2, j - 1]);
    // two steps back
    edges.push([i - 2, j + 1], [i - 2, j - 1]);
    // one step forward
    edges.push([i + 1, j + 2], [i + 1, j - 2]);
    // one step back
    edges.push([i - 1, j + 2], [i - 1, j - 2]);

    // prevent them from going off the board
    const filteredEdges = edges.filter(pair => pair.every(num => num >= 0 && num <= 7));

    return filteredEdges;
}

const chessBoard = [];

for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
        const edges = createEdges(i, j);
        const newNode = new Node([i, j], edges);
        row.push(newNode);
    }
    chessBoard.push(row);
}

function knightMoves(origin, destination) {
    if (chessBoard[origin[0]][origin[1]] === null) return null;

    const queue = [chessBoard[origin[0]][origin[1]]];
    const visited = new Set();
    const parentMap = new Map();

    const serialize = (pos) => `${pos[0]},${pos[1]}`;

    while (queue.length) {
        const current = queue.shift();
        const currentKey = serialize(current.vertex);

        if (!visited.has(currentKey)) {
            visited.add(currentKey);

            if (
                current.vertex[0] === destination[0] &&
                current.vertex[1] === destination[1]
            ) {
                const path = [];
                let step = current;

                while (step) {
                    path.unshift(step.vertex);
                    const prevKey = serialize(step.vertex);
                    step = parentMap.get(prevKey);
                }

                return path;
            }

            for (const neighbor of current.edges) {
                const neighborNode = chessBoard[neighbor[0]][neighbor[1]];
                const neighborKey = serialize(neighborNode.vertex);

                if (!visited.has(neighborKey)) {
                    queue.push(neighborNode);
                    parentMap.set(neighborKey, current);
                }
            }
        }
    }

    return null;
}

let result = knightMoves([0, 1], [1, 5]);
console.log(`You made it in ${result.length} moves! Here's your path:`);
result.forEach((step) => console.log(step));