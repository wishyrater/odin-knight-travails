class Vertex {

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
    console.log(filteredEdges);

    return filteredEdges;
}

const chessBoard = [];

for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
        const adjacencies = createEdges(i, j);
        row.push(adjacencies);
    }
    chessBoard.push(row);
}

console.log(chessBoard);