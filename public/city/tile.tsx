import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss'

export interface NumProps {
    number: number;
    canDraw:boolean;
    inputArr:number[];
    setInputArr:React.Dispatch<React.SetStateAction<number[]>>
}

export const Tile: React.FC<NumProps> = ({number, canDraw, inputArr, setInputArr}) => {

    const [color, setColor] = useState<string>("rgb(235, 232, 232)");
    

  const changeColor = () =>{

    if(canDraw){
        setColor("#3d3d3d");

        var arr = inputArr.map((item, i)=>i == number ? 255 : item);
        setInputArr(arr);
    } 
    
  }

  /*useEffect(()=>{
    inputArr[number] == 0 ? setColor("rgb(235, 232, 232)") : setColor("#3d3d3d");
  },[])*/

  useEffect(()=>{
    inputArr[number] == 0 ? setColor("rgb(235, 232, 232)") : setColor("#3d3d3d");
  },inputArr)

  return (
    <div className='tile' style={{backgroundColor: color}} onMouseOver={changeColor}>
      {number}
    </div>
  )
};