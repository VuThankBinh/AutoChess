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

// function computerMove() {
//     let move;
//     if (boardSize === 3) {
//         // Sử dụng Minimax cho bàn cờ 3x3
//         move = minimaxMove(board, 'O');
//     } else if (boardSize === 10) {
//         // Sử dụng Alpha-Beta Pruning cho bàn cờ 10x10
//         move = alphaBetaMove(board, 'O', 7);
//     } else {
       
       
//     }
//     if (move) {
//         makeMove(move[0], move[1]);
//     }
// }

// Thuật toán Minimax cho bàn cờ 3x3
function minimaxMove(board, player) {
    let bestScore = player === 'O' ? -Infinity : Infinity;
    let bestMove;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                board[i][j] = player;
                let score = minimax(board, 0, player === 'X');
                board[i][j] = '';
                if (player === 'O' ? score > bestScore : score < bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }
    return bestMove;
}

// Hàm đệ quy Minimax
function minimax(board, depth, isMaximizing) {
    // Kiểm tra điều kiện kết thúc
    let result = checkWin(isMaximizing ? 'O' : 'X');
    if (result) return isMaximizing ? 10 - depth : depth - 10;
    if (isBoardFull()) return 0;

    if (isMaximizing) {
        // Lượt của máy (O)
        let bestScore = -Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        // Lượt của người chơi (X)
        let bestScore = Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// Alpha-Beta Pruning cho bàn cờ 10x10
function alphaBetaMove(board, player, depth) {
    let bestScore = -Infinity;
    let bestMove;
    let alpha = -Infinity;
    let beta = Infinity;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                board[i][j] = player;
                let score = alphaBeta(board, depth - 1, alpha, beta, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break; // Cắt tỉa Alpha-Beta
            }
        }
    }
    return bestMove;
}

// Hàm đệ quy Alpha-Beta
function alphaBeta(board, depth, alpha, beta, isMaximizing) {
    if (depth === 0 || checkWin('O') || checkWin('X') || isBoardFull()) {
        return evaluateBoard(board);
    }

    if (isMaximizing) {
        // Lượt của máy (O)
        let maxEval = -Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let eval = alphaBeta(board, depth - 1, alpha, beta, false);
                    board[i][j] = '';
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha) break; // Cắt tỉa Alpha-Beta
                }
            }
        }
        return maxEval;
    } else {
        // Lượt của người chơi (X)
        let minEval = Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let eval = alphaBeta(board, depth - 1, alpha, beta, true);
                    board[i][j] = '';
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha) break; // Cắt tỉa Alpha-Beta
                }
            }
        }
        return minEval;
    }
}

// Hàm đánh giá bàn cờ
function evaluateBoard(board) {
    let score = 0;
    score += evaluateLines(board, 'O') - evaluateLines(board, 'X');
    return score;
}

// Đánh giá tất cả các đường trên bàn cờ
function evaluateLines(board, player) {
    let score = 0;
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            for (let [dx, dy] of directions) {
                score += evaluateLine(board, i, j, dx, dy, player);
            }
        }
    }

    return score;
}

// Đánh giá một đường cụ thể
function evaluateLine(board, row, col, dx, dy, player) {
    let count = 0;
    let openEnds = 0;
    for (let i = 0; i < 5; i++) {
        let r = row + i * dx;
        let c = col + i * dy;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;
        if (board[r][c] === player) count++;
        else if (board[r][c] === '') openEnds++;
        else break;
    }
    if (count === 0) return 0;
    // Tính điểm dựa trên số quân liên tiếp và số đầu mở
    return Math.pow(10, count) * (openEnds + 1);
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

// Hàm kiểm tra chiến thắng
function checkWin(player) {
    // Xác định số quân cần xếp hàng để thắng
    const winLength = boardSize === 3 ? 3 : 5;
    
    // Định nghĩa các hướng để kiểm tra: ngang, dọc, chéo xuống, chéo lên
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    // Duyệt qua tất cả các ô trên bàn cờ
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            // Nếu ô hiện tại là của người chơi đang kiểm tra
            if (board[row][col] === player) {
                // Kiểm tra theo từng hướng
                for (let [dx, dy] of directions) {
                    let count = 1; // Bắt đầu đếm từ 1 (ô hiện tại)
                    
                    // Kiểm tra các ô tiếp theo theo hướng đã chọn
                    for (let i = 1; i < winLength; i++) {
                        let newRow = row + i * dx;
                        let newCol = col + i * dy;
                        
                        // Nếu vượt ra ngoài bàn cờ hoặc không phải quân của người chơi, dừng kiểm tra
                        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || board[newRow][newCol] !== player) {
                            break;
                        }
                        
                        count++; // Tăng số quân liên tiếp
                    }
                    
                    // Nếu đủ số quân cần thiết để thắng, trả về true
                    if (count === winLength) {
                        return true;
                    }
                }
            }
        }
    }
    
    // Nếu không tìm thấy chuỗi chiến thắng, trả về false
    return false;
}

