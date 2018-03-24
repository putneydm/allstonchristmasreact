import colors from "./modules/colors"

import React, { Component } from "../../../node_modules/react"
import ReactDOM from "../../../node_modules/react-dom"
import { Children, PropTypes } from 'react'

const value = ["foo", "bar", "foobar"]
const valueToo = ["oof", "rab", "raboof"]

const fooBar = [
  {
    name:"one",
    id:"wall-one",
    active:false
  },
  {
    name:"two",
    id:"wall-two",
    active:false
  }
]

const gameSpeed = [{wallspeed: 3}]

console.log("foobar", fooBar);


const app = document.querySelector("#app")
const rando = () => Math.floor((Math.random() * 4) + 1);


const NewNote = ({val, clickAction, clickActionToo, speed}) => {
  console.log("val", val);
  return (
    <div
      className="note"
    >
      {val.map((el, i) => <Wall wallVal={el} key={i} speed={speed} />)}
      <Button action={clickAction} />
      <Button action={clickActionToo} />

    </div>
  )
}


const Wall = ({wallVal, speed}) => {
  // let foo = speed[0].wallspeed
  // console.log("speed", foo);

  const styles = {
  	animationDuration:`${speed[0].wallspeed}s`,
  }

  console.log("styles", styles);

  return (
    <div
      className = {wallVal.active? "test-wall active": "test-wall"}
      style = {styles}
    >
    </div>
  )
}


const Button = ({action}) => {
  const clicky = () => {
    action("wall-one")
  }
  return (
    <button
      className="btn"
      value="button"
      onClick={clicky}
    >button</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fooBar, gameSpeed }
    this.buttonClick = this.buttonClick.bind(this)
    this.buttonClickToo = this.buttonClickToo.bind(this)
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  buttonClick(val) {
    const foo = this.findActiveWall(val)
    let barBar = { ...this.state }
    barBar.fooBar[foo].active = !barBar.fooBar[foo].active
    this.setState({barBar})
  }
  buttonClickToo(val) {
    let barBar = { ...this.state }
    console.log("c2", barBar.gameSpeed[0].wallspeed)
    barBar.gameSpeed[0].wallspeed = barBar.gameSpeed[0].wallspeed - .5
    this.setState({barBar})
  }
  findActiveWall(val) {
    const r = this.state.fooBar;
    return r.findIndex((el) => val === el.id)
  }
  _resetAsset(val, stateVal, width, background) {
    console.log(stateVal);
    const foo = this._findActiveWall(val, stateVal)
    stateVal.fooBar[foo].wallStyle = background
    stateVal.fooBar[foo].width = width
    stateVal.fooBar[foo].active = !stateVal.fooBar[foo].active
    return stateVal
  }
  _rando(min, max) {
     return Math.floor(Math.random()*(max-min+1)+min);
  }
  render() {
  const notes = this.state
    return (
        <NewNote
          val = {this.state.fooBar}
          clickAction = {this.buttonClick}
          clickActionToo = {this.buttonClickToo}
          speed = {this.state.gameSpeed}
        />
    )
  }
}
ReactDOM.render(
  <App />, app
)
