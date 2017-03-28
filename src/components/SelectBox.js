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
  // componentDidMount() {
  //   document.addEventListener('click', this.globalMouseClick);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('click', this.globalMouseClick);
  // }
  //
  // globalMouseClick(event) {
  //
  //   if (event) {
  //     var target = event.target;
  //
  //     // Safety fuse
  //     let i = 0;
  //     let hideMenu = true;
  //
  //     target = target.parentElement;
  //     console.log(target.innerHTML)
  //     console.log(this.refs.SelectBox.innerHTML)
  //
  //
  //     // while (this.checkParentElement(target) && i < 10) {
  //     //
  //     //   i++;
  //     //   console.log(i)
  //     //   // if (target.innerHTML == this.refs.comboSelect.innerHTML) {
  //     //   //   hideMenu = false;
  //     //   // }
  //     // }
  //     //
  //     // if (this.open && hideMenu) {
  //     //
  //     //   if (target.className && typeof target.className == 'string' && target.className.indexOf('combo-select-item') > -1) {
  //     //     // nothing
  //     //   } else {
  //     //     event.preventDefault();
  //     //     this.toggleMenu();
  //     //   }
  //     // }
  //   }
  // }

  // checkParentElement(target) {
  //
  //   if (target.parentElement != null) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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
    //window.addEventListener("click", this.listHide(), false);
  }

  listHide() {
    this.setState({ listVisible: false });
    this.setState({ listPositionTop: false });
    //window.removeEventListener("click", this.listHide(), false);
  }

  selectOptionItem(optionData, isChecked){

    if(!this.props.multiple){
      // 일반
      this.setState({
        selectedKey: optionData.optionKey,
        selectedValue: optionData.value,
        selectedName: optionData.name
      }, () => {
        this.props.onChange ? this.props.onChange(this.state.selectedValue, this.state.selectedName) : '';
      });

      this.listHide();

    }else{
      // 멀티
      let arrDate = {
        index: optionData.optionKey,
        name: optionData.name,
        value: optionData.value,
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
          let dataValueArray = [];
          let dataTextArray = [];
          for(var i in this.state.selectedArray) {
            dataValueArray.push(this.state.selectedArray[i].value);
            dataTextArray.push(this.state.selectedArray[i].name);
          }
          this.props.onChange ? this.props.onChange(dataValueArray, dataTextArray) : '';
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
        }, () => {
          let dataValueArray = [];
          let dataTextArray = [];
          for(var i in this.state.selectedArray) {
            dataValueArray.push(this.state.selectedArray[i].value);
            dataTextArray.push(this.state.selectedArray[i].name);
          }
          this.props.onChange ? this.props.onChange(dataValueArray, dataTextArray) : '';
        });
      }
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
              this.state.selectedName
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
    const label= this.props.name;

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