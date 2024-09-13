let board; // Mảng 2 chiều đại diện cho bàn cờ

let onPieceFocus = false; // Theo dõi xem có quân cờ nào đang được chọn hay không
let fieldOnFocus; // div của ô mà quân cờ đang đứng
let pieceOnFocus; // img element đại diện cho quân cờ đang được chọn

let whitesTurn = true; // Theo dõi lượt chơi: true là lượt quân trắng, false là lượt quân đen

let whitePawnSwapCounter = "I"; // Biến đếm số lần quân tốt trắng hoán đổi
let blackPawnSwapCounter = "I"; // Biến đếm số lần quân tốt đen hoán đổi

let enPassantPawn = null; // Theo dõi quân tốt nào có thể bị bắt bằng nước đi "en passant"

/*------Quyền nhập thành (castling rights)-----*/
let whiteCanCastle = true; // Quân trắng có thể nhập thành không?
let blackCanCastle = true; // Quân đen có thể nhập thành không?

let wKRookMoved = false; // Theo dõi xem xe (rook) cánh vua của trắng đã di chuyển chưa
let bKRookMoved = false; // Theo dõi xem xe cánh vua của đen đã di chuyển chưa

let wQRookMoved = false; // Theo dõi xem xe cánh hậu của trắng đã di chuyển chưa
let bQRookMoved = false; // Theo dõi xem xe cánh hậu của đen đã di chuyển chưa

/*----------------------------------------------*/
let chessCheck = true; // Biến kiểm tra tình trạng "chiếu" (check)

let markedMoves = []; // Lưu trữ các nước đi hợp lệ đã được đánh dấu

// Hàm thiết lập bàn cờ cho trò chơi
function setupGame() {
    board = [
        // Bàn cờ 8x8 với các quân cờ ban đầu, bao gồm các quân: vua (k), hậu (q), xe (r), mã (n), tượng (b), và tốt (p)
        ["wrA", "wnB", "wbC", "wq", "wk", "wbF", "wnG","wrH"], // Hàng 1: quân trắng
        ["wpA", "wpB", "wpC", "wpD", "wpE", "wpF", "wpG","wpH"], // Hàng 2: quân tốt trắng
        ["", "", "", "", "", "", "", ""], // Hàng 3: trống
        ["", "", "", "", "", "", "", ""], // Hàng 4: trống
        ["", "", "", "", "", "", "", ""], // Hàng 5: trống
        ["", "", "", "", "", "", "", ""], // Hàng 6: trống
        ["bpA", "bpB", "bpC", "bpD", "bpE", "bpF", "bpG","bpH"], // Hàng 7: quân tốt đen
        ["brA", "bnB", "bbC", "bq", "bk", "bbF", "bnG","brH"]  // Hàng 8: quân đen
    ];
}

// Hàm reset trò chơi
function reset() {
    location.reload(); // Tải lại trang để bắt đầu trò chơi mới
}

let playMode = "c"; // Chế độ chơi hiện tại: "c" là chơi với máy
let humansColor = "w"; // Màu của người chơi khi ở chế độ Human vs Computer (mặc định là trắng)

// Hàm đặt chế độ chơi Human vs Human
function setHumanMode() {
    let humanButton = document.getElementById("humanMode"); // Lấy button chế độ Human vs Human
    let comButton = document.getElementById("computerMode"); // Lấy button chế độ chơi với máy

    if(playMode != "h") { // Kiểm tra xem có đang ở chế độ Human vs Human chưa
        playMode = "h"; // Nếu chưa, chuyển sang chế độ Human vs Human

        // Đổi màu button để báo hiệu chế độ đang chọn
        humanButton.style.backgroundColor = "#e68540"; // Button Human vs Human đổi màu
        comButton.style.backgroundColor = "#4D7EA8"; // Button Computer đổi lại màu mặc định
    } else {
        alert("You already play Human vs Human"); // Thông báo khi đã đang ở chế độ Human vs Human
    }
}


