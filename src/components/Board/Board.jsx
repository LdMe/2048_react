// class board for the game
import { useEffect, useState,useRef } from "react";
import Tile from "../Tile/Tile";

import "./Board.scss";

const Board = ({action=null}) => {
    const [board, setboard] = useState([
    [64, 0, 2048, 0],
    [0, 0, 128, 0],
    [0, 256, 0, 0],
    [0, 1024, 512, 0],
    ]);
    const emptyMovements = [
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0]],
    ];
    const [movements, setmovements] = useState(emptyMovements);
    const [isMoving, setisMoving] = useState(false);
    const boardRef = useRef(board);
    const movementsRef = useRef(movements);
    const movingRef = useRef(isMoving);

    const setBoard = (data) => {
        boardRef.current = data;
        setboard(data);
        setMovements(emptyMovements);
    };

    const setMovements = (data) => {
        movementsRef.current = data;
        setmovements(data);
    };

    const setIsMoving = (data) => {
        movingRef.current = data;
        setisMoving(data);
    };
    useEffect(() => {
        console.log("action",action);
        if (action.action === "reset") {
            resetBoard();
        }
        if (["left", "right", "up", "down"].includes(action.action)){
            move(action.action);
        }
    }, [action]);
    
    const copyBoard = (board) => {
        const newBoard = [];
        board.forEach(row => {
            const newRow = [];
            row.forEach(tile => {
                newRow.push(tile);
            });
            newBoard.push(newRow);
        });
        return newBoard;
    };

    const resetBoard = () => {
        setBoard(createRandomTile(createRandomTile(createEmptyBoard())));
    };

    const createEmptyBoard = () => {
        const board =Array(4).fill(0).map(() => Array(4).fill(0));
        return board;
    };

    const move = (direction) => {
        console.log("move",direction);
        if (movingRef.current) {
            return;
        }
        setIsMoving(true);
        const possibleMovements = {
            left: moveLeft,
            right: moveRight,
            up: moveUp,
            down: moveDown,
        };
        let newBoard = copyBoard(boardRef.current);
        let newMovements = copyBoard(emptyMovements);
        [newBoard,newMovements] = possibleMovements[direction](newBoard,newMovements);
        setMovements(newMovements);
        newBoard = createRandomTile(newBoard);
        setTimeout(() => {
            setBoard(newBoard);
            setIsMoving(false);
        }, 300);
    };

    const invertHorizontal = (board,movements) => {
        const newBoard = invertHorizontalArray(board)
        const newMovements = invertHorizontalArray(movements)
        return [newBoard,newMovements];
    };
    
    const invertVertical = (board,movements) => {
        const newBoard = invertVerticalArray(board)
        const newMovements = invertVerticalArray(movements)
        return [newBoard,newMovements];
    };
    
    const invertRowsCols = (board,movements) => {
        let newBoard = invertRowColsArray(board);
        let newMovements = invertRowColsArray(movements);
        
        return [newBoard,newMovements];
    };

    const invertHorizontalArray = (array) => {
        return array.map((row) => {
            return row.reverse().map((tile) => {
                if (Array.isArray(tile)) {
                    return [tile[0],-tile[1]];
                }
                return tile;
            }
            );
        });
    };

    const invertVerticalArray = (array) => {
        return array.reverse().map((row) => {
            return row.map((tile) => {
                if (Array.isArray(tile)) {
                    return [-tile[0],tile[1]];
                }
                return tile;
            });
        });
    };

    const invertRowColsArray = (array) => {
        const newArray = [];
        for (let i = 0; i < array.length; i++) {
            const newRow = [];
            for (let j = 0; j < array.length; j++) {
                let element = array[j][i];
                if (Array.isArray(element)) {
                    element = [element[1],-element[0]];
                }
                newRow.push(element);
            }
            newArray.push(newRow);
        }
        return newArray;
    };

    const rotateLeft = (board,movements) => {
        [board,movements] = invertHorizontal(board,movements);
        [board,movements] = invertRowsCols(board,movements);
        return [board,movements];
    };

    const rotateRight = (board,movements) => {
        [board,movements] = invertVertical(board,movements);
        [board,movements] = invertRowsCols(board,movements);
        return [board,movements];
    };

    const moveUp = (board,movements) => {
        [board,movements] = rotateLeft(board,movements);
        [board,movements] = moveLeft(board,movements);
        return rotateRight(board,movements);
    };

    const moveDown = (board,movements) => {
        [board,movements] = rotateRight(board,movements);
        [board, movements] = moveLeft(board,movements);
        return rotateLeft(board,movements);
    };

    const moveRight = (board,movements) => {
        [board,movements] = invertHorizontal(board,movements);
        [board, movements] = moveLeft(board,movements);
        return invertHorizontal(board,movements);
    };
    
    const moveLeft = (board,movements) => {
        const newMovements = movements.map((row) => {
            const newRow = row.map((tile) =>  tile);
            return newRow;
        });
        const newBoard = board.map((row,rowNum) => {
            const newRow = row.map((tile) =>  tile);
            const merged = []; 
            for (let i = 0; i < newRow.length ; i++) {
                newMovements[rowNum][i] = [0,0];
                if (newRow[i] !== 0) {
                    let k = i;
                    while (k > 0 && newRow[k-1] === 0) {
                        k--;
                    }
                    
                    if (newRow[k-1] === newRow[i] ) {
                        if (merged.includes(k-1)) {
                            newRow[k] = newRow[i];
                            newRow[i] = 0;
                            newMovements[rowNum][i] = [ 0,k-i];
                            continue;
                        }
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
    
    const renderBoard = () => {
        const rows  = board.map((row, rowIndex) => {
            let tiles= row.map((tile, colIndex) => {
                return (
                    <Tile
                        value={tile}
                        movement = {movements[rowIndex][colIndex]}
                        key={rowIndex.toString() + colIndex.toString()}
                    />
                );
            });
            return (
                <div className="board-row" key={rowIndex}>
                    {tiles}
                </div>
            )
        });
        return (
            <div className="board" onKeyDown={moveLeft}>
                {rows}
            </div>
        );
    };

    
    return (
    <div className="board-container">
        {renderBoard()}
        
        
        </div>);
}

export default Board;