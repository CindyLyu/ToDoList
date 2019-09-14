import React, { Component } from 'react'


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: [],
      index: true,
      content: '',
    }
  }  

  _editTodo(e) {
    this.setState({
      content: e.target.value
    })
  }

  handleDeleteTodo (e) {
    this.props.onDeleteTodo({
      id: e.target.parentNode.id,
    })
  }

  handleEdit(e) {
    this.setState({
      index: Number(e.target.parentNode.id),
    })
  }
  
  handleSubmitEdit(e) {
    if (e.keyCode === 13) {
      this.props.onUpdateTodo({
        content: this.state.content,
        id: Number(e.target.parentNode.id),
        isComplete: $(e.target).parent('.list-group-item').find('.fa-square')[0] ? false : true
      })
      this.setState({
        index: '',
        content: ''
      })
    }
  }

  handleIsComplete(e) {
    this.props.onChangeIsComplete({
      isComplete: !$(e.target).hasClass('fa-square'),
      id: Number(e.target.parentNode.id)
    })
  }

  render() {
    const { data } = this.props
    const { isEdit } = this.state
    return(
      <section className='todolist__content'>
        {
          data.map((data, index) => 
            <div className='list-group-item list-group-item-action' id={data.id} key={data.id}>
            {
              data.isComplete ?
              <i className="far fa-check-square" onClick={this.handleIsComplete.bind(this)}></i> : 
              <i className="far fa-square" onClick={this.handleIsComplete.bind(this)}></i>
             }
              {
                data.id ===  this.state.index ?
                <input className='todolist__content-edit' value={this.state.content || data.content} onChange={this._editTodo.bind(this)} onKeyDown={this.handleSubmitEdit.bind(this)}></input> : 
                <span className='todolist__content-item'>{data.content}</span>
              }
              {
                data.id ===  this.state.index ?
                <span><span className='todolist__content-message'> （編輯後按 enter 送出）</span><button type='button' className='btn btn-link' onClick={this.handleEdit.bind(this)}>取消編輯</button></span> : 
                <i className="fas fa-pen" onClick={this.handleEdit.bind(this)}></i>
              }
              <i className="fas fa-times" onClick={this.handleDeleteTodo.bind(this)}></i>
           </div>
          )
        }
      </section>
    )
  }
}


export default TodoList