// Hàm đánh giá bàn cờ
function evaluateBoard(board) {
    let score = 0;
    score += evaluateLines(board, 'O') - evaluateLines(board, 'X');
    return score;
}

// Đánh giá tất cả các đường trên bàn cờ
function evaluateLines(board, player) {
    let score = 0;
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            for (let [dx, dy] of directions) {
                score += evaluateLine(board, i, j, dx, dy, player);
            }
        }
    }

    return score;
}

// Đánh giá một đường cụ thể
function evaluateLine(board, row, col, dx, dy, player) {
    let count = 0;
    let openEnds = 0;
    for (let i = 0; i < 5; i++) {
        let r = row + i * dx;
        let c = col + i * dy;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;
        if (board[r][c] === player) count++;
        else if (board[r][c] === '') openEnds++;
        else break;
    }
    if (count === 0) return 0;
    // Tính điểm dựa trên số quân liên tiếp và số đầu mở
    return Math.pow(10, count) * (openEnds + 1);
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
    winLine.setAttribute("stroke", "green");
    winLine.setAttribute("stroke-width", "3");

    svg.appendChild(winLine);
    gameBoard.appendChild(svg);
}

// // Hàm kiểm tra chiến thắng
// function checkWin(player) {
//     // Xác định số quân cần xếp hàng để thắng
//     const winLength = boardSize === 3 ? 3 : 5;

//     // Định nghĩa các hướng để kiểm tra: ngang, dọc, chéo xuống, chéo lên
//     const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

//     // Duyệt qua tất cả các ô trên bàn cờ
//     for (let row = 0; row < boardSize; row++) {
//         for (let col = 0; col < boardSize; col++) {
//             // Nếu ô hiện tại là của người chơi đang kiểm tra
//             if (board[row][col] === player) {
//                 // Kiểm tra theo từng hướng
//                 for (let [dx, dy] of directions) {
//                     let count = 1; // Bắt đầu đếm từ 1 (ô hiện tại)

//                     // Kiểm tra các ô tiếp theo theo hướng đã chọn
//                     for (let i = 1; i < winLength; i++) {
//                         let newRow = row + i * dx;
//                         let newCol = col + i * dy;

//                         // Nếu vượt ra ngoài bàn cờ hoặc không phải quân của người chơi, dừng kiểm tra
//                         if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || board[newRow][newCol] !== player) {
//                             break;
//                         }

//                         count++; // Tăng số quân liên tiếp
//                     }

//                     // Nếu đủ số quân cần thiết để thắng, trả về true
//                     if (count === winLength) {
//                         return true;
//                     }
//                 }
//             }
//         }
//     }

//     // Nếu không tìm thấy chuỗi chiến thắng, trả về false
//     return false;
// }






function computerMove() {
    let move;
    if (boardSize === 3) {
        move = minimax(board, 'O').index;
    } else {
        move = improvedStrategy();
    }
    if (!move) {
        move = simpleMoveStrategy();
    }
    if (move) {
        makeMove(move[0], move[1]);
        if (!checkGameEnd()) {
            currentPlayer = 'X';
            currentPlayerElement.textContent = currentPlayer;
        }
    }
}

