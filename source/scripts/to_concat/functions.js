const app = document.querySelector("#app");

const logColor = (title, color) =>
  console.log(title, color)

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
         <button>Add Color</button>
     </form>
  )
}
ReactDOM.render(
  <AddColorForm onNewColor={logColor}/>, app
);

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