// Hàm để tính toán các nước đi hợp lệ (sơ lược)
function showMoves(element) {
    // Lấy màu của quân cờ
    let emId = element.id;

    let activeBoard = board;

    // Kiểm tra xem có phải lượt của người chơi có màu trắng hay không (whitesTurn = true), 
    // hoặc có phải lượt của người chơi có màu đen không (whitesTurn = false)
    if ((emId.startsWith("w") && whitesTurn) || (emId.startsWith("b") && !whitesTurn)) {
        // alert('ban chon emId:'+emId)

        // Kiểm tra nếu đã có quân cờ được chọn
        if (pieceOnFocus) {

            // Xóa các dấu chỉ thị (marker) đã được tạo ra
            deleteMarker();
            // Bỏ chọn quân cờ hiện đang được chọn
            unmarkPiece();
        } else {

            // Đặt quân cờ hiện tại vào biến `pieceOnFocus` để theo dõi quân cờ đang được chọn
            pieceOnFocus = element;

            // Lấy vị trí hiện tại của quân cờ trên bàn cờ
            let piecePosition = givePosition(activeBoard, element.id);

            // Xác định loại quân cờ (ví dụ: Tốt, Xe, Mã, Hậu, Vua)
            let pieceType = getPieceType(element.id);

            // Lấy các nước đi hợp lệ của quân cờ dựa trên vị trí và loại quân
            let legalMoves = getLegalMoves(piecePosition, pieceType, activeBoard);

            // Đánh dấu quân cờ hiện đang được chọn trên bàn cờ
            markPieceOnFocus(piecePosition);
            // Đánh dấu các nước đi hợp lệ trên bàn cờ
            markLegalMoves(legalMoves);

        }


    }

   
}
// Hàm đánh dấu quân cờ đang được chọn
function markPieceOnFocus(piecePosition) {
    // Đặt biến onPieceFocus thành true để xác định rằng có quân cờ đang được chọn
    onPieceFocus = true;

    // Lấy vị trí của quân cờ trên bàn cờ dựa trên tọa độ
    let boardPosition = getFieldFromPosition(piecePosition);

    // Lưu trữ ô (field) mà quân cờ đang đứng
    fieldOnFocus = document.getElementById(boardPosition);

    // Thay đổi màu nền của ô để hiển thị quân cờ đang được chọn
    fieldOnFocus.style.backgroundColor = "#87CEEB"; // Màu xanh dương nhạt
}

// Hàm bỏ đánh dấu quân cờ
function unmarkPiece() {
    // Đặt quân cờ đang được chọn thành null (không còn quân nào được chọn)
    pieceOnFocus = null;

    // Khôi phục màu nền của ô về màu mặc định
    fieldOnFocus.style.backgroundColor = "";

    // Xóa tham chiếu đến ô (field) đang được chọn
    fieldOnFocus = null;
}

