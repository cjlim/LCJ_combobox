/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SelectBox from './components/SelectBox';

const rootElement = document.getElementById('root');

let optionData = [
  {value: "option01" ,label: "aaa"},
  {value: "option02" ,label: "bbb"},
  {value: "option03" ,label: "ccc"},
  {value: "option04" ,label: "ddd"},
  {value: "option05" ,label: "eee"},
  {value: "option06" ,label: "fff"},
  {value: "option07" ,label: "ggg"},
  {value: "option08" ,label: "hhh"},
  {value: "option09" ,label: "iii"}
];

function fakeFunction(value, label) {
  console.log(value)
  console.log(label)
};

ReactDOM.render(
    <div>
      <SelectBox text="- select -" optionData={optionData} multiple onChange={fakeFunction} />
      <br />
      <br />
      <br />
      <br />
      <SelectBox text="- select -" optionData={optionData} onChange={fakeFunction} />
    </div>

    , rootElement
);