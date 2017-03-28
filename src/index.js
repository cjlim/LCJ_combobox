/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SelectBox from './components/SelectBox';

const rootElement = document.getElementById('root');

let optionData = [
  {value: "option01" ,name: "aaa"},
  {value: "option02" ,name: "bbb"},
  {value: "option03" ,name: "ccc"},
  {value: "option04" ,name: "ddd"},
  {value: "option05" ,name: "eee"},
  {value: "option06" ,name: "fff"},
  {value: "option07" ,name: "ggg"},
  {value: "option08" ,name: "hhh"},
  {value: "option09" ,name: "iii"}
];

function fakeFunction(value, text) {
  console.log(value)
  console.log(text)
};

ReactDOM.render(
    <div>
      <SelectBox optionData={optionData} multiple onChange={fakeFunction} />
      <br />
      <br />
      <br />
      <br />
      <SelectBox optionData={optionData} onChange={fakeFunction} />
    </div>

    , rootElement
);