// import AddColorForm from "./modules/addForm"
import { v4 } from '../../../node_modules/uuid'

const app = document.querySelector("#app");


const colors = [
  {
    "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
    "title": "ocean at dusk",
    "color": "#00c4e2",
    "rating": 5,
  },
  {
    "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
    "title": "lawn",
    "color": "#26ac56",
    "rating": 3,
  },
  {
    "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
    "title": "bright red",
    "color": "#ff0000",
    "rating": 0,
  }
]

const Star = ({ selected = false, starClick=f=>f }) =>
  <div className = {(selected) ? "star selected" : "star" }
  onClick={starClick}>
  </div>

Star.propTypes = {
  selected: React.PropTypes.bool,
  starClick: React.PropTypes.func
}

const StarRating = ({starsSelected=0, totalStars=5, onRate=f=>f}) =>
<div className="star-rating">
   {[...Array(totalStars)].map((n, i) =>
   <Star key={i}
       selected={i<starsSelected}
       starClick={() => onRate(i+1)}
     />
 )}
 <p className="star-text"> {starsSelected} of {totalStars}</p>
 </div>

const ColorList = ({colors=[]}, onRemove=f=>f, onRate=f=>f) => {
  console.log("colorlist", onRemove);
return (
    <div className="color-list">
  { (colors.length === 0) ?
    <p>No colors listed. Add a color</p> :
    colors.map(color =>
      <ColorIndv key={color.id}
      {...color}
      onRemove={() => onRemove(color.id)}
      onRate={() => onRate(color.id)}
      />
    )
  }
</div>
)
}


const ColorIndv = ({title, color, rating=0, onRemove=f=>f, onRate=f=>f}) => {
console.log(onRemove);
return (
  <section className="color">
    <h3>{title}</h3>
    <button onClick={onRemove}>X</button>
    <div className="color"
      style={{backgroundColor: color}}>
    </div>
    <div>
      <StarRating starsSelected={rating} onRate={onRate}/>
    </div>
  </section>
)
}

const AddColorForm = ({onNewColor=f=>f}) => {
  let _title, _color;
  const submit = e => {
    e.preventDefault();
    onNewColor(_title.value, _color.value)
    _title.value = "";
    _color.value = "#000000";
    _title.focus();
  }
  return (
    <form onSubmit={submit}>
       <input ref={input => _title = input}
         type="text"
         placeholder="color title ... "
         required
         />
         <input
           ref={input => _color = input}
           type="color"
           required />
         <button type="submit">Add Color</button>
     </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {colors};
      this.addColor = this.addColor.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.rateColor = this.rateColor.bind(this);
    }
    rateColor(id, rating) {
      const colors = this.state.map(color =>
        (color.id !== d) ? color: { ...color, rating }
      )
      this.setState({colors});
    }
    removeColor(id) {
      const colors = this.state.colors.filter(
        color => color.id !== id
      )
      this.setState({colors})
    }
    addColor(title, color) {
      const colors = [
        ...this.state.colors,
        {
          id: v4(),
          title,
          color,
          rating:0
        }
      ]
      this.setState({colors})
    }
    render() {
      const { addColor, removeColor, rateColor } = this;
      console.log(removeColor);
      const { colors } = this.state;
      return (
        <div className="app">
          <AddColorForm onNewColor={addColor} />
          <ColorList colors={colors}
            onRemove={removeColor}
            onRate={rateColor}
          />
        </div>
      )
    }
}

ReactDOM.render(
  <App />, app
);


// class StarRating extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       starsSelected: 0
//     }
//     this.change = this.change.bind(this)
//   }
//   change(starsSelected) {
//     this.setState({starsSelected});
//   }
//   render() {
//     const {totalStars} = this.props;
//     const {starsSelected} = this.state;
//     return (
//       <div className="star-rating">
//          {[...Array(totalStars)].map((n, i) =>
//          <Star key={i}
//              selected={i<starsSelected}
//              onClick={() => this.change (i+1)}
//            />
//        )}
//        <p> {starsSelected} of {totalStars}</p>
//        </div>
//     )
//   }
// }
// //
// StarRating.propTypes = {
//   totalStars: React.PropTypes.number,
// }
// StarRating.defaultProps = {
//   totalStars: 5,
// }
//
// ReactDOM.render(
//   <StarRating />, app
// );


// const StarRating = React.createClass({
//   displayName: "StarRating",
//   propTypes: {
//     totalStars: React.PropTypes.number,
//   },
//   getDefaultProps() {
//     return {
//       totalStars: 5,
//     }
//   },
//   getInitialState() {
//     return {
//       starsSelected: 0,
//     }
//   },
//   change(starsSelected) {
//     this.setState({starsSelected})
//   },
//   render() {
//     const {totalStars} = this.props;
//     const {starsSelected} = this.state;
//
//     console.log(this.props, this.state);
//
//     return (
//       <div className="star-rating">
//         {[...Array(totalStars)].map((n, i) =>
//         <Star key={i}
//           selected={i<starsSelected}
//           onClick={() => this.change (i+1)} />
//       )}
//       <p> {starsSelected} of {totalStars}</p>
//       </div>
//     )
//   }
// });

// ReactDOM.render(
//   <StarRating />, app
// );








// const logColor = (title, color) =>
//   console.log(title, color)
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
//          <button>Add Color</button>
//      </form>
//   )
// }
// ReactDOM.render(
//   <AddColorForm onNewColor={logColor}/>, app
// );

// const logColor = (title, color) =>
//   console.log(title, color)
//
// class AddColorForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.submit = this.submit.bind(this) // hack to make this workinside submit
//     console.log(this);
//   }
//   submit(e) {
//     const { _title, _color } = this.refs
//     e.preventDefault();
//     this.props.onNewColor(_title.value, _color.value)
//     // alert(`New color: ${_title.value} ${_color.value}`)
//     _title.value = "";
//     _color.value = "#000000";
//     _title.focus();
//   }
//   render() {
//     return (
//       <form onSubmit={this.submit}>
//         <input ref="_title"
//           type="text"
//           placeholder="color title ... "
//           required
//           />
//           <input
//             ref="_color"
//             type="color"
//             required />
//           <button>Add Color</button>
//       </form>
//     )
//   }
// }
//
// ReactDOM.render(
//   <AddColorForm onNewColor={logColor}/>, app
// );
