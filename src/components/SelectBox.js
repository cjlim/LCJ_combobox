/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

class SelectBox extends  Component {
  constructor(props) {
    super(props);

    this.state={
      listVisible: false,
      listPositionTop: false
    };
  }

  // 클릭시 높이값 계산
  setListPositionTop(box) {
    let y = $(box).offset().top + $(box).height(),
        positionY = $( document ).height() - y,
        listHeight = $(".lcj-select-list").outerHeight();

    if(positionY < listHeight){
      this.setState({ listPositionTop: true });
    }

  }

  toggleList(e) {
    if(!this.state.listVisible){
      this.listShow(e.target);
    }else{
      this.listHide();
    }
  }

  listShow(t) {
    this.setListPositionTop(t);
    this.setState({ listVisible: true });
    //document.addEventListener("click", this.listHide(), false);
  }

  listHide() {
    this.setState({ listVisible: false });
    this.setState({ listPositionTop: false });
    //document.removeEventListener("click", this.listHide(), false);
  }

  render(){

    let selectStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-19px 0 0 -100px'
    };

    let listTop;
    if(this.state.listPositionTop){
      listTop = "list-top"
    }else{
      listTop = ""
    }

    return (
        <div className="ljc-select-box" style={selectStyle}>
          <div className="lcj-select-label" onClick={this.toggleList.bind(this)}>aaa</div>

          <div className={"lcj-select-list " + listTop} style={{display: + this.state.listVisible ? "block" : "none"}}>
            <ul>
              {this.props.optionData.map((option, i) => {
                return (
                  <SelectOptionItem
                    value={option.value}
                    name={option.name}
                    key={i}
                  />
                );
              })}
            </ul>
          </div>
        </div>
    );
  }
}
SelectBox.propTypes = {
  optionData: React.PropTypes.arrayOf(React.PropTypes.object)
};

class SelectOptionItem extends  Component {
  render() {
    return(
        <li data-optionValue={this.props.value}>{this.props.name}</li>
    );
  }
}
SelectOptionItem.propTypes = {
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default SelectBox;