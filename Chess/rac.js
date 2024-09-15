// function getLegalMoves(piecePosition, pieceType, activeBoard) {

//     let playerColor = getColorOfPieceAtPosition(piecePosition, activeBoard);

//     let legalMoves = [];

//     let position;

//     switch(pieceType) {

//         case "wp":
//         // implement en passant

//             if(piecePosition.row === 1) {

//                 // diagonal catches
//                 for(let k = -1; k < 2; k = k+2) {

//                     position = {
//                         row: piecePosition.row+1,
//                         col: piecePosition.col+k
//                     };

//                     // check if a piece sits at a front diagonal field
//                     if(checkIfPieceIsOnField(position, activeBoard)) {

//                         // check if piece is of opposite color
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }
//                             legalMoves.push(position);

//                         }
//                     } else {
//                         continue;
//                     }
//                 }


//                 for(let i = 1; i <= 2; i++) {

//                     position = {
//                         row: piecePosition.row+i,
//                         col: piecePosition.col
//                     };

//                     if(checkIfPieceIsOnField(position, activeBoard)) {

//                         break;
//                     } else {
//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 continue;
//                             }
//                         }
//                         legalMoves.push(position);

//                     }
//                 }

//             } else {

//                 if(piecePosition.row+1 < 8) {

//                     // check if a piece can be catched diagonal
//                     for(let k = -1; k < 2; k = k+2) {

//                         position = {
//                             row: piecePosition.row+1,
//                             col: piecePosition.col+k
//                         };

//                         // check if a piece sits at a front diagonal field
//                         if(checkIfPieceIsOnField(position, activeBoard)) {

//                             // check if piece is of opposite color
//                             if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                                 if(chessCheck) {

//                                     // with this move player would still be in chess position or set self in chess
//                                     if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                         continue;
//                                     }
//                                 }
//                                 legalMoves.push(position);

//                             }
//                         } else if (enPassantPawn){
//                             /* check if diagonal en passant move is legal */
//                             if(position.col === enPassantPawn.col && position.row === enPassantPawn.row + 1) {

//                                 if(chessCheck) {

//                                     // with this move player would still be in chess position or set self in chess
//                                     if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                         continue;
//                                     }
//                                 }
//                                 legalMoves.push(position);
//                             }
//                         } else {
//                             continue;
//                         }
//                     }

//                     position = {
//                         row: piecePosition.row+1,
//                         col: piecePosition.col
//                     };

//                     if(!checkIfPieceIsOnField(position, activeBoard)) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 legalMoves.push(position);
//                             }
//                         }
//                     }
//                 }   
//             }
//             break;

//         case "bp":

//             if(piecePosition.row === 6) {

//                 // diagonal catches
//                 for(let k = -1; k < 2; k = k+2) {

//                     position = {
//                         row: piecePosition.row-1,
//                         col: piecePosition.col+k
//                     };

//                     // check if a piece sits at a front diagonal field
//                     if(checkIfPieceIsOnField(position, activeBoard)) {

//                         // check if piece is of opposite color
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }
//                             legalMoves.push(position);

//                         }
//                     } else {
//                         continue;
//                     }
//                 }

//                 for(let i = 1; i <= 2; i++) {

//                     position = {
//                         row: piecePosition.row-i,
//                         col: piecePosition.col
//                     };

//                     if(checkIfPieceIsOnField(position, activeBoard)) {

//                         break;
//                     } else {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 continue;
//                             }
//                         }
//                         legalMoves.push(position);

//                     }
//                 }

//             } else {

//                 if(piecePosition.row-1 >= 0) {

//                     // check if a piece can be catched diagonal
//                     for(let k = -1; k < 2; k = k+2) {

//                         position = {
//                             row: piecePosition.row-1,
//                             col: piecePosition.col+k
//                         };

//                         // check if a piece sits at a front diagonal field
//                         if(checkIfPieceIsOnField(position, activeBoard)) {

//                             // check if piece is of opposite color
//                             if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                                 if(chessCheck) {

//                                     // with this move player would still be in chess position or set self in chess
//                                     if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                         continue;
//                                     }
//                                 }
//                                 legalMoves.push(position);

//                             }
//                         } else if (enPassantPawn){
//                             /* check if diagonal en passant move is legal */
//                             if(position.col === enPassantPawn.col && position.row === enPassantPawn.row - 1) {

//                                 if(chessCheck) {