function improvedStrategy() {
    // Kiểm tra nước thắng ngay lập tức cho máy
    let winningMove = findWinningMove('O');
    if (winningMove) return winningMove;

    // Kiểm tra và chặn nước thắng của người chơi
    let blockingMove = findWinningMove('X');
    if (blockingMove) return blockingMove;

    // Kiểm tra và chặn nước 4 liên tiếp của người chơi
    let blockFourMove = findConsecutiveMove('X', 4);
    if (blockFourMove) return blockFourMove;

    // Kiểm tra và chặn một đầu của nước 3 liên tiếp của người chơi
    let blockThreeMove = findConsecutiveMove('X', 3);
    if (blockThreeMove) return blockThreeMove;

    // Tìm nước tạo cơ hội thắng cho máy
    let createWinningChance = findConsecutiveMove('O', 3);
    if (createWinningChance) return createWinningChance;

    // Tìm nước tốt nhất nếu không có tình huống đặc biệt
    return findBestMove();
}

function findConsecutiveMove(player, count) {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                for (let [dx, dy] of directions) {
                    if (checkConsecutive(i, j, dx, dy, player, count)) {
                        return [i, j];
                    }
                }
            }
        }
    }
    return null;

}

function checkConsecutive(row, col, dx, dy, player, targetCount) {
    let count = 0;
    let emptyBefore = false;
    let emptyAfter = false;

    // Kiểm tra phía trước
    for (let i = 1; i < 5; i++) {
        let newRow = row - i * dx;
        let newCol = col - i * dy;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) break;
        if (board[newRow][newCol] === player) count++;
        else if (board[newRow][newCol] === '' && !emptyBefore) {
            emptyBefore = true;
            break;
        }
        else break;
    }

    // Kiểm tra phía sau
    for (let i = 1; i < 5; i++) {
        let newRow = row + i * dx;
        let newCol = col + i * dy;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) break;
        if (board[newRow][newCol] === player) count++;
        else if (board[newRow][newCol] === '' && !emptyAfter) {
            emptyAfter = true;
            break;
        }
        else break;
    }

    return count === targetCount - 1 && (emptyBefore || emptyAfter);
}

function findWinningMove(player) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                if (checkWinningMove(i, j, player)) {
                    return [i, j];
                }
            }
        }
    }
    return null;
}

function findBestMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                let score = evaluateMove(i, j, 'O') - evaluateMove(i, j, 'X') * 1.1;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }

    return bestMove;
}

function evaluateMove(row, col, player) {
    let score = 0;
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let [dx, dy] of directions) {
        score += evaluateDirection(row, col, dx, dy, player);
        score += evaluateDirection(row, col, -dx, -dy, player);
    }

    return score;
}

function evaluateDirection(row, col, dx, dy, player) {
    let count = 0;
    let empty = 0;
    let blocked = false;
    let urgent = false;

    // Kiểm tra ngược lại
    for (let i = -1; i >= -4; i--) {
        let newRow = row + i * dx;
        let newCol = col + i * dy;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) break;
        if (board[newRow][newCol] === player) count++;
        else if (board[newRow][newCol] === '') empty++;
        else break;
    }

    // Kiểm tra theo hướng
    for (let i = 1; i < 5; i++) {
        let newRow = row + i * dx;
        let newCol = col + i * dy;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) {
            blocked = true;
            break;
        }
        if (board[newRow][newCol] === player) {
            count++;
        } else if (board[newRow][newCol] === '') {
            empty++;
        } else {
            blocked = true;
            break;
        }
    }

    if (count >= 4) return 10000; // Ưu tiên cao nhất cho việc thắng hoặc chặn thắng
    if (count === 3 && !blocked) return 5000; // Ưu tiên cao cho việc tạo hoặc chặn 4 liên tiếp mở
    if (count === 3 && blocked && empty >= 1) return 500; // Ưu tiên cho việc tạo hoặc chặn 4 liên tiếp bị chặn một đầu
    if (count === 2 && empty >= 2 && !blocked) return 100;
    if (count === 1 && empty >= 3 && !blocked) return 10;

    return 0;
}

function makeMove(row, col) {
    board[row][col] = currentPlayer;
    const cell = gameBoard.children[row].children[col];
    cell.style.color = currentPlayer === 'X' ? 'red' : 'black';
    cell.textContent = currentPlayer;
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
    let result = checkWin(player);
    if (result) return { score: player === 'O' ? 10 - depth : depth - 10 };
    if (isBoardFull()) return { score: 0 };
    if (depth > 5) return { score: evaluatePosition() };

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
    let blockMove = findWinningMove('X');
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

