const gameBoard = document.getElementById('gameBoard');
const currentPlayerElement = document.getElementById('currentPlayer');
const boardSizeSelector = document.getElementById('boardSizeSelector');
const resetButton = document.getElementById('resetButton');
let boardSize = parseInt(boardSizeSelector.value);
let currentPlayer = 'X';
let board = [];

function createBoard() {
    gameBoard.innerHTML = '';
    board = [];
    currentPlayer = 'X';
    currentPlayerElement.textContent = currentPlayer;
    
    // Ẩn kết quả trò chơi khi tạo bảng mới
    const gameResult = document.getElementById('gameResult');
    gameResult.style.display = 'none';
    
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => playerMove(i, j));
            rowDiv.appendChild(cell);
            row.push('');
        }
        gameBoard.appendChild(rowDiv);
        board.push(row);
    }
}

boardSizeSelector.addEventListener('change', () => {
    boardSize = parseInt(boardSizeSelector.value);
    createBoard();
});

function playerMove(row, col) {
    if (board[row][col] === '' && currentPlayer === 'X') {
        makeMove(row, col);
        if (!checkGameEnd()) {
            currentPlayer = 'O';
            currentPlayerElement.textContent = currentPlayer;
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    let move;
    if (boardSize === 3) {
        move = minimax(board, 'O').index;
    } else {
        move = simpleMoveStrategy();
    }
    makeMove(move[0], move[1]);
    if (!checkGameEnd()) {
        currentPlayer = 'X';
        currentPlayerElement.textContent = currentPlayer;
    }
}

function makeMove(row, col) {
    board[row][col] = currentPlayer;
    const cell = gameBoard.children[row].children[col];
    cell.textContent = currentPlayer;
}

function checkGameEnd() {
    const result = checkWin(currentPlayer);
    if (result) {
        drawWinningLine(result.line);
        showGameResult(currentPlayer === 'X' ? 'Bạn thắng!' : 'Bạn thua!');
        return true;
    } else if (isBoardFull()) {
        showGameResult('Hòa!');
        return true;
    }
    return false;
}

function drawWinningLine(line) {
    const [start, end] = [line[0], line[line.length - 1]];
    const startCell = gameBoard.children[start[0]].children[start[1]];
    const endCell = gameBoard.children[end[0]].children[end[1]];
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    
    const winLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    winLine.setAttribute("x1", startCell.offsetLeft + startCell.offsetWidth / 2);
    winLine.setAttribute("y1", startCell.offsetTop + startCell.offsetHeight / 2);
    winLine.setAttribute("x2", endCell.offsetLeft + endCell.offsetWidth / 2);
    winLine.setAttribute("y2", endCell.offsetTop + endCell.offsetHeight / 2);
    winLine.setAttribute("stroke", "blue");
    winLine.setAttribute("stroke-width", "3");
    
    svg.appendChild(winLine);
    gameBoard.appendChild(svg);
}

function checkWin(player) {
    const winLength = boardSize === 3 ? 3 : 5;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === player) {
                for (let [dx, dy] of directions) {
                    let line = [[row, col]];
                    let r = row + dx, c = col + dy;
                    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
                        line.push([r, c]);
                        r += dx;
                        c += dy;
                    }
                    if (line.length >= winLength) {
                        if (boardSize > 3) {
                            let [startRow, startCol] = line[0];
                            let [endRow, endCol] = line[line.length - 1];
                            let startBlocked = startRow - dx < 0 || startRow - dx >= boardSize || 
                                               startCol - dy < 0 || startCol - dy >= boardSize || 
                                               board[startRow - dx][startCol - dy] === (player === 'X' ? 'O' : 'X');
                            let endBlocked = endRow + dx < 0 || endRow + dx >= boardSize || 
                                             endCol + dy < 0 || endCol + dy >= boardSize || 
                                             board[endRow + dx][endCol + dy] === (player === 'X' ? 'O' : 'X');
                            if (!startBlocked || !endBlocked) {
                                return { winner: player, line: line };
                            }
                        } else {
                            return { winner: player, line: line };
                        }
                    }
                }
            }
        }
    }
    return null;
}

