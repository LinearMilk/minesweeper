const generatePlayerBoard = function(numberOfRows, numberOfColumns) {
  let board = [];
  for (let i=0; i<numberOfRows;i++) {
    board.push([]);
    for (let j=0; j<numberOfColumns;j++) {
      board[i][j] = ' ';
    };
  };
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i=0; i<numberOfRows;i++) {
    board.push([]);
    for (let j=0; j<numberOfColumns;j++) {
      board[i][j] = null;
    };
  };
  let numberOfBombsPlaced =0;
  while (numberOfBombsPlaced<numberOfBombs) {
    let randomRowNumber = Math.floor(Math.random() * numberOfRows);
    let randomColumnNumber = Math.floor(Math.random() * numberOfColumns);
    if(board[randomRowNumber][randomColumnNumber]!=='B') {
      board[randomRowNumber][randomColumnNumber] = 'B';
      numberOfBombsPlaced++;
    };
  };
  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ];
  const numberOfRows = bombBoard.length;
  let numberOfBombs = 0;
  // checking neighburing tiles
  neighborOffsets.forEach(offset =>{
    const neighborRowIndex = rowIndex+offset[0];
    const neighborColumnIndex = columnIndex+offset[1];
    //making sure the tiles do exist in the board, not outside of it
    if ((neighborRowIndex>=0) &&(neighborRowIndex<=bombBoard.length)&&(neighborColumnIndex>=0)&&(neighborColumnIndex<=bombBoard[0].length)) {
      //checking for the B on the bombBoard at the neighbouring indices
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
        numberOfBombs++;
      };
    };
  });
  return numberOfBombs;
};

//function for flipping tiles
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !==' ') {
    console.log('This tile has already been flipped!');
    //console.log(playerBoard[rowIndex][columnIndex]);
  }
  else if (bombBoard[rowIndex][columnIndex] ==='B') {
    playerBoard[rowIndex][columnIndex]='B';
  }
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex)
  }
  return;
};

//my custom function for formatting the board and outputting to screen
const printBoard = (board) => {
  let joinedBoard =[];
  // going through the two dimension array one row at a time, joining each row and pushing it into joinedBoard array
  for (let i=0; i<board.length; i++)  {
      joinedBoard.push(board[i].join(' | '));
  }
  //outputting each row joined with line break
  console.log(joinedBoard.join('\n'));
  return(true);
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);


console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated player board:');
printBoard(playerBoard);
