import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Tensor, InferenceSession } from "onnxjs";
import './showTxt.scss'

export interface HelloProps {
  name: string;
  inputArr:number[];
  setInputArr:React.Dispatch<React.SetStateAction<number[]>>
}

export const Hi: React.FC<HelloProps> = ({ name, inputArr, setInputArr }) => {

  const [p_txt, set_p_txt] = useState<string>("0");

  const Predict = async()=>{
    const session = new InferenceSession();
    const uri = "../source/onnxModel.onnx";
    await session.loadModel(uri);

    //console.log(inputArr);
    const inputs = [
      new Tensor(new Float32Array(inputArr), "float32", [1,45]),
    ];

    //console.log(inputs)

    const outputMap = await session.run(inputs);
    const outputTensor = outputMap.values().next().value;
    //console.log(outputTensor)
    const predictions = outputTensor.data;
    const maxPrediction = Math.max(...predictions);
    set_p_txt(predictions.indexOf(maxPrediction));
  }

  const Clear = () =>{
    var arr = inputArr.map((item)=>0);
    setInputArr(arr);
  }

  return (
    <div className='Hi'>
      <button className='predict' onClick={Predict}>Predict</button>
      <button className='clear' onClick={Clear}>Clear</button>
      <div className="predict_txt">{p_txt}</div>
      <div className="logo">MLP</div>
    </div>
  )
};