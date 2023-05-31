import { useEffect, useState } from "react";
import "./Tile.scss";

const Tile = ({ value }) => {
  // estado tileValue que contiene el valor de la casilla, sacado del props value
  const [tileValue, setTileValue] = useState(2);
  return (
    <div
      className={`tile `}
    >
     {tileValue? tileValue: <span style={{visibility:"hidden"}}>{ tileValue}</span>}
    </div>
  );
}

export default Tile;