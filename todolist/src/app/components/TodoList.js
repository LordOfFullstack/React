import React from 'react';

let styles = {
  list : {
    listStylePosition: 'inside',
    WebkitPaddingStart: '0',
    marginBottom: '40px'
  },
  items: {
    float: 'right',
  }
}

class TodoList extends React.Component {
  handleDelete = () => {
    //alert(item.id)
  }

  render() {
    return (
      <ol style={styles.list}>
        {this.props.items.map(item => (
          <li key={item.id}>
            {item.text}
            <button style={styles.items} onClick={this.props.onItemDelete.bind(null, item)}>X</button>
            <hr />
          </li>
        ))}
      </ol>
    );
  }
}

export default TodoList
