import { useEffect, useState } from "react";
import "./Tile.scss";

const Tile = ({ value }) => {
  const [bigger, setBigger] = useState(false);
  useEffect(() => {
    if (value !== 0) {
      setBigger(true);
      setTimeout(() => {
        setBigger(false);
      }, 500);

    }
  }, [value]);
  return (
    <div
      className={`tile tile-${Math.min(2048,value)} ${bigger && "bigger"}`}
    >
     {value? value: <span style={{visibility:"hidden"}}>{ value}</span>}
    </div>
  );
}

export default Tile;