/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React, { Component } from 'react';
import SelectBox from './SelectBox';
import SelectCustomBox from './SelectCustomBox';

class App extends Component {
  render(){
    return (
        <div className="smt-select-box">
          <SelectBox />
          <SelectCustomBox />
        </div>
    );
  }
}

export default App;