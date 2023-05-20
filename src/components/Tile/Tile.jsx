import { useEffect, useState } from "react";
import "./Tile.scss";
import usePrevious from "../../hooks/usePrevious";
// tile component for 2048 game

const Tile = ({ value, row, col, size,movement }) => {
      const [tileValue, setTileValue] = useState(value);
  const [tileRow, setTileRow] = useState(row);
  const [tileCol, setTileCol] = useState(col);
  const [tileSize, setTileSize] = useState(size);
  const [from, setFrom] = useState([row, col]);
  const previosValue = usePrevious(value);

  useEffect(() => {
    if (value !== previosValue) {
        setTileValue(value);
    }
    if(value !==0){
        setTimeout(() => {
            setTileSize(size*1.1);
        }, 100);
        setTimeout(() => {
            setTileSize(size);
        }, 300);
    }
    }, [value, size]);
  useEffect(() => {
    const moveX = movement ? movement[1] : 0;
    const moveY =movement?  movement[0]:0;
    if (moveX !== 0 || moveY !== 0) {
        const toX= (moveX * 100).toString()+"%";
        const toY= (moveY * 100).toString()+"%";
        setFrom([toX,toY]);
        
    }
  },[movement,value]);
  const style =  {
    '--toX': from[0],
    '--toY': from[1],
    transform: `scale(${tileSize})`,
    };
    const movingClass =   movement && (movement[0] !== 0 || movement[1] !== 0) ? "moving" : "";
  return (
    <div
      className={`tile tile-${tileValue} tile-position-${tileRow}-${tileCol} tile-size-${tileSize} ${movingClass}`}
      style={style}
    >
     {tileValue? tileValue: <span style={{visibility:"hidden"}}>{ tileValue}</span>}
    </div>
  );
}

export default Tile;