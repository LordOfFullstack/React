import React from 'react';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //outlined:[],
      done: []
    };
  }

  setFilter = filter => {
    // //this.setState({outlined  : filter})
    //
    // let users = {
    //   finished: 'outline'
    // }
    //
    // //this.setState({outlined  : filter})
    //
    // this.setState(prevState => ({
    //   done: prevState.done.concat(filter),
    //   //outlined: prevState.outlined.concat(users),
    // }));
    //
     //console.log(item.done)
    // //setTimeout(() => {this.props.onItemOutline(this.state.done)})
  }

   done = value => {
     return 'btn ' + ((value===this.state.outlined) ? 'active' : 'default');
   }

  render() {
    let styles = {
      items: {
        float: 'right',
        marginLeft:'5px'
      },
    }
    return (
      <ol className="todo__list">
        {this.props.items.map(item => (
          <li className="list__item" key={item.id}>
            <span className={item.done}>{item.text}</span>
            <button className="select-btn" style={styles.items} onClick={this.props.onItemDelete.bind(null, item)}>Удалить</button>
            <button className="select-btn" style={styles.items} onClick={this.props.onItemOutline.bind(null, item)}>{item.button_text}</button>
          </li>
        ))}
      </ol>
    );
  }
}

export default TodoList
