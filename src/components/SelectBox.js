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
      listPositionTop: false,
      selectedValue: this.props.optionData[0].value,
      selectedName: this.props.optionData[0].name,
      selectedKey: -1
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

  _onSelect(propsData){

    this.setState({
      selectedKey: propsData.optionKey,
      selectedValue: propsData.value,
      selectedName: propsData.name
    });

    // 멀티 셀렉트일때는 선택후 닫히지 않음
    if(!this.props.multiple){
      this.listHide();
    }
  }

  // _isSelected(key){
  //   if(this.state.selectedKey == key){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  render(){

    let selectStyle = {
      position: 'relative',
      width: '200px',
      height: '38px',
      lineHeight: '36px',
      fontFamily: 'inherit',
      border: '1px solid #999',
      borderRadius: 0,
      boxSizing: 'border-box'
    };

    let listTop;
    if(this.state.listPositionTop){
      listTop = "list-top"
    }else{
      listTop = ""
    }

    return (
        <div className="ljc-select-box" style={selectStyle}>
          <div className="lcj-select-label" onClick={this.toggleList.bind(this)}>{this.state.selectedValue}</div>

          <div className={"lcj-select-list " + listTop} style={{display: + this.state.listVisible ? "block" : "none"}}>
            <ul>
              {this.props.optionData.map((option, i) => {
                return (
                  <SelectOptionItem
                    value={option.value}
                    name={option.name}
                    key={i}
                    optionKey={i}
                    multiOption={this.props.multiple}
                    //isSelected={this._isSelected.bind(this)(i)}
                    onSelect={this._onSelect.bind(this)}
                  />
                );
              })}
            </ul>
          </div>
        </div>
    );
  }
}
// SelectBox.propTypes = {
//   optionData: React.PropTypes.arrayOf(React.PropTypes.object)
// };

class SelectOptionItem extends  Component {
  constructor(props) {
    super(props);

    console.log(this.props)
  }

  getListValue(e) {
    this.props.onSelect(this.props);
  }

  render() {

    // let getChecked = isSelect => {
    //   if(!isSelect) return;
    //
    //   return style;
    // };

    return(
        <li data-optionValue={this.props.value} onClick={this.getListValue.bind(this)}>
          {this.props.multiOption ?
            <label>
              <input type="checkbox" /> {this.props.name}
            </label>
            :
            this.props.name
          }
        </li>
    );
  }
}
// SelectOptionItem.propTypes = {
//   value: React.PropTypes.string.isRequired,
//   name: React.PropTypes.string.isRequired
// };

export default SelectBox;