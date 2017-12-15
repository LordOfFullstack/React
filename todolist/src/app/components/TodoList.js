import React from 'react';
import './TodoList.less';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChange: '',
      height: ''
    }
  }

  componentWillReceiveProps() {
    // let scrollHeight = this.refs.newText.scrollHeight;
    //
    // this.setState({
    //   height: scrollHeight
    // })

    this.setState({ classChange: this.state.classChange}, () => {
      (this.ul.childNodes.length == 0)
      ? (this.setState({ classChange: 'show'}))
      : (this.setState({ classChange: 'hide'}))
    })
  }

  getNewText = () => {
    let val = this.refs.newText.value;
    return val
  }

  setHeight = () => {
    setTimeout(()=>{
      let scrollHeight = this.refs.newText.scrollHeight;
      console.log(scrollHeight);

      this.setState({
        height: scrollHeight
      })
    })
  }

  render() {
    let styles = {
      items: {
        marginLeft:'5px'
      },
    }
    return (
      <div className="tasks">
        <p className={this.state.classChange} data-text="empty">Нет заданий</p>
        <ol className="todo__list" ref = {el => this.ul = el}>
          {this.props.items.map(item => (
            <li className="list__item" key={item.id}>
              {!item.editable
                ? (<span className={item.done}>{item.text}</span>)
                : (
                  <div className="flex edit__block">
                    <textarea autoFocus='true' style={{height: this.state.height}} defaultValue={item.text} ref="newText" onChange={this.setHeight} onFocus={this.setHeight}></textarea>
                    <div className="edit__buttons">
                      <button className="select-btn save" style={styles.items} onClick={this.props.onItemSave.bind(null, item)}>Сохранить</button>
                      <button className="select-btn reset" style={styles.items} onClick={this.props.onItemReset.bind(null, item)}>Отменить</button>
                    </div>
                  </div>
                )
              }
              <div className="edit__buttons" style={{display: item.display}}>
                <button className="select-btn" name="to_edit" style={{display: item.buttonDisplay}} onClick={this.props.onItemEdit.bind(this, item)}>Редактировать</button>
                <button className="select-btn" name={item.button_class} data-action={this.props.display} style={styles.items} onClick={this.props.onItemOutline.bind(null, item)}>{item.button_text}</button>
                <button className="select-btn delete" style={styles.items} data-action={this.props.display} onClick={this.props.onItemDelete.bind(null, item)}>Удалить</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TodoList
