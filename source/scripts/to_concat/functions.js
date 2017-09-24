import notesCont from "./modules/notes_vals"
import colors from "./modules/colors"
import { v4 } from "../../../node_modules/uuid"

import React, { Component } from "../../../node_modules/react"
import ReactDOM from "../../../node_modules/react-dom"

const app = document.querySelector("#app")


let namesList = notesCont.map(note => note.assigned)

namesList = namesList.filter((elem, index, self) => index == self.indexOf(elem))
namesList.push("Unassigned")

const editStates = []

const Assigned = ({ action = f => f, text = "", list = [], id }) => {
  let _select
  const submit = (e) => {
    e.preventDefault()
    action(_select.value, id)
  }
  return (
    <div className="hidden">
      <p>Select list</p>
      <select
        id="myList"
        value={text}
        ref={select => _select = select}
        onChange={submit}
      >
        { list.map((el, i) => <Select item={el} key={i} />) }
      </select>
    </div>
  )
}
Assigned.propTypes = {
  action: React.PropTypes.func,
  text: React.PropTypes.string,
  list: React.PropTypes.array,
  id: React.PropTypes.string,
}

Assigned.defaultProps = {
  action: f => f,
  text: "",
  list: [],
  id: "",
};

const Select = ({ item }) =>
  <option>{item}</option>

Select.propTypes = {
  item: React.PropTypes.string,
}
Select.defaultProps = {
  item: "",
}

const ListItem = ({ action, text, id }) => {
  let _listItem
  const listSelect = () => {
    action(text, id)
  }
  return (
    <li
      onClick={listSelect}
    >
      {text}
    </li>
  )
}

ListItem.propTypes = {
  action: React.PropTypes.func,
  text: React.PropTypes.string,
  id: React.PropTypes.string,
}

ListItem.defaultProps = {
  action: f => f,
  text: "",
  id: "",
}

const SelectDropdown = ({ action = f => f, text = "", list = [], id = "" }) =>
  <div className="select">
    <p>Assigned to</p>
    <ul aria-hidden="true">
      <li className="selector"> {list.map(name => name === text ? name : false)}
        <ul>
          {list.map((name, i) =>
            name !== text ? <ListItem action={action} id={id} text={name} key={i} /> : false)}
          </ul>
        </li>
    </ul>
  </div>

SelectDropdown.propTypes = {
  action: React.PropTypes.func,
  text: React.PropTypes.string,
  list: React.PropTypes.array,
  id: React.PropTypes.string,
}
SelectDropdown.defaultProps = {
  action: f => f,
  text: "",
  list: [],
  id: "",
}

const Checkbox = ({ checked = "false", checkChange = f => f, id = "" }) => {
  const submit = () => checkChange(id)
  return (
    <form>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={submit}
        id={`check${id}`}
      />
      <label htmlFor={`check${id}`} >Done</label>
    </form>
  )
}
Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  checkChange: React.PropTypes.func,
  id: React.PropTypes.string,
}
Checkbox.defaultProps = {
  checked: false,
  checkChange: f => f,
  id: "",
}

const ColorPicker = ({ colors, id, selectColor }) =>
  <div className="notes-color-picker">
    <div className="notes-picker-icn" >
      <svg className="icn-color" >
        <use xlinkHref="#crayons" / >
      </svg>
      <div className="notes-colors" > {
        colors.map((color, i) =>
          <ColorSwatch
            color={ color.name }
            id = { id }
            selectColor = { selectColor }
            key = { i }
          />
        ) }
      </div>
    </div>
  </div>

  ColorPicker.propTypes = {
    colors: React.PropTypes.array,
    selectColor: React.PropTypes.func,
    id: React.PropTypes.string,
  }

  const ColorSwatch = ({ color, id, selectColor }) => {
    let _radio
    const submit = (e => selectColor(id, color))
      return (
        <div>
          <input id={`${id}${color}`}
            className={color, "color"}
            name={`clrs-${id}`}
            type="radio"
            value={color}
            ref={input => _radio = input}
            onChange={submit}
          />
          <label
              htmlFor={`${id}${color}`}
              className={color}
            >
              {color}
          </label>
        </div>
    )
}
ColorSwatch.propTypes = {
  color: React.PropTypes.string,
  selectColor: React.PropTypes.func,
  id: React.PropTypes.string,
}

