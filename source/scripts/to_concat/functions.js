const app = document.querySelector("#app");

const notesCont = [
  {
    id: "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
    text: "this is some text",
    assigned: "John Smith",
    done: false,
  },
  {
    id: "83c7ba2f-7392-4d7d-9e23-35adbe186046",
    text: "note text goes here",
    assigned: "Armand Tanzarian",
    done: true,
  },
  {
    id: "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
    text: "this is yet another note here",
    assigned: "John Smith",
    done: true,
  }
]

const Text = ({noteText=""}) =>
<p className="foobar">{noteText}</p>

Text.propTypes = {
  noteText: React.PropTypes.string,
}

const Assigned = ({text=""}) =>
  <p className="assigned-name">{text}</p>

  Assigned.PropTypes = {
    text: React.PropTypes.string,
  }

const Checkbox = ({checked="false", checkChange, id}) => {
  let _checkbox
  const submit = e => {
    // e.preventDefault();
    checkChange(id)
  }
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

const Note = ({singleNote, checkChange, index}) => {
  return (
    <article className="note">
      <Text noteText={singleNote.text} />
      <Checkbox checked={singleNote.done} id={singleNote.id}
        checkChange={checkChange} id={index}
        />
      <Assigned text={singleNote.assigned} />
    </article>
  )
}

  Note.PropTypes = {
    singleNote: React.PropTypes.object,
    checkChange: React.PropTypes.func,
  }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notesCont}
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck(id) {
    let notes = this.state;
    notes.notesCont.map((note, i) => {
      notes.notesCont[id].done = (notes.notesCont[id].id === note.id) ? !notes.notesCont[id].done : notes.notesCont[id].done;
    })
    this.setState(notes);
  }
  handleNoteText(val, id) {
    console.log(val, id);
  }
  render() {
    const notes = this.state;
    return (
      <div className="notes-app">
      {notes.notesCont.map((el, i) =>
        <Note singleNote={el} checkChange={this.handleCheck} index={i} key={i} />
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
