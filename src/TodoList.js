/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-env jquery */

import React, { Component } from 'react';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: true,
      content: '',
    };
    this.handleIsComplete = this.handleIsComplete.bind(this);
    this._editTodo = this._editTodo.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  _editTodo(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleDeleteTodo(id) {
    const { onDeleteTodo } = this.props;
    onDeleteTodo({
      id,
    });
  }

  handleEdit(id) {
    this.setState({
      index: Number(id),
    });
  }

  handleSubmitEdit(e) {
    const { onUpdateTodo } = this.props;
    const { content } = this.state;
    if (e.keyCode === 13) {
      onUpdateTodo({
        content,
        id: Number(e.target.parentNode.id),
        isComplete: !$(e.target).parent('.list-group-item').find('.fa-square')[0],
      });
      this.setState({
        index: '',
        content: '',
      });
    }
  }

  handleIsComplete(isComplete, id) {
    const { onChangeIsComplete } = this.props;
    onChangeIsComplete({
      isComplete,
      id,
    });
  }

  render() {
    const { data } = this.props;
    const { index, content } = this.state;
    return (
      <section className="todolist__content">
        {
          data.map(item => (
            <div className="list-group-item list-group-item-action" id={item.id} key={item.id}>
              {
              item.isComplete
                ? <option className="far fa-check-square" onClick={() => this.handleIsComplete(false, item.id)} />
                : <option className="far fa-square" onClick={() => this.handleIsComplete(true, item.id)} />
             }
              {
                item.id === index
                  ? <input className="todolist__content-edit" value={content || item.content} onChange={this._editTodo} onKeyDown={this.handleSubmitEdit} />
                  : <span className="todolist__content-item">{item.content}</span>
              }
              {
                item.id === index
                  ? (
                    <span>
                      <span className="todolist__content-message"> （編輯後按 enter 送出）</span>
                      <button type="button" className="btn btn-link" onClick={this.handleEdit}>取消編輯</button>
                    </span>
                  )
                  : <option className="fas fa-pen" onClick={() => this.handleEdit(item.id)} />
              }
              <option className="fas fa-times" onClick={() => this.handleDeleteTodo(item.id)} />
            </div>
          ))
        }
      </section>
    );
  }
}


export default TodoList;