const NoteText = ({ toggle = "false", noteInput = f => f, editHistory = f => f, note = {} }) => {
  const editMode = note.editMode || false
  let _textArea
  const submit = () => {
    noteInput(_textArea.innerText, note.id)
    editHistory(_textArea.innerText, note.id)
    toggle(!editMode, note.id)
  }
const textDisplay = () => {
  _textArea.focus()
  if (!editMode) {
    toggle(!editMode, note.id)
  }
}
  return (
    <div
      contentEditable={editMode}
      className="note-editable"
      ref={input => _textArea = input}
      onBlur={submit}
      onClick={textDisplay}
      placeholder="Enter note text ..."
    >
      {note.text}
    </div>
  )
}

NoteText.propTypes = {
  toggle: React.PropTypes.func,
  noteInput: React.PropTypes.func,
  editHistory: React.PropTypes.func,
  note: React.PropTypes.object,
}

const Button = ({ action = f => f, id = "", label = "" }) => {
  let _btn
  const submit = e => {
    e.preventDefault()
    action(id)
 }
  return (
    <div>
      <button
        type="submit"
        onClick={submit}
        ref={input => _btn=input}
      >
        {label}
      </button>
    </div>
  )
}
Button.propTypes = {
  action: React.PropTypes.func,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
}

const CloseButton = ({ action, id }) => {
  let _btn
  const submit = (e) => {
    e.preventDefault()
    action(id)
 }
  return (
    <svg
      className="note-close-btn"
      aria-hidden="true"
      onClick={submit}
      ref={input => _btn=input}
    >
      <use xlinkHref='#close_icon' />
    </svg>
  )
}
CloseButton.propTypes = {
  action: React.PropTypes.func,
  id: React.PropTypes.string,
}

const RevertButton = ({ action, id }) => {
  let _btn
  const submit = e => {
    e.preventDefault()
    action(id)
  }
  return (
    <svg
      className="note-revert-btn"
      aria-hidden="true"
      onClick={submit}
      ref={input => _btn = input}
    >
      <use xlinkHref="#video-control-previous" />
    </svg>
  )
}

RevertButton.propTypes = {
  action: React.PropTypes.func,
  id: React.PropTypes.string,
}

const RestoreButton = ({ action, id }) => {
  let _btn
  const submit = ((e) => {
    e.preventDefault()
    action(id)
 })
  return (
    <svg
      className="note-revert-btn"
      aria-hidden="true"
      onClick={submit}
      ref = {input => _btn=input}
    >
      <use xlinkHref="#video-control-next" />
    </svg>
  )
}

RestoreButton.propTypes = {
  action: React.PropTypes.func,
  id: React.PropTypes.string,
}

const NewNote = ({ handleNewNote }) => {
  let _note
  const submit = () => handleNewNote()
  return (
    <div
      className="note"
      ref={input => _note=input}
      onClick={submit}
    >
      <p> new note </p>
    </div>
  )
}

NewNote.propTypes = {
  handleNewNote: React.PropTypes.func,
}


