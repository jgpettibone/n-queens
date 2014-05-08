/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution;
  var board = new Board({n:n});

  // recursive subroutine - with everything you keep track of passed as arguments
  var getRookSolution = function(rookBoard, rowIndex, numCols) {

    // exit strategy - when we're in the last row and we've placed a rook
    // want to return the rows since that's what's expected output
    if (rowIndex === numCols) {
      return rookBoard.rows();
    }

    // otherwise keep trying to place the rook
    for (var i = 0; i < numCols; i++){

      // place the rook by toggling the piece (0 -> 1)
      board.togglePiece(rowIndex, i);

      // check if there are any conflicts now that the piece has been placed
      // if we've reached the end of the board, we want to return the solution 
      // (before we start toggling the pieces back)
      if (!rookBoard.hasAnyRooksConflicts()){
        var result = getRookSolution(rookBoard, rowIndex+1, numCols);
        if (result) { return solution = result; }
      }

      // take the rook out of that place (1 -> 0)
      board.togglePiece(rowIndex, i);
    }
  };

  getRookSolution(board, 0, n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n){
//   var solutionCount = 0;
//   var board = new Board({n:n});

//   // recursive subroutine - with everything you keep track of passed as arguments
//   var countRookSolutions = function(rookBoard, rowIndex, numCols) {

//     // exit strategy - when we're in the last row and we've placed a rook
//     // want to increment the count
//     if (rowIndex === numCols) {
//       solutionCount++;
//       return;
//     }

//     // otherwise keep trying to place the rook
//     for (var i = 0; i < numCols; i++){

//       // place the rook by toggling the piece (0 -> 1)
//       board.togglePiece(rowIndex, i);

//       // check if there are any conflicts now that the piece has been placed
//       // if we've reached the end of the board, we want to return the solution 
//       // (before we start toggling the pieces back)
//       if (!rookBoard.hasAnyRooksConflicts()){
//         countRookSolutions(rookBoard, rowIndex+1, numCols);
//       }

//       // take the rook out of that place (1 -> 0)
//       board.togglePiece(rowIndex, i);
//     }
//   };

//   countRookSolutions(board, 0, n, []);
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// The mathematical approach to counting rooks
// we know that we can place the first rook in one of 4 places
// and the second rook in one of 3 places, etc 
// so we can do this without using a board
// window.countNRooksSolutions = function(n){
//   if (n === 0) { return 1; }
//   return n * countNRooksSolutions(n-1);
// };

// Should always do factorial with iterative approach
// faster and no call stack problems
window.countNRooksSolution = function(n) {
  var result = 1;
  for (var i = n; n > 0; i--) result *= i;
  return result;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution;
  var board = new Board({n:n});

  var getQueenSolution = function(queenBoard, rowIndex, numCols) {
    if (rowIndex === numCols) {
      return queenBoard.rows();
    }
    for (var i = 0; i < numCols; i++){

      board.togglePiece(rowIndex, i);
      if (!queenBoard.hasAnyQueensConflicts()){
        var result = getQueenSolution(queenBoard, rowIndex+1, numCols);
        if (result) { return solution = result; }
      }
      board.togglePiece(rowIndex, i);
    }
  };

  getQueenSolution(board, 0, n);
  if (!solution) { solution = board.rows(); }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



window.countNQueensSolutionsBitwise = function(n) {
  var solutionCount = 0;

  // uses minDiagConflict, majDiagConflict, colConflict for conflicts in the 
  // minor diagonal, major diagonal, and column
  // only placing one queen per row so not testing row conflicts
  var countQueenSolutions = function(currentRow, minDiagConflict, majDiagConflict, colConflict) {

    // if we've hit n (the index past the last row), then we've found a solution
    if (currentRow === n) {
      solutionCount++;
      return;
    }

    // we have a conflict if we have any type of conflict    
    var conflicts = minDiagConflict | majDiagConflict | colConflict;

    // starts at 1 and then goes up through increments of 2 (binary numbers)
    // until it shifts over to the size of the board 
    // ex: if n = 4 , (1 << 4) = 10000 = 16, so the last iteration will be 
    // when i = 8 = 1000 [1 = 0001, 2 = 0010, 4 = 0100, 8 = 1000]
    // so i represents the position of the queen in the row
    for (var i = 1; i < 1<<n; i*=2) {

      // if the position of the queen is 1, we want it to AND with 
      // a conflicts that has a 0 in that position so that 
      // conflicts & i is 0
      if (!(conflicts & i)) {
        // the new minDiagConflict and majDiagConflicts are found by 
        // ORing the current queen position to them and then shifting
        // them in the correct direction
        // for instance if the queen is in 1000 (8) and the current 
        // minDiagConflict is in           0100 (4)
        // then add the queen position     1100 (12)
        // and shift it to the left       11000 (24)
        var nextMinDiagConflict = (minDiagConflict | i) << 1;
        var nextMajDiagConflict = (majDiagConflict | i) >> 1;
        result = countQueenSolutions(currentRow+1, nextMinDiagConflict, nextMajDiagConflict, colConflict | i);
        if (result) return solutionCount = result;
      }
    }
  };

  countQueenSolutions(0,0,0,0);
  return solutionCount;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = 0; 
  var board = new Board({n:n});

  var countQueenSolutions = function(queenBoard, rowIndex, numCols) {
    if (rowIndex === numCols) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < numCols; i++){

      board.togglePiece(rowIndex, i);
      if (!queenBoard.hasAnyQueensConflicts()){
        var result = countQueenSolutions(queenBoard, rowIndex+1, numCols);
        if (result) { return solution = result; }
      }
      board.togglePiece(rowIndex, i);
    }
  };

  countQueenSolutions(board, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
