import { useEffect, useState } from "react";
import "./Tile.scss";

const Tile = ({ value }) => {
  
  return (
    <div
      className={`tile `}
    >
     {value? value: <span style={{visibility:"hidden"}}>{ value}</span>}
    </div>
  );
}

export default Tile;