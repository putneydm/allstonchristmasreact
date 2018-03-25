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
    active:false,
    wallStyle: 1,
    width: 100,
  },
  {
    name:"two",
    id:"wall-two",
    active:false,
    wallStyle: 2,
    width: 80,
  }
]

const gameSpeed = [{wallspeed: 3}]



const app = document.querySelector("#app")
const rando = () => Math.floor((Math.random() * 4) + 1);


const NewNote = ({val, clickAction, clickActionToo, speed}) => {
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
  console.log("speed", `/siteart/brick_tiles_${wallVal.wallStyle}.svg`);

  const styles = {
  	animationDuration:`${speed[0].wallspeed}s`,
    width:`${wallVal.width}px`,
    backgroundImage: `url(/siteart/brick_tiles_${wallVal.wallStyle}.svg)`
  }
  return (
    <div
      className = {wallVal.active? "test-wall active": "test-wall"}
      style = {styles}
      id = {wallVal.id}
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
    >button x</button>
  )
}

const ButtonDown = ({action}) => {
  const clicky = () => {
    action(true)
  }
  return (
    <button
      className="btn"
      value="button"
      onClick={clicky}
    >Down</button>
  )
}

const ButtonUp = ({action}) => {
  const clicky = () => {
    action(false)
  }
  return (
    <button
      className="btn"
      value="button"
      onClick={clicky}
    >Up</button>
  )
}

const ButtonTurbo = ({action}) => {
  const turboOn = () => {
    action(true)
  }
  const turboOff = () => {
    action(false)
  }
  return (
    <button
      className="btn"
      value="button"
      onTouchStart={turboOn}
      onTouchEnd={turboOff}
    >Must go faster!</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fooBar, gameSpeed }
    this.buttonClick = this.buttonClick.bind(this)
    this.buttonClickToo = this.buttonClickToo.bind(this)
    this.buttonClickThree = this.buttonClickThree.bind(this)
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  buttonClick(val) {
    let barBar = { ...this.state }
    const width = this._rando(50, 120)
    const background = this._rando(1,3)
    const foo = this._resetAsset(val, barBar, width, background)
    this.setState({foo})
  }
  buttonClickToo(val) {
    let barBar = { ...this.state }
    this._positionListener("#wall-one", true)
    // barBar.gameSpeed[0].wallspeed = barBar.gameSpeed[0].wallspeed - .5
    this.setState({barBar})
  }
  _findActiveWall(val) {
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
  _positionListener(el, active) {
    const wall = document.querySelector(el)
    if (active) {
      const interval = setInterval(function(){
        console.log("wall", wall.getBoundingClientRect().left)
      }, 30)
    } else if (!active && interval) {
      clearInterval(interval)
    }
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
