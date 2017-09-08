const app = document.querySelector("#app");
import notesCont from "./modules/notes_vals"

console.log(notesCont);

let namesList = notesCont.map(note => note.assigned)

namesList = namesList.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

const editStates = [];

const Text = ({toggle, id, text="", editMode}) => {
  let _text
  const click = e => {
    toggle(!editMode, id)
  }
  return (
    <p
      className="note-text"
      ref={input => _text = input}
      onClick={click}
    >
  {text}</p>)
}

Text.propTypes = {
  noteText: React.PropTypes.string,
}

const Assigned = ({action = f => f, text="", list =[], id}) => {
  let _select;
  const submit = e => {
    e.preventDefault()
    action(_select.value, id)
  }
  return (
    <fieldset className="more-space-below">
      <label>Select list</label>
      <select
        id="myList"
        value={text}
        ref={select => _select = select}
        onChange={submit}
      >
      {
        list.map((el, i) => <Select item={el} key={i} />)
      }
      </select>
    </fieldset>
  )
}

Assigned.PropTypes = {
  text: React.PropTypes.string,
  list: React.PropTypes.array,
}

const Select = ({item}) =>
  <option>{item}</option>

  Select.PropTypes = {
    item: React.PropTypes.string,
  }

const Checkbox = ({checked="false", checkChange, id}) => {
  let _checkbox
  const submit = e => checkChange(id);
  return (
    <form>
    <input
      type="checkbox"
      defaultChecked={checked}
      ref={input => _checkbox = input}
      onChange={submit}
      id={`check${id}`}
    />
    <label htmlFor={`check${id}`}>Completed</label>
    <p>{checked ? "true": "false"}</p>
    </form>
  )
}
Checkbox.PropTypes = {
  checked: React.PropTypes.bool,
  checkChange: React.PropTypes.func,
  id:React.PropTypes.string,
}

const NoteText = ({toggle, noteInput, editHistory, note}) => {
  const editMode = note.editMode || false;
  return (
    <div>
    {
      !editMode ? <Text text={note.text} toggle={toggle} id={note.id} editMode={editMode}/> :
      <TextField
        noteInput={noteInput}
        editHistory={editHistory}
        toggle={toggle}
        id={note.id}
        editMode={editMode}
        text={note.text}
      />
    }
    </div>
  )
}

const TextField = ({toggle, noteInput, editHistory, editMode, id, text=""}) => {
  let _textArea;
  const submit = e => {
    e.preventDefault();
    noteInput(_textArea.value, id);
    editHistory(_textArea.value, id);
    toggle(!editMode, id)
    _textArea.value = "";
  }
  return (
      <form>
      <textarea
        className="more-space-below fake-text"
        placeholder="Enter a note ..."
        defaultValue={text}
        ref={input => _textArea = input}
        onBlur={submit}
      >
      </textarea>
      </form>
  )
}
TextField.PropTypes = {
  noteInput: React.PropTypes.func,
  id: React.PropTypes.number,
}

const Button = ({action, id, label}) => {
  let _btn;
  const submit = e => {
    e.preventDefault();
    action(id);
  }
return (
    <div>
    <button
      type="submit"
      onClick={submit}
      ref={input => _btn = input}
    >
      {label}</button>
  </div>
  )
}
Button.PropTypes = {
  action: React.PropTypes.func,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
}

const Note = ({singleNote, namesList, checkChange, noteInput, editHistory, handleRevert, handleAssigned, handleEditToggle}) => {
  return (
    <article className="note">
      <NoteText
        noteInput={noteInput}
        editHistory={editHistory}
        toggle={handleEditToggle}
        note={singleNote}
      />
      <Checkbox
        checked={singleNote.done}
        id={singleNote.id}
        checkChange={checkChange}
      />
      <Assigned
        text={singleNote.assigned}
        list={namesList}
        id={singleNote.id}
        action={handleAssigned}
      />
      <Button
        action={handleRevert}
        id={singleNote.id}
        label={"Revert"}
      />
    </article>
  )
}
Note.PropTypes = {
  singleNote: React.PropTypes.object,
  checkChange: React.PropTypes.func,
  index: React.PropTypes.string
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notesCont, editStates}
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNoteText = this.handleNoteText.bind(this);
    this.handleEditHistory = this.handleEditHistory.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
    this.handleAssigned = this.handleAssigned.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }
  handleCheck(id) {
    let notes = {...this.state};
    notes = notes.notesCont.map((note, i) => {
      note.done = (id === note.id) ? !note.done: note.done;
    })
    this.setState(notes);
  }
  handleNoteText(val, id) {
    let notes = {...this.state};
    notes = notes.notesCont.map((note, i) => {
      note.text = (id === note.id) ? val: note.text;
    })
    this.setState(notes);
  }
  handleEditToggle(val, id) {
    let notes = {...this.state};
    notes = notes.notesCont.map((note, i) => {
      if (id === note.id) {
        note.editMode = val;
      }
    })
    this.setState(notes);
  }
  handleEditHistory(val, id) {
    let editsList = {...this.state};
    let i;
    editsList.editStates.some((el, indx) => {
      i = (el.id === id)? indx: false;
      return typeof i === "number";
    });
    if (i && typeof i === "number") {
      console.log(editsList.editStates[i].edits);
      editsList.editStates[i].edits.push(val);
    } else {
      const myObject = { id: id, edits: [val], };
      editsList.editStates.push(myObject)
    }
    this.setState(editsList);
  }
  handleAssigned(val, id) {
    console.log(val, id);
    let notes = {...this.state};
    notes = notes.notesCont.map((note, i) => {
      note.assigned = (id === note.id) ? val: note.assigned;
    })
    this.setState(notes);
  }
  handleRevert(id) {
    let editsList = {...this.state};

    // i = which one matches -- index of false
    // l = length of edit chain -- length or false
    let i = false, l = false;
    editsList.notesCont.some((el, indx) => {
      if (el.id === id) {
        i = indx;
        l = editsList.notesCont[indx].edits.length - 1;
      }
      return el.id === id;
    });
    // get entry that will be changed
    let e;
    editsList.notesCont.some((el, indx) => {
      if (el.id === id) {
        e = indx;
      }
      return el.id === id;
    });
    if (typeof(i) === "number" && l > 1) {
        const currIncr = editsList.notesCont[i].increment || false;
        const incr = (currIncr) ? currIncr - 1: l - 1;
        editsList.notesCont[i].increment = incr;
        editsList.notesCont[e].text = editsList.notesCont[i].edits[incr]
    }
    this.setState(editsList);
  }
  render() {
    const notes = this.state;
    return (
      <div className="notes-app">
      {notes.notesCont.map((el, i) =>
        <Note
          singleNote={el}
          namesList={namesList}
          checkChange={this.handleCheck}
          noteInput={this.handleNoteText}
          editHistory={this.handleEditHistory}
          handleRevert={this.handleRevert}
          handleAssigned={this.handleAssigned}
          handleEditToggle={this.handleEditToggle}
          key={i}
        />
      )}
      </div>
    )
  }
}
ReactDOM.render(
  <App />, app
);


