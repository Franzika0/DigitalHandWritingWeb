import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Tile } from './tile';
import './canvas.scss'

export interface appProps{
  inputArr:number[];
  setInputArr:React.Dispatch<React.SetStateAction<number[]>>
}


export const Canvas: React.FC<appProps> = ({inputArr, setInputArr}) => {

  const [canDraw, setCanDraw] = useState<boolean>(false);
  const [drawTxt, setDrawTxt] = useState<string>("請點擊螢幕開始作畫");
  const [blockerWidth, setBlockerWidth] = useState<string>("default");

  useEffect(() => {
      document.body.addEventListener('click', CanDraw);
      return () => {
        document.body.removeEventListener('click', CanDraw)
      }
  });

  const CanDraw = () =>{
    setCanDraw(canDraw? false:true);
    setDrawTxt(!canDraw?"請點擊螢幕取消作畫":"請點擊螢幕開始作畫");
    setBlockerWidth(document.body.style.cursor = canDraw?"default":"crosshair");
    //console.log(canDraw);
  }

  const SpawnTiles = () =>{
    
    var arr = [];
    for(var i = 0; i < 45 ; i++){
      arr.push(i);
    }

    return (
      <div>{arr.map((item, i)=>(<Tile key={i} number={item} canDraw={canDraw}  inputArr={inputArr} setInputArr={setInputArr}/>))}</div>
    )
  }

  return (
    <div className='canvas'>
      {SpawnTiles()}
      <div className="drawTxt">{drawTxt}</div>
      <div style={{fontSize:"14px", position:"absolute", top:"-25px"}}>請不要按著滑鼠，十字鼠標為繪畫模式</div>
    </div>
  )
};