//                                     // with this move player would still be in chess position or set self in chess
//                                     if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                         continue;
//                                     }
//                                 }
//                                 legalMoves.push(position);
//                             }
//                         } else {
//                             continue;
//                         }
//                     }

//                     position = {
//                         row: piecePosition.row-1,
//                         col: piecePosition.col
//                     };

//                     if(!checkIfPieceIsOnField(position, activeBoard)) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 legalMoves.push(position);
//                             }
//                         }
//                     }
//                 }   
//             }
//             break;

//         case "n":

//             for(let j = -1; j < 2; j++) {
//                 if(piecePosition.row+2 < 8) {

//                     if(j != 0 && piecePosition.col+j >= 0 && piecePosition.col+j < 8) {

//                         position = {
//                             row: piecePosition.row+2,
//                             col: piecePosition.col+j
//                         };

//                         // check if piece is opposite color => catch 
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }
//                             legalMoves.push(position);


//                         }
//                     }
//                 }    
//             }

//             for(let j = -1; j < 2; j++) {
//                 if(piecePosition.row-2 >= 0) {

//                     if(j != 0 && piecePosition.col+j >= 0 && piecePosition.col+j < 8) {

//                         position = {
//                             row: piecePosition.row-2,
//                             col: piecePosition.col+j
//                         };

//                         // check if piece is opposite color => catch 
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }

//                             legalMoves.push(position);
//                         }
//                     }
//                 }   
//             }

//             for(let j = -1; j < 2; j++) {
//                 if(piecePosition.col+2 < 8) {

//                     if(j != 0 && piecePosition.row+j >= 0 && piecePosition.row+j < 8) {

//                         position = {
//                             row: piecePosition.row+j,
//                             col: piecePosition.col+2,
//                         };

//                         // check if piece is opposite color => catch 
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }

//                             legalMoves.push(position);
//                         }
//                     }
//                 }   
//             }

//             for(let j = -1; j < 2; j++) {
//                 if(piecePosition.col-2 >= 0) {

//                     if(j != 0 && piecePosition.row+j >= 0 && piecePosition.row+j < 8) {

//                         position = {
//                             row: piecePosition.row+j,
//                             col: piecePosition.col-2,
//                         };

//                         // check if piece is opposite color => catch 
//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // with this move player would still be in chess position or set self in chess
//                                 if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     continue;
//                                 }
//                             }

//                             legalMoves.push(position);
//                         }
//                     }
//                 }   
//             }
//             break;

//         case "b":

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row+j < 8 && piecePosition.col+j < 8) {
//                     position = {
//                         row: piecePosition.row+j,
//                         col: piecePosition.col+j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }    

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row+j < 8 && piecePosition.col-j >= 0) {
//                     position = {
//                         row: piecePosition.row+j,
//                         col: piecePosition.col-j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row-j >= 0 && piecePosition.col-j >= 0) {
//                     position = {
//                         row: piecePosition.row-j,
//                         col: piecePosition.col-j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row-j >= 0 && piecePosition.col+j < 8) {
//                     position = {
//                         row: piecePosition.row-j,
//                         col: piecePosition.col+j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     } else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             break;

//         case "r":

//             for(let j = piecePosition.row+1; j < 8; j++) {  

//                 position = {
//                     row: j,
//                     col: piecePosition.col
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 } 
//             }

//             for(let j = piecePosition.row-1; j >= 0; j--) {

//                 position = {
//                     row: j,
//                     col: piecePosition.col
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }

//             for(let j = piecePosition.col+1; j < 8; j++) {

//                 position = {
//                     row: piecePosition.row,
//                     col: j
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }

//             for(let j = piecePosition.col-1; j >= 0; j--) {

//                 position = {
//                     row: piecePosition.row,
//                     col: j
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }

//             break;

//         case "q":

//             /*-------rook movement---------*/
//             for(let j = piecePosition.row+1; j < 8; j++) {  

//                 position = {
//                     row: j,
//                     col: piecePosition.col
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 } 
//             }

//             for(let j = piecePosition.row-1; j >= 0; j--) {

//                 position = {
//                     row: j,
//                     col: piecePosition.col
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }

//             for(let j = piecePosition.col+1; j < 8; j++) {

//                 position = {
//                     row: piecePosition.row,
//                     col: j
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }

//             for(let j = piecePosition.col-1; j >= 0; j--) {

//                 position = {
//                     row: piecePosition.row,
//                     col: j
//                 }

//                 let clr = getColorOfPieceAtPosition(position, activeBoard);

//                 if(clr != playerColor) {

//                     if(chessCheck) {