// Hàm đánh dấu các nước đi hợp lệ của quân cờ
function markLegalMoves(positions) {
    // Duyệt qua các vị trí hợp lệ mà quân cờ có thể đi đến
    for (let position of positions) {
        // Lấy vị trí của các ô trên bàn cờ dựa trên tọa độ
        let boardPosition = getFieldFromPosition(position);

        // Thêm vị trí vào mảng markedMoves để theo dõi các nước đi đã đánh dấu
        markedMoves.push(boardPosition);

        // Lấy ô (field) tương ứng từ DOM
        let field = document.getElementById(boardPosition);

        // Kiểm tra xem có quân cờ nào đang ở vị trí đó không
        if (checkIfPieceIsOnField(position, board)) {
            // Nếu có quân cờ, thêm class 'catch' để thể hiện có thể ăn quân đó
            field.classList.add("catch");
        }

        // Tạo một phần tử div đại diện cho dấu chấm hiển thị nước đi hợp lệ
        let dot = document.createElement("div");

        // Thêm class 'marker' cho dấu chấm
        dot.classList.add("marker");
        // Thêm sự kiện onclick vào dấu chấm để di chuyển quân cờ đến vị trí đó
        dot.setAttribute("onclick", "movePiece(this)");
        // Đặt dấu chấm "•" vào bên trong div
        dot.innerHTML = "•";

        // Thêm dấu chấm vào ô (field) tương ứng
        field.appendChild(dot);
    }
}
// tra ve con co dang chon
function getPieceType(id) {

    let arr = Array.from(id);

    if(arr[1] === 'p') {
        return arr[0] + arr[1];
    } else {
        return arr[1];
    }

}
// tra ve vi tri cua quan co da chon
function givePosition(boardArray, elementId) {

    for(let i = 0; i < boardArray.length; i++) {
        for(let j = 0; j < boardArray[i].length; j++) {

            if(boardArray[i][j] === elementId) {
                return position = {
                    row: i,
                    col: j
                };
            }
        }
    }
}
function getLegalMoves(piecePosition, pieceType, activeBoard) {

    let playerColor = getColorOfPieceAtPosition(piecePosition, activeBoard);

    let legalMoves = [];

    let position;

    switch(pieceType) {

        case "wp":
        // implement en passant

            if(piecePosition.row === 1) {

                // diagonal catches
                for(let k = -1; k < 2; k = k+2) {

                    position = {
                        row: piecePosition.row+1,
                        col: piecePosition.col+k
                    };

                    // check if a piece sits at a front diagonal field
                    if(checkIfPieceIsOnField(position, activeBoard)) {

                        // check if piece is of opposite color
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }
                            legalMoves.push(position);

                        }
                    } else {
                        continue;
                    }
                }
                

                for(let i = 1; i <= 2; i++) {

                    position = {
                        row: piecePosition.row+i,
                        col: piecePosition.col
                    };

                    if(checkIfPieceIsOnField(position, activeBoard)) {

                        break;
                    } else {
                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                continue;
                            }
                        }
                        legalMoves.push(position);

                    }
                }

            } else {
                
                if(piecePosition.row+1 < 8) {
                    
                    // check if a piece can be catched diagonal
                    for(let k = -1; k < 2; k = k+2) {

                        position = {
                            row: piecePosition.row+1,
                            col: piecePosition.col+k
                        };

                        // check if a piece sits at a front diagonal field
                        if(checkIfPieceIsOnField(position, activeBoard)) {

                            // check if piece is of opposite color
                            if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                                if(chessCheck) {

                                    // with this move player would still be in chess position or set self in chess
                                    if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                        continue;
                                    }
                                }
                                legalMoves.push(position);

                            }
                        } else if (enPassantPawn){
                            /* check if diagonal en passant move is legal */
                            if(position.col === enPassantPawn.col && position.row === enPassantPawn.row + 1) {

                                if(chessCheck) {

                                    // with this move player would still be in chess position or set self in chess
                                    if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                        continue;
                                    }
                                }
                                legalMoves.push(position);
                            }
                        } else {
                            continue;
                        }
                    }
                    
                    position = {
                        row: piecePosition.row+1,
                        col: piecePosition.col
                    };
    
                    if(!checkIfPieceIsOnField(position, activeBoard)) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                legalMoves.push(position);
                            }
                        }
                    }
                }   
            }
            break;

        case "bp":
        
            if(piecePosition.row === 6) {

                // diagonal catches
                for(let k = -1; k < 2; k = k+2) {

                    position = {
                        row: piecePosition.row-1,
                        col: piecePosition.col+k
                    };

                    // check if a piece sits at a front diagonal field
                    if(checkIfPieceIsOnField(position, activeBoard)) {

                        // check if piece is of opposite color
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }
                            legalMoves.push(position);

                        }
                    } else {
                        continue;
                    }
                }

                for(let i = 1; i <= 2; i++) {

                    position = {
                        row: piecePosition.row-i,
                        col: piecePosition.col
                    };

                    if(checkIfPieceIsOnField(position, activeBoard)) {

                        break;
                    } else {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                continue;
                            }
                        }
                        legalMoves.push(position);

                    }
                }

            } else {

                if(piecePosition.row-1 >= 0) {
                    
                    // check if a piece can be catched diagonal
                    for(let k = -1; k < 2; k = k+2) {

                        position = {
                            row: piecePosition.row-1,
                            col: piecePosition.col+k
                        };

                        // check if a piece sits at a front diagonal field
                        if(checkIfPieceIsOnField(position, activeBoard)) {

                            // check if piece is of opposite color
                            if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                                if(chessCheck) {

                                    // with this move player would still be in chess position or set self in chess
                                    if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                        continue;
                                    }
                                }
                                legalMoves.push(position);

                            }
                        } else if (enPassantPawn){
                            /* check if diagonal en passant move is legal */
                            if(position.col === enPassantPawn.col && position.row === enPassantPawn.row - 1) {

                                if(chessCheck) {

                                    // with this move player would still be in chess position or set self in chess
                                    if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                        continue;
                                    }
                                }
                                legalMoves.push(position);
                            }
                        } else {
                            continue;
                        }
                    }
                    
                    position = {
                        row: piecePosition.row-1,
                        col: piecePosition.col
                    };
    
                    if(!checkIfPieceIsOnField(position, activeBoard)) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                legalMoves.push(position);
                            }
                        }
                    }
                }   
            }
            break;

        case "n":

            for(let j = -1; j < 2; j++) {
                if(piecePosition.row+2 < 8) {

                    if(j != 0 && piecePosition.col+j >= 0 && piecePosition.col+j < 8) {

                        position = {
                            row: piecePosition.row+2,
                            col: piecePosition.col+j
                        };
                        
                        // check if piece is opposite color => catch 
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }
                            legalMoves.push(position);


                        }
                    }
                }    
            }

            for(let j = -1; j < 2; j++) {
                if(piecePosition.row-2 >= 0) {

                    if(j != 0 && piecePosition.col+j >= 0 && piecePosition.col+j < 8) {

                        position = {
                            row: piecePosition.row-2,
                            col: piecePosition.col+j
                        };

                        // check if piece is opposite color => catch 
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }

                            legalMoves.push(position);
                        }
                    }
                }   
            }

            for(let j = -1; j < 2; j++) {
                if(piecePosition.col+2 < 8) {

                    if(j != 0 && piecePosition.row+j >= 0 && piecePosition.row+j < 8) {

                        position = {
                            row: piecePosition.row+j,
                            col: piecePosition.col+2,
                        };

                        // check if piece is opposite color => catch 
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }

                            legalMoves.push(position);
                        }
                    }
                }   
            }

            for(let j = -1; j < 2; j++) {
                if(piecePosition.col-2 >= 0) {

                    if(j != 0 && piecePosition.row+j >= 0 && piecePosition.row+j < 8) {

                        position = {
                            row: piecePosition.row+j,
                            col: piecePosition.col-2,
                        };

                        // check if piece is opposite color => catch 
                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // with this move player would still be in chess position or set self in chess
                                if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    continue;
                                }
                            }

                            legalMoves.push(position);
                        }
                    }
                }   
            }
            break;
        
        case "b":

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row+j < 8 && piecePosition.col+j < 8) {
                    position = {
                        row: piecePosition.row+j,
                        col: piecePosition.col+j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }    

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row+j < 8 && piecePosition.col-j >= 0) {
                    position = {
                        row: piecePosition.row+j,
                        col: piecePosition.col-j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row-j >= 0 && piecePosition.col-j >= 0) {
                    position = {
                        row: piecePosition.row-j,
                        col: piecePosition.col-j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row-j >= 0 && piecePosition.col+j < 8) {
                    position = {
                        row: piecePosition.row-j,
                        col: piecePosition.col+j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    } else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            break;

        case "r":

            for(let j = piecePosition.row+1; j < 8; j++) {  
                    
                position = {
                    row: j,
                    col: piecePosition.col
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                } 
            }

            for(let j = piecePosition.row-1; j >= 0; j--) {
                        
                position = {
                    row: j,
                    col: piecePosition.col
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }

            for(let j = piecePosition.col+1; j < 8; j++) {
                        
                position = {
                    row: piecePosition.row,
                    col: j
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }

            for(let j = piecePosition.col-1; j >= 0; j--) {
                        
                position = {
                    row: piecePosition.row,
                    col: j
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }

            break;

        case "q":

            /*-------rook movement---------*/
            for(let j = piecePosition.row+1; j < 8; j++) {  
                    
                position = {
                    row: j,
                    col: piecePosition.col
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                } 
            }

            for(let j = piecePosition.row-1; j >= 0; j--) {
                        
                position = {
                    row: j,
                    col: piecePosition.col
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }

            for(let j = piecePosition.col+1; j < 8; j++) {
                        
                position = {
                    row: piecePosition.row,
                    col: j
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }

            for(let j = piecePosition.col-1; j >= 0; j--) {
                        
                position = {
                    row: piecePosition.row,
                    col: j
                }

                let clr = getColorOfPieceAtPosition(position, activeBoard);

                if(clr != playerColor) {

                    if(chessCheck) {

                        // with this move player would still be in chess position or set self in chess
                        if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                            // if there's a collision at new position end here
                            if(clr) {
                                break;
                            // if there's no coliision next move could still be valid
                            } else {
                                continue;
                            }
                        }
                    }

                    legalMoves.push(position);

                    if(clr) {
                        break;
                    }
                } else {
                    break;
                }
            }


            /*-------bishop movement---------*/
            for(let j = 1; j < 8; j++) {

                if(piecePosition.row+j < 8 && piecePosition.col+j < 8) {
                    position = {
                        row: piecePosition.row+j,
                        col: piecePosition.col+j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }    

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row+j < 8 && piecePosition.col-j >= 0) {
                    position = {
                        row: piecePosition.row+j,
                        col: piecePosition.col-j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row-j >= 0 && piecePosition.col-j >= 0) {
                    position = {
                        row: piecePosition.row-j,
                        col: piecePosition.col-j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    }  else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            for(let j = 1; j < 8; j++) {

                if(piecePosition.row-j >= 0 && piecePosition.col+j < 8) {
                    position = {
                        row: piecePosition.row-j,
                        col: piecePosition.col+j
                    }

                    let clr = getColorOfPieceAtPosition(position, activeBoard);

                    if(clr != playerColor) {

                        if(chessCheck) {

                            // with this move player would still be in chess position or set self in chess
                            if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                // if there's a collision at new position end here
                                if(clr) {
                                    break;
                                // if there's no coliision next move could still be valid
                                } else {
                                    continue;
                                }
                            }
                        }

                        legalMoves.push(position);

                        if(clr) {
                            break;
                        }
                    } else {
                        break;
                    }

                } else {
                    // out of bounds
                    break;
                }   
            }

            break;

        case "k":

            /*------ white castling moves */
            if(playerColor === "w" && whiteCanCastle) {

                if(!wKRookMoved && activeBoard[0][5] === "" && activeBoard[0][6] === "") {
                    
                    position = {
                        row: piecePosition.row,
                        col : piecePosition.col+2
                    };

                    /* --- check castling rules for temporary loss of castling ability */
                    let illegalMove = false;

                    // king in chess 
                    let opponentMoves = getAllPossibleMovesOfPlayer("b", board);

                    for(let move of opponentMoves) {
                        if(move.row === 0 && move.col === 4) {
                            illegalMove = true;
                        }
                    }

                    // king crosses a field that can be captured
                    let tempPosition = {
                        row: piecePosition.row,
                        col: piecePosition.col+1
                    };

                    let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
                    let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("b", boardAfterTempMove);

                    for(let move of opponentMovesAfterTempMove) {
                        if(move.row === 0 && move.col === 5) {
                            illegalMove = true;
                        }
                    }

                    // king in chess position after castling
                    let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
                    let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("b", boardAfterMove);

                    for(let move of opponentMovesAfterMove) {
                        if(move.row === 0 && move.col === 6) {
                            illegalMove = true;
                        }
                    }   

                    if(!illegalMove) {
                        legalMoves.push(position);
                    }
                }

                if(!wQRookMoved && activeBoard[0][1] === "" && activeBoard[0][2] === "" && activeBoard[0][3] === "") {

                    position = {
                        row: piecePosition.row,
                        col : piecePosition.col-2
                    };

                    /* --- check castling rules for temporary loss of castling ability */
                    let illegalMove = false;

                    // king in chess 
                    let opponentMoves = getAllPossibleMovesOfPlayer("b", board);

                    for(let move of opponentMoves) {
                        if(move.row === 0 && move.col === 4) {
                            illegalMove = true;
                        }
                    }

                    // king crosses a field that can be captured
                    let tempPosition = {
                        row: piecePosition.row,
                        col: piecePosition.col-1
                    };

                    let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
                    let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("b", boardAfterTempMove);

                    for(let move of opponentMovesAfterTempMove) {
                        if(move.row === 0 && move.col === 3) {
                            illegalMove = true;
                        }
                    }

                    // king in chess position after castling
                    let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
                    let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("b", boardAfterMove);

                    for(let move of opponentMovesAfterMove) {
                        if(move.row === 0 && move.col === 2) {
                            illegalMove = true;
                        }
                    }   

                    if(!illegalMove) {
                        legalMoves.push(position);
                    }
                }
            } else if(playerColor === "b" && blackCanCastle) {

                if(!bKRookMoved && activeBoard[7][5] === "" && activeBoard[7][6] === "") {

                    position = {
                        row: piecePosition.row,
                        col : piecePosition.col+2
                    };

                    /* --- check castling rules for temporary loss of castling ability */
                    let illegalMove = false;

                    // king in chess 
                    let opponentMoves = getAllPossibleMovesOfPlayer("w", board);

                    for(let move of opponentMoves) {
                        if(move.row === 7 && move.col === 4) {
                            illegalMove = true;
                        }
                    }

                    // king crosses a field that can be captured
                    let tempPosition = {
                        row: piecePosition.row,
                        col: piecePosition.col+1
                    };

                    let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
                    let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("w", boardAfterTempMove);

                    for(let move of opponentMovesAfterTempMove) {
                        if(move.row === 7 && move.col === 5) {
                            illegalMove = true;
                        }
                    }

                    // king in chess position after castling
                    let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
                    let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("w", boardAfterMove);

                    for(let move of opponentMovesAfterMove) {
                        if(move.row === 7 && move.col === 6) {
                            illegalMove = true;
                        }
                    }   

                    if(!illegalMove) {
                        legalMoves.push(position);
                    }
                }

                if(!bQRookMoved && activeBoard[7][1] === "" && activeBoard[7][2] === "" && activeBoard[7][3] === "") {

                    position = {
                        row: piecePosition.row,
                        col : piecePosition.col-2
                    };

                    /* --- check castling rules for temporary loss of castling ability */
                    let illegalMove = false;

                    // king in chess 
                    let opponentMoves = getAllPossibleMovesOfPlayer("w", board);

                    for(let move of opponentMoves) {
                        if(move.row === 7 && move.col === 4) {
                            illegalMove = true;
                        }
                    }

                    // king crosses a field that can be captured
                    let tempPosition = {
                        row: piecePosition.row,
                        col: piecePosition.col-1
                    };

                    let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
                    let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("w", boardAfterTempMove);

                    for(let move of opponentMovesAfterTempMove) {
                        if(move.row === 7 && move.col === 3) {
                            illegalMove = true;
                        }
                    }

                    // king in chess position after castling
                    let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
                    let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("w", boardAfterMove);

                    for(let move of opponentMovesAfterMove) {
                        if(move.row === 7 && move.col === 2) {
                            illegalMove = true;
                        }
                    }   

                    if(!illegalMove) {
                        legalMoves.push(position);
                    }
                }
            }

            for(let j = -1; j < 2; j++) {

                if(j == 0) {
                    
                    if(piecePosition.col-1 >= 0 && piecePosition.col-1 < 8) {

                        position = {
                            row: piecePosition.row,
                            col : piecePosition.col-1
                        };

                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // this move doesnt set player in chess
                                if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    legalMoves.push(position);
                                }
                            } else {
                                legalMoves.push(position);
                            }
                        }
                        
                    }

                    if(piecePosition.col+1 >= 0 && piecePosition.col+1 < 8) {

                        position = {
                            row: piecePosition.row,
                            col : piecePosition.col+1
                        };

                        if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                            if(chessCheck) {

                                // this move doesnt set player in chess
                                if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                    legalMoves.push(position);
                                }
                            } else {
                                legalMoves.push(position);
                            }
                        }
                    }
                    
                } else {

                    if(piecePosition.row+j >= 0 && piecePosition.row+j < 8) {
                        
                        for( let k = -1; k < 2; k++) {

                            if(piecePosition.col+k >= 0 && piecePosition.col+k < 8) {
                                position = {
                                    row: piecePosition.row+j,
                                    col : piecePosition.col+k
                                };

                                if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

                                    if(chessCheck) {

                                        // this move doesnt set player in chess
                                        if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
                                            legalMoves.push(position);
                                        }
                                    } else {
                                        legalMoves.push(position);
                                    }
                                }
                            }
                        }
                    } else {
                        // out of bounds
                        continue;
                    }
                }
            }

            break;
    }
    return legalMoves;
}
setupGame();
