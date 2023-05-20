// class board for the game
import { useEffect, useState,useRef } from "react";

import Tile from "../Tile/Tile";

import "./Board.scss";

const Board = () => {
    const [board, setboard] = useState([
    [4, 0, 2, 0],
    [0, 2, 0, 2],
    [0, 0, 2, 0],
    [0, 4, 0, 0],
    ]);
    const emptyMovements = [
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
    ];
    const [movements, setmovements] = useState(emptyMovements);
    const boardRef = useRef(board);
    const movementsRef = useRef(movements);

    const setBoard = (data) => {
        boardRef.current = data;
        setboard(data);
        setMovements(emptyMovements);
    };
    const setMovements = (data) => {
        movementsRef.current = data;
        setmovements(data);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    const copyBoard = (board) => {
        return board.map((row) => {
            return row.map((tile) => {
                return tile;
            });
        });
    };
    const handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key === "ArrowLeft") {
            let newBoard = copyBoard(boardRef.current);
            let newMovements = copyBoard(emptyMovements);
             [newBoard,newMovements] = moveLeft(newBoard,newMovements);
            
            setMovements(newMovements);
            newBoard = createRandomTile(newBoard);
            setTimeout(() => {
            setBoard(newBoard);
            }, 300);

            console.log("new board",newMovements);
        }
        else if (event.key === "ArrowRight") {
            let newBoard = copyBoard(boardRef.current);
            let newMovements = copyBoard(emptyMovements);

            [newBoard,newMovements] = moveRight(newBoard,newMovements);
            
            setMovements(newMovements);
            newBoard = createRandomTile(newBoard);
            setTimeout(() => {
            setBoard(newBoard);
            }, 300);

            console.log("new board",newMovements,newBoard);
        }
        else if (event.key === "ArrowUp") {

            let newBoard = copyBoard(boardRef.current);
            let newMovements = copyBoard(emptyMovements);
            [newBoard,newMovements] = moveUp(newBoard,newMovements);
            
            setMovements(newMovements);
            newBoard = createRandomTile(newBoard);
            setTimeout(() => {
            setBoard(newBoard);
            }, 300);

            console.log("new board",newMovements,newBoard);
        }
        else if (event.key === "ArrowDown") {
            let newBoard = copyBoard(boardRef.current);
            let newMovements = copyBoard(emptyMovements);
            [newBoard,newMovements] = moveDown(newBoard,newMovements);
            
            setMovements(newMovements);
            newBoard = createRandomTile(newBoard);
            setTimeout(() => {
            setBoard(newBoard);
            }, 300);

            console.log("new board",newMovements,newBoard);
        }


    };
  const animateMovement = (board, movements) => {
    const newBoard = board.map((row, rowIndex) => {
        let tiles= row.map((tile, colIndex) => {
            if (movements && movements[rowIndex][colIndex] && ( movements[rowIndex][colIndex][0] !== 0 || movements[rowIndex][colIndex][1] !== 0)) {
                return (
                    <Tile
                        value={tile}
                        row={rowIndex + movements[rowIndex][colIndex][0]}
                        col={colIndex + movements[rowIndex][colIndex][1]}
                        movement = {movements[rowIndex][colIndex]}
                        size={1}
                        key={rowIndex + colIndex}
                    />
                );
            }
            else {
                return <Tile value={tile} row={rowIndex} col={colIndex} size={1} movement = {movements[rowIndex][colIndex]} key={rowIndex + colIndex}/>;
            }
        });
        return (
            <div className="board-row" key={rowIndex}>
                {tiles}
            </div>
        )
    });
    return newBoard;
};
  const invertHorizontal = (board,movements) => {
        const newBoard = board.map((row) => {
            return row.reverse().map((tile) => tile);
        });

        let newMovements = movements.map((row) => {
            return row.reverse().map((tile) => {
                return [tile[0],-tile[1]];
            });
        });
        return [newBoard,newMovements];
    };
    const invertVertical = (board,movements) => {
        const newBoard = board.reverse();
        let newMovements = movements.reverse();
        newMovements = newMovements.map((column) => {
            return column.map((tile) => {
                return [-tile[0],tile[1]];
            });
        });
        return [newBoard,newMovements];
    };

    const rotateLeft = (board,movements) => {
        let newBoard = [];
        let newMovements = [];
        [board,movements] = invertHorizontal(board,movements);
        for (let i = 0; i < board.length; i++) {
            const newRow = [];
            for (let j = 0; j < board.length; j++) {
                newRow.push(board[j][i]);
            }
            newBoard.push(newRow);

        }
        for (let i = 0; i < movements.length; i++) {
            const newRow = [];
            for (let j = 0; j < movements.length; j++) {
                let tile = movements[j][i];
                newRow.push([tile[1],tile[0]]);
            }
            newMovements.push(newRow);
        }
        return [newBoard,newMovements];
    };
    const rotateRight = (board,movements) => {
        const newBoard = [];
        let newMovements = [];
        [board,movements] = invertVertical(board,movements);
        for (let i = 0; i < board.length; i++) {
            const newRow = [];
            for (let j = 0; j < board.length; j++) {
                newRow.push(board[j][i]);
            }
            newBoard.push(newRow);
        }
        for (let i = 0; i < movements.length; i++) {
            const newRow = [];
            for (let j = 0; j < movements.length; j++) {
                let tile = movements[j][i];
                newRow.push([tile[1],-tile[0]]);
            }
            newMovements.push(newRow);
        }

        return [newBoard,newMovements];
    };

    const moveUp = (board,movements) => {
        console.log("move up")
        let [newBoard,newMovements] = rotateLeft(board,movements);
        [newBoard,newMovements] = moveLeft(newBoard,newMovements);
        return rotateRight(newBoard,newMovements);
    };

    const moveDown = (board,movements) => {
        console.log("move down")
        let [newBoard,newMovements] = rotateRight(board,movements);
        [newBoard, newMovements] = moveLeft(newBoard,newMovements);
        return rotateLeft(newBoard,newMovements);
    };

    const moveRight = (board,movements) => {
        let [newBoard,newMovements] = invertHorizontal(board,movements);
        [newBoard, newMovements] = moveLeft(newBoard,newMovements);
        return invertHorizontal(newBoard,newMovements);
    };
    useEffect(() => {
        const slideLeftTiles = document.querySelectorAll(".slide-left");
        if (slideLeftTiles) {
          slideLeftTiles.forEach((tile) => {
            setTimeout(() => tile.classList.remove("slide-left"), 300);
          });
        }
      }, [board,movements]);
  const moveLeft = (board,movements) => {
    console.log("move left")
    const newMovements = movements.map((row) => {
        const newRow = row.map((tile) =>  tile);
        return newRow;
    });
    const newBoard = board.map((row,rowNum) => {
        const newRow = row.map((tile) =>  tile);
        const merged = []; 
        for (let i = 0; i < newRow.length ; i++) {
            newMovements[rowNum][i] = [ 0,0];
            if (newRow[i] !== 0) {
                console.log("not zero",i,newRow[i]);
                let k = i;
                while (k > 0 && newRow[k-1] === 0) {
                    k--;
                }
                console.log("k",k);
                
                 if (newRow[k-1] === newRow[i] ) {
                    if (merged.includes(k-1)) {
                        newRow[k] = newRow[i];
                        newRow[i] = 0;
                        newMovements[rowNum][i] = [ 0,k-i];
                        console.log("merged",i,newRow[i])
                        continue;
                    }
                    console.log("equal",i,k-1)
                    newRow[k-1] = newRow[i] * 2;
                    newRow[i] = 0;
                    newMovements[rowNum][i] = [0,k-i - 1];
                    merged.push(k-1);
                    continue;
                } 
                if (newRow[k] === 0) {
                    newRow[k] = newRow[i];
                    newRow[i] = 0;
                    newMovements[rowNum][i] = [0,k-i];

                }
            }

        }
        return newRow;
    });
    return [newBoard,newMovements];
    };
    
    const getEmptyTiles = (board) => {
        const emptyTiles = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 0) {
                    emptyTiles.push([i,j]);
                }
            }
        }
        return emptyTiles;
    };
    const createRandomTile = (board) => {
        const emptyTiles = getEmptyTiles(board);
        if (emptyTiles.length === 0) {
            return board;
        }
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomTile[0]][randomTile[1]] = Math.random() < 0.9 ? 2 : 4;
        return board;
    };
    
  // function to render the board
  const renderBoard = () => {
    // create a list of rows
    const rows = animateMovement(board, movements);
    // return the board
    return <div className="board" onKeyDown={moveLeft}>{rows}</div>;
  };

  return <div className="board-container">{renderBoard()}</div>;
}

export default Board;