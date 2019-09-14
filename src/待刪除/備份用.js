import React, { Component } from 'react'
import './style.css'



class EditTodo extends Component {
  render () {
    return (
      <div>
        <input className='todolist__content-edit'></input>
        <span className='todolist__content-message'> （編輯後按 enter 送出）</span>
      </div>
    )
  }
}

class BlockTodo extends Component {
  render () {
    const { data } = this.props
    return (
      <div>
        <span className='todolist__content-item'>{data.content}</span>
        <i className='fas fa-pen'></i><i className='fas fa-times'></i>
      </div>
    )
  }
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{'id': 1, 'content': '跟貓玩', 'isComplete': 0}]
    }
  }

  handleSubmitTodo (todo) {
    this.state.todos.push(todo)
    this.setState({
      todos: this.state.todos
    })
  }

  updateTodo () {

  }

  render() {
    return (
      <main className='todolist'>
        <TodoInput onSubmit={this.handleSubmitTodo.bind(this)} />
        <ProcessBar />
        <TodoList data={this.state.todos} submitEdit={this.updateTodo.bind(this)}/>
      </main>
    )
  }
}




export default App