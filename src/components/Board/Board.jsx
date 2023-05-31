// class board for the game
import { useEffect, useState,useRef } from "react";
import Tile from "../Tile/Tile";

import "./Board.scss";

const Board = ({action=null}) => {

    // estado board que contiene los valores de las casillas
const [board, setboard] = useState([
[2, 2, 2, 2],
[0, 2, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
]);
useEffect(() => {

    switch (action.action) {
        case "left":
            setboard(moveLeft(board)); // mover las casillas
            break;
        case "right":
            setboard(moveRight(board)); // invertir las casillas horizontalmente
            break;
        case "up":
            setboard(moveUp(board)); // invertir filas y columnas
            break;
        case "down":
            setboard(moveDown(board)); // invertir filas y columnas y verticalmente
            break;
    }
}, [action]);

const invertHorizontalArray = (array) => {
    return array.map((row) => {
        return row.reverse().map((tile) => { // invertir las casillas de cada fila
            return tile;
        }
        );
    });
};

const invertVerticalArray = (array) => {
    return array.reverse().map((row) => { // invertir las filas
        return row.map((tile) => {
            return tile;
        });
    });
};

const invertRowColsArray = (array) => { // invertir filas y columnas
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        const newRow = [];
        for (let j = 0; j < array.length; j++) {
            let element = array[j][i]; // intercambiar filas y columnas
            newRow.push(element);
        }
        newArray.push(newRow);
    }
    return newArray;
};
const rotateLeft = (board) => {
    board = invertHorizontalArray(board);
    board = invertRowColsArray(board);
    return board;
};

const rotateRight = (board) => {
    board = invertVerticalArray(board);
    board = invertRowColsArray(board);
    return board;
};
const moveUp = (board) => {
    board = rotateLeft(board);
    board = moveLeft(board);
    return rotateRight(board);
};

const moveDown = (board) => {
    board = rotateRight(board);
    board = moveLeft(board);
    return rotateLeft(board);
};

const moveRight = (board) => {
    board = invertHorizontalArray(board);
    board = moveLeft(board);
    return invertHorizontalArray(board);
};
const moveLeft = (board) => {
    const newBoard = board.map((row,rowNum) => { // recorrer las filas
        const newRow = row.map((tile) =>  tile); // copiar la fila
        const merged = [];  // array para guardar las casillas que ya se han combinado
        for (let i = 0; i < newRow.length ; i++) {
            if (newRow[i] !== 0) { // si la casilla no está vacía
                let k = i; 
                while (k > 0 && newRow[k-1] === 0) { // mientras la casilla anterior esté vacía
                    k--;
                }
                if (newRow[k-1] === newRow[i] ) { // si la casilla anterior tiene el mismo valor
                    if (merged.includes(k-1)) { // si la casilla anterior ya se ha combinado
                        newRow[k] = newRow[i]; // mover la casilla a la posición anterior
                        newRow[i] = 0; // vaciar la casilla actual
                        continue;
                    }
                    newRow[k-1] = newRow[i] * 2; // combinar las casillas
                    newRow[i] = 0; // vaciar la casilla actual
                    
                    merged.push(k-1); // añadir la casilla anterior al array de casillas combinadas
                    continue; 
                } 
                if (newRow[k] === 0) { // si la casilla anterior está vacía
                    newRow[k] = newRow[i]; // mover la casilla a la posición anterior
                    newRow[i] = 0; // vaciar la casilla actual
                }
            }
        }
        return newRow; // devolver la fila modificada
    });
    return newBoard; // devolver el tablero modificado
    }; 
    // función que renderiza el tablero por filas
    const renderBoard = () => {
        const rows  = board.map((row, rowIndex) => {
            let tiles= row.map((tile, colIndex) => 
                <Tile 
                    value={tile} 
                    key={rowIndex.toString() + colIndex.toString()}
                />
            );
            return (
                <div className="board-row" key={rowIndex}>
                    {tiles}
                </div>
            )
        });
        return (
            <div className="board">
                {rows}
            </div>
        );
    };

    
    return (
        <div className="board-container">
            {renderBoard()}
        </div>
    );
}

export default Board;