function minimax(newBoard, player, depth = 0, alpha = -Infinity, beta = Infinity) {
    if (checkWin('O')) return { score: 10 - depth };
    if (checkWin('X')) return { score: depth - 10 };
    if (isBoardFull()) return { score: 0 };
    if (depth > 5) return { score: evaluatePosition() }; // Thay đổi này

    let bestMove = player === 'O' ? { score: -Infinity } : { score: Infinity };

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (newBoard[i][j] === '') {
                newBoard[i][j] = player;
                let moveScore = minimax(newBoard, player === 'O' ? 'X' : 'O', depth + 1, alpha, beta).score;
                newBoard[i][j] = '';

                if (player === 'O') {
                    if (moveScore > bestMove.score) {
                        bestMove = { score: moveScore, index: [i, j] };
                    }
                    alpha = Math.max(alpha, moveScore);
                } else {
                    if (moveScore < bestMove.score) {
                        bestMove = { score: moveScore, index: [i, j] };
                    }
                    beta = Math.min(beta, moveScore);
                }

                if (beta <= alpha) break;
            }
        }
    }
    return bestMove;
}

function simpleMoveStrategy() {
    // Kiểm tra nếu có thể thắng trong nước tiếp theo
    let winMove = findWinningMove('O');
    if (winMove) return winMove;

    // Chặn nước thắng của đối thủ
    let blockMove = findBlockingMove('X');
    if (blockMove) return blockMove;

    // Tìm nước đi tốt nhất dựa trên đánh giá
    return findBestMove();
}

function findWinningMove(player) {
    return findNInARow(player, 5);
}

function findBlockingMove(player) {
    return findNInARow(player, 4);
}

function findNInARow(player, n) {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === '') {
                for (let [dx, dy] of directions) {
                    let count = 0;
                    let r = row, c = col;
                    
                    // Đếm số quân liên tiếp
                    while (isValidCell(r, c) && (board[r][c] === player || (r === row && c === col))) {
                        count++;
                        r += dx;
                        c += dy;
                    }
                    
                    r = row - dx;
                    c = col - dy;
                    while (isValidCell(r, c) && board[r][c] === player) {
                        count++;
                        r -= dx;
                        c -= dy;
                    }
                    
                    if (count >= n) {
                        return [row, col];
                    }
                }
            }
        }
    }
    return null;
}

function findBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O';
                let score = evaluatePosition();
                board[i][j] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }

    return bestMove || findRandomEmptyCell();
}

function evaluatePosition() {
    let score = 0;
    score += evaluateLines('O') - evaluateLines('X');
    return score;
}

function evaluateLines(player) {
    let score = 0;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            for (let [dx, dy] of directions) {
                let line = getLine(row, col, dx, dy, 5);
                score += evaluateLine(line, player);
            }
        }
    }

    return score;
}

function getLine(row, col, dx, dy, length) {
    let line = [];
    for (let i = 0; i < length; i++) {
        if (isValidCell(row, col)) {
            line.push(board[row][col]);
        } else {
            line.push(null);
        }
        row += dx;
        col += dy;
    }
    return line;
}

function evaluateLine(line, player) {
    const opponent = player === 'O' ? 'X' : 'O';
    let score = 0;
    let playerCount = line.filter(cell => cell === player).length;
    let emptyCount = line.filter(cell => cell === '').length;

    if (playerCount === 5) score += 100000;
    else if (playerCount === 4 && emptyCount === 1) score += 10000;
    else if (playerCount === 3 && emptyCount === 2) score += 1000;
    else if (playerCount === 2 && emptyCount === 3) score += 100;
    else if (playerCount === 1 && emptyCount === 4) score += 10;

    if (line.includes(opponent)) score = 0;

    return score;
}

function isValidCell(row, col) {
    return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function findRandomEmptyCell() {
    let emptyCells = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length > 0) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    return null;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}

function showGameResult(message) {
    const gameResult = document.getElementById('gameResult');
    gameResult.textContent = message;
    gameResult.style.display = 'block';
}

resetButton.addEventListener('click', createBoard);

createBoard();
