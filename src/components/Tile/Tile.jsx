import { useEffect, useState } from "react";
import "./Tile.scss";

const Tile = ({ value,  movement }) => {
  const [tileValue, setTileValue] = useState(value);
  const [bigger, setBigger] = useState(false);
  const [moveTo, setmoveTo] = useState([0,0]);

  useEffect(() => {
    setTileValue(value);
    if(value !==0){
        setBigger(true);
        setTimeout(() => {
            setBigger(false);
        }, 500); 
    }
    else{
        setBigger(false);
    }
    }, [value]);
  
  useEffect(() => {
    const moveY =movement?  movement[0]:0;
    const moveX = movement ? movement[1] : 0;
    if (moveX !== 0 || moveY !== 0) {
        const toY= (moveY * 100).toString()+"%";
        const toX= (moveX * 100).toString()+"%";
        setmoveTo([toY,toX]);
        
    }
  },[movement,value]);

  const style =  {
    '--toY': moveTo[0],
    '--toX': moveTo[1],
    };
    const movingClass =   movement && (movement[0] !== 0 || movement[1] !== 0) ? "moving" : "";
  return (
    <div
      className={`tile tile-${Math.min(2048,tileValue)} ${bigger && "bigger"} ${movingClass}`}
      style={style}
    >
     {tileValue? tileValue: <span style={{visibility:"hidden"}}>{ tileValue}</span>}
    </div>
  );
}

export default Tile;