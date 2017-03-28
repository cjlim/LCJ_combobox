/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update'
import styles from './SelectBox.css';
import classnames from 'classnames';


class SelectBox extends  Component {
  constructor(props) {
    super(props);

    this.state={
      listVisible: false,
      listPositionTop: false,
      selectBoxHeight: null,
      selectedValue: this.props.optionData[0].value,
      selectedName: this.props.optionData[0].name,
      selectedKey: -1,
      selectedArray: []

    };
  }

  // 클릭시 높이값 계산
  setListPositionTop(box) {
    let y = $(box).offset().top + $(box).outerHeight(),
        positionY = $( document ).height() - y,
        listHeight = $(".lcj-select-list").outerHeight();

    if(positionY < listHeight){
      this.setState({ listPositionTop: true, selectBoxHeight: $(box).outerHeight()});
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

  _isSelectedArr(data, isChecked){

    let arrDate = {
      index: data.optionKey,
      name: data.name,
      value: data.value,
    };

    if(isChecked){
      // data update
      this.setState({
        selectedArray: update(
            this.state.selectedArray,
            {
              $push: [arrDate]
            }
        )
      });
    }else{
      //삭제하는 data의 인덱스를 구한다.
      let index = this.state.selectedArray.findIndex(d => d.index === arrDate.index);

      // data delete
      this.setState({
        selectedArray: update(
            this.state.selectedArray,
            {
              $splice: [[index, 1]]
            }
        )
      });
    }
  }

  render(){

    let listTop, boxHeight;
    if(this.state.listPositionTop){
      listTop = "list-top";
      boxHeight = this.state.selectBoxHeight;
    }else{
      listTop = ""
    }

    let selectedNameArr = [];
    let arrayLength = this.state.selectedArray.length;
    if(arrayLength !== 0){
      for (var i = 0; i < arrayLength; i++) {
        selectedNameArr.push(this.state.selectedArray[i].name);
      }
    }

    return (
        <div className={classnames("ljc-select-box")}>
          <div className={classnames("lcj-select-label")} onClick={this.toggleList.bind(this)} >
            {this.props.multiple ?
              selectedNameArr.toString()
              :
              this.state.selectedValue
            }
          </div>

          <div className={classnames("lcj-select-list " ,listTop)} style={{display: + this.state.listVisible ? "block" : "none", bottom: boxHeight}}>
            <ul>
              {this.props.optionData.map((option, i) => {
                return (
                  <SelectOptionItem
                    value={option.value}
                    name={option.name}
                    key={i}
                    optionKey={i}
                    multiOption={this.props.multiple}
                    onSelect={this._onSelect.bind(this)}
                    handleCheckboxChange={this._isSelectedArr.bind(this)}
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
  }

  getListValue(e) {
    this.props.onSelect(this.props);
  }

  toggleCheckboxChange(e) {
    let isChecked = e.target.checked;

    this.props.handleCheckboxChange(this.props, isChecked)

  }

  render() {
    const value = this.props.value;
    const label= this.props.name;

    return(
        <li data-optionValue={this.props.value}>
          {this.props.multiOption ?
            <label>
              <input type="checkbox"
                     value={value}
                     onChange={this.toggleCheckboxChange.bind(this)}
              />
              &nbsp;{label}
            </label>
            :
            <span onClick={this.getListValue.bind(this)}>{label}</span>
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