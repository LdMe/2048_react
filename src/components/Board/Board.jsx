// class board for the game
import { useEffect, useState,useRef } from "react";
import Tile from "../Tile/Tile";

import "./Board.scss";

const Board = ({action=null}) => {

    // estado board que contiene los valores de las casillas
    const [board, setboard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ]);
    
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