export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  //function for flipping tiles
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    let numberOfBombs = 0;
    // checking neighboring tiles
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      //making sure the tiles do exist in the board, not outside of it
      if (neighborRowIndex >= 0 && neighborRowIndex <= this._bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex <= this._bombBoard[0].length) {
        //checking for the B on the bombBoard at the neighbouring indices
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //my custom function for formatting the board and outputting to screen
  static print(board) {
    let joinedBoard = [];
    // going through the two dimension array one row at a time, joining each row and pushing it into joinedBoard array
    for (let i = 0; i < board.length; i++) {
      joinedBoard.push(board[i].join(' | '));
    }
    //outputting each row joined with line break
    console.log(joinedBoard.join('\n'));
    return true;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      board.push([]);
      for (let j = 0; j < numberOfColumns; j++) {
        board[i][j] = ' ';
      }
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      board.push([]);
      for (let j = 0; j < numberOfColumns; j++) {
        board[i][j] = null;
      }
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowNumber = Math.floor(Math.random() * numberOfRows);
      let randomColumnNumber = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowNumber][randomColumnNumber] !== 'B') {
        board[randomRowNumber][randomColumnNumber] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}