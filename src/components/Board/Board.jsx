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

    if (action.action !== "reset") { // si no es el primer movimiento
        setboard(moveLeft(board)); // mover las casillas
    }
}, [action]);
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