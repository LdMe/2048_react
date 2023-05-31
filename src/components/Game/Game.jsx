import React,{ useCallback, useRef, useState } from "react";
import Board from "../Board/Board";
import Buttons from "../Buttons/Buttons";
import "./Game.scss";

const Game = () => {
    const [action, setaction] = useState({action:"reset",time:Date.now()});
    const setAction = (data)=>{
            console.log(data);
            let result = data;
            if (data === "select" || data === "start") {
                result = "reset";
            }
            setaction({
                action:result,
                time:Date.now()
            });
        };
    return (
        <div className="game">
            <div className="screen">
                <span className="light">
                    <i className="fas fa-circle red"></i>
                    <i className="fas fa-moon purple i-1"></i>
                    <i className="fas fa-moon purple i-2"></i>
                    <i className="fas fa-moon purple i-3"></i>
                    <span className="power">POWER</span>
                    </span>
                <Board action={action} />
                <h1 className="screen-title">GAME BOY <span className="red">C</span><span className="purple">O</span><span className="green">L</span><span className="yellow">O</span><span className="cyan">R</span></h1>
            </div>
        <Buttons actions={setAction}/>
        </div>
    );
}

export default Game;