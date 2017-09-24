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


 export default Assigned
