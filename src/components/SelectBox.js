/**
 * Created by limchaejoo on 2017. 3. 17..
 */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
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
      selectedLabel: this.props.optionData[0].label,
      defaultLabel: this.props.text,
      selectedKey: -1,
      selectedArray: []
    };

    this.mounted = true;
    this.seleced = false;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ listVisible: false })
      }
    }
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
      e.preventDefault();
      this.listShow(e.target);
    }else{
      this.listHide();
    }
  }

  listShow(t) {
    this.setListPositionTop(t);
    this.setState({ listVisible: true });
  }

  listHide() {
    this.setState({ listVisible: false });
    this.setState({ listPositionTop: false });
  }

  selectOptionItem(optionData, isChecked){

    if(!this.props.multiple){
      // 일반
      this.setState({
        selectedKey: optionData.optionKey,
        selectedValue: optionData.value,
        selectedLabel: optionData.label
      }, () => {
        this.props.onChange ? this.props.onChange(this.state.selectedValue, this.state.selectedLabel) : '';
      });

      this.seleced = true;
      this.listHide();

    }else{
      // 멀티
      let arrDate = {
        index: optionData.optionKey,
        label: optionData.label,
        value: optionData.value
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
        }, () => {
          this.setSelectedArray();
        });
        this.seleced = true;
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
        }, () => {
          this.setSelectedArray();
        });

        if(this.state.selectedArray.length <= 1){
          this.seleced = false;
        }
      }
    }
  }

  setSelectedArray(){
    let dataValueArray = [];
    let dataTextArray = [];
    for(var i in this.state.selectedArray) {
      dataValueArray.push(this.state.selectedArray[i].value);
      dataTextArray.push(this.state.selectedArray[i].label);
    }
    this.props.onChange ? this.props.onChange(dataValueArray, dataTextArray) : '';
  }

  render(){

    let listTop, boxHeight;
    if(this.state.listPositionTop){
      listTop = "list-top";
      boxHeight = this.state.selectBoxHeight;
    }else{
      listTop = ""
    }

    let selectedLabel;
    let selectedLabelArr = [];
    // 기본 텍스트가 있으면 기본테스트가 나오도록 함.
    if(this.props.text && !this.seleced){
      selectedLabel = this.props.text;
    } else {
      // 기본 텍스트가 없거나, 옵션이 선택되면 그 이후엔 셀렉된 리스트만 나오도록함.
      if(this.props.multiple){
        let arrayLength = this.state.selectedArray.length;
        if(arrayLength !== 0){
          for (var i = 0; i < arrayLength; i++) {
            selectedLabelArr.push(this.state.selectedArray[i].label);
          }
        }
        selectedLabel = selectedLabelArr.toString()
      } else {
        selectedLabel = this.state.selectedLabel;
      }
    }

    return (
        <div className={classnames("ljc-select-box")}>
          <div className={classnames("lcj-select-label")} onClick={this.toggleList.bind(this)} >
            {selectedLabel}
          </div>

          <div className={classnames("lcj-select-list " ,listTop)} style={{display: + this.state.listVisible ? "block" : "none", bottom: boxHeight}}>
            <ul>
              {this.props.optionData.map((option, i) => {
                return (
                  <SelectOptionItem
                    value={option.value}
                    label={option.label}
                    key={i}
                    optionKey={i}
                    multiOption={this.props.multiple}
                    onSelect={this.selectOptionItem.bind(this)}
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
    let isChecked = e.target.checked;

    this.props.onSelect(this.props, isChecked)
  }

  render() {
    const value = this.props.value;
    const label= this.props.label;

    return(
        <li data-optionValue={this.props.value}>
          {this.props.multiOption ?
            <label>
              <input type="checkbox"
                     value={value}
                     onChange={this.getListValue.bind(this)}
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