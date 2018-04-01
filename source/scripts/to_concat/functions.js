import colors from "./modules/colors"

import React, { Component } from "../../../node_modules/react"
import ReactDOM from "../../../node_modules/react-dom"
import { Children, PropTypes } from 'react'

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
const playerPos = [{position:0, turbo:false}]
const containerSize = [{width:0, height: 0}]
const playerSize = [{width:0, height: 0}]

const app = document.querySelector("#app")
const rando = () => Math.floor((Math.random() * 4) + 1);


const NewNote = ({val, clickAction, clickActionToo, clickActionThree, speed, playerPos, turbo}) => {
  return (
    <div
      className="note"
    >
      <Player
        position = {playerPos}
      />
      {val.map((el, i) => <Wall wallVal={el} key={i} speed={speed} />)}
      <Button action={clickAction} />
      <ButtonUp action={clickActionThree} />
      <ButtonDown action={clickActionThree} />
      <ButtonTurbo action={turbo} />
    </div>
  )
}

const Player = (playerPos) => {
  console.log("pos x", playerPos.position[0].position)
  const test = 10
  const styles = {
      border:"1px solid red",
      transform: `translate(0px, ${playerPos.position[0].position}px)`
   }
  return (
    <div
      className = "player"
     // className = {playerPos.position[0].ani? "player ani": "player"}
      style = {styles}
    ></div>
  )


}

const Wall = ({wallVal, speed}) => {
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
    action(false)
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
    this.state = { fooBar, gameSpeed, playerPos, containerSize, playerSize }
    this.buttonClick = this.buttonClick.bind(this)
    this.buttonClickToo = this.buttonClickToo.bind(this)
    this.buttonClickThree = this.buttonClickThree.bind(this)
    this.handleTurbo = this.handleTurbo.bind(this)
  }
  componentWillMount() {
    this.handleKeys()
  }
  componentDidMount() {
    this.getContainerSize()
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
  buttonClickThree(dir) {

    console.log('dir', dir);

    const container = document.querySelector("#app").offsetHeight / 2
    const player = document.querySelector(".player").offsetHeight / 2

    const bottomBound = (container - player)
    const topBound = -Math.abs(container - player)



    let barBar = { ...this.state }

    const inc = barBar.playerPos[0].turbo? 30: 10

    let val = barBar.playerPos[0].position
    val = dir ? val+inc: val-inc
    val = !dir && val < topBound ? topBound: val

    val = dir && val > bottomBound ? bottomBound: val

    // val = dir && val < topBound? val-15: topBound
    barBar.playerPos[0].position = val
    this.setState({barBar})
  }
  handleTurbo(val) {
    console.log("turbo", val);
      let barBar = { ...this.state }
      barBar.playerPos[0].turbo = val
      this.setState({barBar})
  }
  handleKeys(val) {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key
        console.log('keydown event\n\n' + 'key: ' + keyName)
        if (keyName === "ArrowUp") {
          this.buttonClickThree(false)
        } else if (keyName === "ArrowDown") {
          this.buttonClickThree(true)
        } else if (keyName === "Shift") {
          this.handleTurbo(true)
        }
      })

      document.addEventListener('keyup', (event) => {
          const keyName = event.key
          console.log('keydown event\n\n' + 'key: ' + keyName)
          // alert('keydown event\n\n' + 'key: ' + keyName);
         if (keyName === "Shift") {
            this.handleTurbo(false)
          }
        })
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
          clickActionThree = {this.buttonClickThree}
          speed = {this.state.gameSpeed}
          playerPos = {this.state.playerPos}
          turbo = {this.handleTurbo}
        />
    )
  }
}
ReactDOM.render(
  <App />, app
)