const Note = ({ singleNote, namesList, checkChange, noteInput, editHistory, handleRevert, handleAssigned, handleEditToggle, handleNoteRemove, colors, handleColorPicker }) => {
  console.log("note", colors);
  return (
    <article
      className={`note ${singleNote.color}`}
      id={`note-${singleNote.id}`}
      draggable="true"
    >
      <header
        className="note-header">
          <CloseButton
            action={handleNoteRemove}
            id={singleNote.id}
        />
      </header>
      <div
        className="note-content">
          <NoteText
            noteInput={noteInput}
            editHistory={editHistory}
            toggle={handleEditToggle}
            note={singleNote}
        />
      </div>
      <footer
        className="note-footer">
          <ColorPicker
            colors={colors}
            id={singleNote.id}
            selectColor={handleColorPicker}
          />
        <div>
          <RevertButton
            action={handleRevert}
            id={singleNote.id}
            label={"Revert"}
          />
          <RestoreButton
            action={handleRevert}
            id={singleNote.id}
            label={"Revert"}
          />
        </div>
        <div
          className="notes-status">
          <Checkbox
            checked={singleNote.done}
            id={singleNote.id}
            checkChange={checkChange}
          />
          <SelectDropdown
            text={singleNote.assigned}
            list={namesList}
            id={singleNote.id}
            action={handleAssigned}
          />
          <Assigned
            text={singleNote.assigned}
            list={namesList}
            id={singleNote.id}
            action={handleAssigned}
          />
        </div>
      </footer>
    </article>
  )
}
Note.propTypes = {
  singleNote: React.PropTypes.object,
  namesList: React.PropTypes.array,
  checkChange: React.PropTypes.func,
  noteInput: React.PropTypes.func,
  editHistory: React.PropTypes.func,
  handleRevert: React.PropTypes.func,
  handleAssigned: React.PropTypes.func,
  handleEditToggle: React.PropTypes.func,
  handleNoteRemove: React.PropTypes.func,
  colors: React.PropTypes.array,
  handleColorPicker: React.PropTypes.func,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notesCont, editStates }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleNoteText = this.handleNoteText.bind(this)
    this.handleEditHistory = this.handleEditHistory.bind(this)
    this.handleRevert = this.handleRevert.bind(this)
    this.handleAssigned = this.handleAssigned.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleNoteRemove = this.handleNoteRemove.bind(this)
    this.handleNewNote = this.handleNewNote.bind(this)
    this.handleColorPicker = this.handleColorPicker.bind(this)
  }
  handleNewNote() {
    const notes = { ...this.state }
    const newNote = {}
    newNote.id = v4()
    newNote.text = ""
    newNote.assigned = "Unassigned"
    newNote.done = false
    newNote.editMode = true
    notes.notesCont.push(newNote)
    this.setState(notes)
  }
  handleNoteRemove(id) {
    let notes = { ...this.state }
    let toRemove
    notes.notesCont = notes.notesCont.filter(note => id !== note.id)
    this.setState(notes)
  }
  handleCheck(id) {
  let notes = { ...this.state }
    notes = notes.notesCont.map((note, i) => {
      note.done = (id === note.id) ? !note.done : note.done
    })
    this.setState(notes)
  }
  handleColorPicker(id, value) {
    let notesCont = [...this.state.notesCont]
    notesCont
      .filter(note => id === note.id)
      .map((note, i) => {
        note.color = value
    })
    this.setState({ notesCont })
  }
  handleNoteText(val, id) {
    let notes = { ...this.state }
    notes = notes.notesCont.map(note => note.text = (id === note.id) ? val : note.text)
    this.setState(notes)
  }
  handleEditToggle(val, id) {
    let notes = { ...this.state }
    notes = notes.notesCont.map(note => {
      if (id === note.id) {
        note.editMode = val
      }
    })
    this.setState(notes)
  }
  handleEditHistory(val, id) {
    const editsList = { ...this.state }
    let i
    editsList.editStates.some((el, indx) => {
      i = (el.id === id) ? indx : false
      return typeof i === "number"
    })
    if (i && typeof i === "number") {
      editsList.editStates[i].edits.push(val)
    } else {
      const myObject = { id: id, edits: [val] }
      editsList.editStates.push(myObject)
    }
    this.setState(editsList)
  }
  handleAssigned(val, id) {
    let notes = { ...this.state }
    notes = notes.notesCont.map(note => note.assigned = (id === note.id) ? val : note.assigned)
    this.setState(notes)
  }
  handleRevert(id) {
    const editsList = { ...this.state }
    // i=which one matches -- index of false
    // l=length of edit chain -- length or false
    let i = false
    let l = false
    editsList.notesCont.some((el, indx) => {
      if (el.id === id) {
        i = indx
        l = editsList.notesCont[indx].edits.length - 1
      }
      return el.id === id
    })
    // get entry that will be changed
    let e
    editsList.notesCont.some((el, indx) => {
      if (el.id === id) {
        e = indx
      }
      return el.id === id
    })
    if (typeof (i) === "number" && l > 1) {
      const currIncr = editsList.notesCont[i].increment || false
      const incr = (currIncr) ? currIncr - 1 : l - 1
      editsList.notesCont[i].increment = incr
      editsList.notesCont[e].text = editsList.notesCont[i].edits[incr]
    }
    this.setState(editsList)
  }
  render() {
  const notes = this.state
  console.log('colors', colors);
    return (
      <div className="notes-app" > {
        notes.notesCont.map((el, i) => (
          <Note
            singleNote={el}
            namesList={namesList}
            colors={colors}
            checkChange={this.handleCheck}
            noteInput={this.handleNoteText}
            editHistory={this.handleEditHistory}
            handleRevert={this.handleRevert}
            handleAssigned={this.handleAssigned}
            handleEditToggle={this.handleEditToggle}
            handleNoteRemove={this.handleNoteRemove}
            handleColorPicker={this.handleColorPicker}
            key={i}
          />)
      )}
        <NewNote handleNewNote={this.handleNewNote} />
      </div>
    )
  }
}
ReactDOM.render(
  <App />, app
)