// import AddColorForm from "./modules/addForm"
// import { v4 } from "../../../node_modules/uuid";
// const app = document.querySelector("#app");
//
// const colors = [
//   {
//     id: "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
//     title: "ocean at dusk",
//     color: "#00c4e2",
//     rating: 5,
//   },
//   {
//     id: "83c7ba2f-7392-4d7d-9e23-35adbe186046",
//     title: "lawn",
//     color: "#26ac56",
//     rating: 3,
//   },
//   {
//     id: "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
//     title: "bright red",
//     color: "#ff0000",
//     rating: 0,
//   },
// ];
//
// const Star = ({ selected = false, starClick = f => f }) =>
//   <div className={(selected) ? "star selected" : "star"} onClick={starClick} />
//
// Star.propTypes= {
//   selected: React.PropTypes.bool,
//   starClick: React.PropTypes.func,
// };
//
// const StarRating = ({ starsSelected=0, totalStars=5, onRate=f => f }) =>
// <div className="star-rating">
//    {[...Array(totalStars)].map((n, i) =>
//    <Star key={i}
//        selected={i<starsSelected}
//        starClick={() => onRate(i+1)}
//      />
//  )}
//  <p className="star-text"> {starsSelected} of {totalStars}</p>
//  </div>
//
//  StarRating.propTypes= {
//    starsSelected: React.PropTypes.number,
//    totalStars: React.PropTypes.number,
//  };
//
// const ColorList = ({colors=[], onRemove=f => f, onRate=f => f}) => {
// return (
//     <div className="color-list">
//   { (colors.length === 0) ?
//     <p>No colors listed. Add a color</p> :
//     colors.map(color =>
//       <ColorIndv key={color.id}
//       {...color}
//       onRemove={() => onRemove(color.id)}
//       // onRate={() => onRate(color.id)}
//       onRate={(rating) => onRate(color.id, rating)}
//       />
//     )
//   }
// </div>
// )
// }
//
// const ColorIndv = ({title, color, rating=0, onRemove=f=>f, onRate=f=>f}) => {
// return (
//   <section className="color">
//     <h3>{title}</h3>
//     <button className="close" onClick={onRemove}>X</button>
//     <div className="color"
//       style={{backgroundColor: color}}>
//     </div>
//     <div>
//       <StarRating starsSelected={rating} onRate={onRate}/>
//     </div>
//   </section>
// )
// }
//
// const AddColorForm = ({onNewColor=f=>f}) => {
//   let _title, _color;
//   const submit = e => {
//     e.preventDefault();
//     onNewColor(_title.value, _color.value)
//     _title.value = "";
//     _color.value = "#000000";
//     _title.focus();
//   }
//   return (
//     <form onSubmit={submit}>
//        <input ref={input => _title = input}
//          type="text"
//          placeholder="color title ... "
//          required
//          />
//          <input
//            ref={input => _color = input}
//            type="color"
//            required />
//          <button type="submit">Add Color</button>
//      </form>
//   )
// }
//
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//       // this.state = {
//       //   colors: []
//       // }
//       this.state = {colors};
//       this.addColor = this.addColor.bind(this);
//       this.removeColor = this.removeColor.bind(this);
//       this.rateColor = this.rateColor.bind(this);
//     }
//     rateColor(id, rating) {
//       const colors = this.state.colors.map(color =>
//         (color.id !== id) ? color: { ...color, rating }
//       )
//       this.setState({colors});
//     }
//     removeColor(id) {
//       const colors = this.state.colors.filter(
//         color => color.id !== id
//       )
//       this.setState({colors})
//     }
//     addColor(title, color) {
//       const colors = [
//         ...this.state.colors,
//         {
//           id: v4(),
//           title,
//           color,
//           rating:0
//         }
//       ]
//       this.setState({colors})
//     }
//     render() {
//       const { addColor, removeColor, rateColor } = this;
//       const { colors } = this.state;
//       return (
//         <div className="app">
//           <AddColorForm onNewColor={addColor} />
//           <ColorList colors={colors}
//             onRemove={removeColor}
//             onRate={rateColor}
//           />
//         </div>
//       )
//     }
// }
//
// ReactDOM.render(
//   <App />, app
// );