//                         // with this move player would still be in chess position or set self in chess
//                         if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                             // if there's a collision at new position end here
//                             if(clr) {
//                                 break;
//                             // if there's no coliision next move could still be valid
//                             } else {
//                                 continue;
//                             }
//                         }
//                     }

//                     legalMoves.push(position);

//                     if(clr) {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }


//             /*-------bishop movement---------*/
//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row+j < 8 && piecePosition.col+j < 8) {
//                     position = {
//                         row: piecePosition.row+j,
//                         col: piecePosition.col+j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }    

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row+j < 8 && piecePosition.col-j >= 0) {
//                     position = {
//                         row: piecePosition.row+j,
//                         col: piecePosition.col-j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row-j >= 0 && piecePosition.col-j >= 0) {
//                     position = {
//                         row: piecePosition.row-j,
//                         col: piecePosition.col-j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     }  else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             for(let j = 1; j < 8; j++) {

//                 if(piecePosition.row-j >= 0 && piecePosition.col+j < 8) {
//                     position = {
//                         row: piecePosition.row-j,
//                         col: piecePosition.col+j
//                     }

//                     let clr = getColorOfPieceAtPosition(position, activeBoard);

//                     if(clr != playerColor) {

//                         if(chessCheck) {

//                             // with this move player would still be in chess position or set self in chess
//                             if(makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                 // if there's a collision at new position end here
//                                 if(clr) {
//                                     break;
//                                 // if there's no coliision next move could still be valid
//                                 } else {
//                                     continue;
//                                 }
//                             }
//                         }

//                         legalMoves.push(position);

//                         if(clr) {
//                             break;
//                         }
//                     } else {
//                         break;
//                     }

//                 } else {
//                     // out of bounds
//                     break;
//                 }   
//             }

//             break;

//         case "k":

//             /*------ white castling moves */
//             if(playerColor === "w" && whiteCanCastle) {

//                 if(!wKRookMoved && activeBoard[0][5] === "" && activeBoard[0][6] === "") {

//                     position = {
//                         row: piecePosition.row,
//                         col : piecePosition.col+2
//                     };

//                     /* --- check castling rules for temporary loss of castling ability */
//                     let illegalMove = false;

//                     // king in chess 
//                     let opponentMoves = getAllPossibleMovesOfPlayer("b", board);

//                     for(let move of opponentMoves) {
//                         if(move.row === 0 && move.col === 4) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king crosses a field that can be captured
//                     let tempPosition = {
//                         row: piecePosition.row,
//                         col: piecePosition.col+1
//                     };

//                     let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
//                     let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("b", boardAfterTempMove);

//                     for(let move of opponentMovesAfterTempMove) {
//                         if(move.row === 0 && move.col === 5) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king in chess position after castling
//                     let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
//                     let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("b", boardAfterMove);

//                     for(let move of opponentMovesAfterMove) {
//                         if(move.row === 0 && move.col === 6) {
//                             illegalMove = true;
//                         }
//                     }   

//                     if(!illegalMove) {
//                         legalMoves.push(position);
//                     }
//                 }

//                 if(!wQRookMoved && activeBoard[0][1] === "" && activeBoard[0][2] === "" && activeBoard[0][3] === "") {

//                     position = {
//                         row: piecePosition.row,
//                         col : piecePosition.col-2
//                     };

//                     /* --- check castling rules for temporary loss of castling ability */
//                     let illegalMove = false;

//                     // king in chess 
//                     let opponentMoves = getAllPossibleMovesOfPlayer("b", board);

//                     for(let move of opponentMoves) {
//                         if(move.row === 0 && move.col === 4) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king crosses a field that can be captured
//                     let tempPosition = {
//                         row: piecePosition.row,
//                         col: piecePosition.col-1
//                     };

//                     let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
//                     let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("b", boardAfterTempMove);

//                     for(let move of opponentMovesAfterTempMove) {
//                         if(move.row === 0 && move.col === 3) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king in chess position after castling
//                     let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
//                     let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("b", boardAfterMove);

//                     for(let move of opponentMovesAfterMove) {
//                         if(move.row === 0 && move.col === 2) {
//                             illegalMove = true;
//                         }
//                     }   

//                     if(!illegalMove) {
//                         legalMoves.push(position);
//                     }
//                 }
//             } else if(playerColor === "b" && blackCanCastle) {

//                 if(!bKRookMoved && activeBoard[7][5] === "" && activeBoard[7][6] === "") {

//                     position = {
//                         row: piecePosition.row,
//                         col : piecePosition.col+2
//                     };

//                     /* --- check castling rules for temporary loss of castling ability */
//                     let illegalMove = false;

//                     // king in chess 
//                     let opponentMoves = getAllPossibleMovesOfPlayer("w", board);

//                     for(let move of opponentMoves) {
//                         if(move.row === 7 && move.col === 4) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king crosses a field that can be captured
//                     let tempPosition = {
//                         row: piecePosition.row,
//                         col: piecePosition.col+1
//                     };

//                     let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
//                     let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("w", boardAfterTempMove);

//                     for(let move of opponentMovesAfterTempMove) {
//                         if(move.row === 7 && move.col === 5) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king in chess position after castling
//                     let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
//                     let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("w", boardAfterMove);

//                     for(let move of opponentMovesAfterMove) {
//                         if(move.row === 7 && move.col === 6) {
//                             illegalMove = true;
//                         }
//                     }   

//                     if(!illegalMove) {
//                         legalMoves.push(position);
//                     }
//                 }

//                 if(!bQRookMoved && activeBoard[7][1] === "" && activeBoard[7][2] === "" && activeBoard[7][3] === "") {

//                     position = {
//                         row: piecePosition.row,
//                         col : piecePosition.col-2
//                     };

//                     /* --- check castling rules for temporary loss of castling ability */
//                     let illegalMove = false;

//                     // king in chess 
//                     let opponentMoves = getAllPossibleMovesOfPlayer("w", board);

//                     for(let move of opponentMoves) {
//                         if(move.row === 7 && move.col === 4) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king crosses a field that can be captured
//                     let tempPosition = {
//                         row: piecePosition.row,
//                         col: piecePosition.col-1
//                     };

//                     let boardAfterTempMove = makeMoveAndReturnNewBoard(piecePosition, tempPosition);
//                     let opponentMovesAfterTempMove = getAllPossibleMovesOfPlayer("w", boardAfterTempMove);

//                     for(let move of opponentMovesAfterTempMove) {
//                         if(move.row === 7 && move.col === 3) {
//                             illegalMove = true;
//                         }
//                     }

//                     // king in chess position after castling
//                     let boardAfterMove = makeMoveAndReturnNewBoard(piecePosition, position);
//                     let opponentMovesAfterMove = getAllPossibleMovesOfPlayer("w", boardAfterMove);

//                     for(let move of opponentMovesAfterMove) {
//                         if(move.row === 7 && move.col === 2) {
//                             illegalMove = true;
//                         }
//                     }   

//                     if(!illegalMove) {
//                         legalMoves.push(position);
//                     }
//                 }
//             }

//             for(let j = -1; j < 2; j++) {

//                 if(j == 0) {

//                     if(piecePosition.col-1 >= 0 && piecePosition.col-1 < 8) {

//                         position = {
//                             row: piecePosition.row,
//                             col : piecePosition.col-1
//                         };

//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // this move doesnt set player in chess
//                                 if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     legalMoves.push(position);
//                                 }
//                             } else {
//                                 legalMoves.push(position);
//                             }
//                         }

//                     }

//                     if(piecePosition.col+1 >= 0 && piecePosition.col+1 < 8) {

//                         position = {
//                             row: piecePosition.row,
//                             col : piecePosition.col+1
//                         };

//                         if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                             if(chessCheck) {

//                                 // this move doesnt set player in chess
//                                 if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                     legalMoves.push(position);
//                                 }
//                             } else {
//                                 legalMoves.push(position);
//                             }
//                         }
//                     }

//                 } else {

//                     if(piecePosition.row+j >= 0 && piecePosition.row+j < 8) {

//                         for( let k = -1; k < 2; k++) {

//                             if(piecePosition.col+k >= 0 && piecePosition.col+k < 8) {
//                                 position = {
//                                     row: piecePosition.row+j,
//                                     col : piecePosition.col+k
//                                 };

//                                 if(getColorOfPieceAtPosition(position, activeBoard) != playerColor) {

//                                     if(chessCheck) {

//                                         // this move doesnt set player in chess
//                                         if(!makeMoveAndCheckIfChess(piecePosition, position, playerColor)) {
//                                             legalMoves.push(position);
//                                         }
//                                     } else {
//                                         legalMoves.push(position);
//                                     }
//                                 }
//                             }
//                         }
//                     } else {
//                         // out of bounds
//                         continue;
//                     }
//                 }
//             }

//             break;
//     }
//     return legalMoves;
// }