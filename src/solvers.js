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
  console.log("board", board);

  // recursive subroutine - with everything you keep track of passed as arguments
  var getRookSolution = function(rookBoard, startRow, numRows) {

    // console.log(rookBoard);

    // exit strategy - when we're in the last row and we've placed a rook
    // want to return the rows since that's what's expected output
    if (startRow === numRows) {
      return rookBoard.rows();
    }

    // otherwise keep trying to place the rook
    for (var i = 0; i < numRows; i++){

      // place the rook by toggling the piece (0 -> 1)
      board.togglePiece(startRow, i);

      // check if there are any conflicts now that the piece has been placed
      // if we've reached the end of the board, we want to return the solution 
      // (before we start toggling the pieces back)
      if (!rookBoard.hasAnyRooksConflicts()){
        var result = getRookSolution(rookBoard, startRow+1, numRows);
        if (result) { return solution = result; }
      }

      // take the rook out of that place (1 -> 0)
      board.togglePiece(startRow, i);
    }
  };

  getRookSolution(board, 0, n, []);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
