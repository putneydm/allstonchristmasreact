  (function() {
    // "use strict"; // use strict test yy

    let headers = ["Book", "Author", "Language", "Published", "Sales"];
    let data = [
      ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
      ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
      ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
      ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
      ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
      ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
      ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"]
    ];

    let foo = "bar";

    var Excel = class extends React.Component {

      constructor() {
        super();
        this.state = {
          headers: headers,
          initialData: data,
          buttonState: false,
          value: 2
        }
      }

      // _sort () {
      //
      //   console.log('sort');
      //
      // }
      //
      // _searchBox() {
      //   return <div>
      //     <form>
      //       <input type="text" />{foo}
      //       <input type="button" value="Search" disabled />
      //     </form>
      //   </div>
      // }

      // TableCell(title, idx) {
      //     let cell = <td key={idx}>{title}</td>
      //     return cell;
      // }
      // TableHead(title, idx) {
      //     let cell = <th key={idx}>{title}</th>
      //     return cell;
      // }
      // TableHeader() {
      //   let header = this.props.headers.map( (title, idx) => {
      //     return this.TableHead(title, idx);
      //   });
      //   return header
      // }
      //
      // TableRow(el, i) {
      //   let row = <tr key={i}>
      //   {el.map( (val, idx) => {
      //       return this.TableCell(val, idx)
      //     })
      //   }
      //   </tr>
      //   return row;
      // }
      //
      // TableBody() {
      //   let body = this.props.initialData.map( (el, i) => {
      //     return this.TableRow(el, i);
      //   });
      //   return body;
      // }


      render() {
          return (
          <div>
          {this.props.headers.map((el, i) => <TableHeader value={el} />
          )}
          </div>
        )
      }
    }

    var TableHeader = class extends React.Component {
        render() {
          console.log(this.props.value);
          return (
            <div>
              {this.props.value}
            </div>
          )
        }
    }

    ReactDOM.render(
      React.createElement(Excel, {
        headers: headers,
        initialData: data,
        initialSearch: null
      }),
      document.querySelector("#app")
    );


  })();

class Clock extends React.Component {

  constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('app')
// );
// }

// setInterval(tick, 1000);
