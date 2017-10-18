const generatePlayerBoard = function (numberOfRows, numberOfColumns) {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    board.push([]);
    for (let j = 0; j < numberOfColumns; j++) {
      board[i][j] = ' ';
    };
  };
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    board.push([]);
    for (let j = 0; j < numberOfColumns; j++) {
      board[i][j] = null;
    };
  };
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowNumber = Math.floor(Math.random() * numberOfRows);
    let randomColumnNumber = Math.floor(Math.random() * numberOfColumns);
    board[randomRowNumber][randomColumnNumber] = 'B';
    numberOfBombsPlaced++;
    //the code needs to be fixed as it can placed bombs on top of one another
  };
  return board;
};

// const printBoard = (board) => {
//   console.log(board.map(function(row){
//     row.join(' | ');
//   }).join('\n'));
//
// };

//my custom function for formatting the board and outputting to screen
const printBoard = board => {
  let joinedBoard = [];
  // going through the two dimension array one row at a time, joining each row and pushing it into joinedBoard array
  for (let i = 0; i < board.length; i++) {
    joinedBoard.push(board[i].join(' | '));
  }
  //outputting each row joined with line break
  console.log(joinedBoard.join('\n'));
  return true;
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);