/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isComplete: 0,
    };
    this.id = 3;
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleAddTodo() {
    const { onSubmit } = this.props;
    const { content, isComplete } = this.state;
    onSubmit({
      content,
      isComplete,
      id: this.id++,
    });
    this.setState({
      content: '',
    });
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <header className="todolist__title">ToDoList</header>
        <div className="todolist__additem">
          <input className="todolist__additem-input" placeholder="What needs to be done?" value={content} onChange={this.handleChange} />
          <button className="todolist__additem-add" onClick={this.handleAddTodo} type="button">新增</button>
        </div>
      </div>
    );
  }
}


export default TodoInput;
