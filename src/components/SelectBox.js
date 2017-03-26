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

  _isSelectedArr(key){
    // 선택된 option을 배열에 넣는다.
  }

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
                    isSelectedArr={this._isSelectedArr.bind(this)(i)}
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

    this.state={
      complete: (!!this.props.complete) || false
    };
  }

  getListValue(e) {
    this.props.onSelect(this.props);
  }

  handleChange(e){
    console.log(event.target.checked)
    //console.log(this.refs.optionCheck.state.isChecked)
    // this.setState({
    //   isChecked: !this.state.isChecked
    // }, function() {
    //   console.log(this.props);
    // }.bind(this));

    this.setState({
      complete: !this.refs.complete.state.checked
    });
  }

  render() {

    // 체크가 된 정보를 배열에 넣음.
    let optionLabelStyle = {
      display: 'block',
      width: '100%',
      height: '100%'
    };

    return(
        <li data-optionValue={this.props.value}>
          {this.props.multiOption ?
            <label style={optionLabelStyle}>
              <input type="checkbox"
                     defaultChecked={this.state.complete}
                     ref="complete"
                     onChange={this.handleChange}
              />
              {this.props.name}
            </label>
            :
            <span style={optionLabelStyle} onClick={this.getListValue.bind(this)}>{this.props.name}</span>
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