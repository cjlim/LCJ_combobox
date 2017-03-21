/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SelectBox from './components/SelectBox';

const rootElement = document.getElementById('root');

let optionData = [
  {value: "aaa" ,name: "aaa"},
  {value: "bbb" ,name: "bbb"},
  {value: "ccc" ,name: "ccc"},
  {value: "ddd" ,name: "ddd"},
  {value: "eee" ,name: "eee"},
  {value: "fff" ,name: "fff"},
  {value: "ggg" ,name: "ggg"},
  {value: "hhh" ,name: "hhh"},
  {value: "iii" ,name: "iii"}
];

ReactDOM.render(<SelectBox optionData={optionData} />, rootElement);