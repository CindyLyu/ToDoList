/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import './style.css';
import TodoInput from './TodoInput';
import ProcessBar from './ProcessBar';
import TodoList from './TodoList';

function handlePercentage(todos) {
  const completeItem = todos.filter(todo => todo.isComplete).length;
  const totalItem = todos.length;
  const completePercentage = Math.round((completeItem / totalItem) * 100);
  return completePercentage;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ content: '跟貓玩', id: 1, isComplete: false }, { content: '寫作業', id: 2, isComplete: false }],
    };
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleIsComplete = this.handleIsComplete.bind(this);
  }

  handleSubmitTodo(todo) {
    const { todos } = this.state;
    this.setState({
      todos: [...todos, todo],
    });
  }

  handleUpdateTodo(data) {
    const { id } = data;
    const { todos } = this.state;
    const newTodos = todos.map(todo => {
      if (todo.id !== id) {
        return todo
      }

      return {
        ...todo,
        content: data.content
      }
    })
    this.setState({
      todos: newTodos,
    });
  }

  handleDeleteTodo(data) {
    const { todos } = this.state;
    const newTodos = todos.filter(item => item.id !== Number(data.id)); // 省列大括號及 return
    this.setState({
      todos: newTodos,
    });
  }

  handleIsComplete(data) {
    const { id } = data;
    const { todos } = this.state;
    this.setState({
      todos: todos.map(todo => {
        if (todo.id !== id) {
          return todo
        }
        return {
          ...todo,
          isComplete: !todo.isComplete
        }
      })
    });
  }

  componentDidUpdate(prevProps ,prevState) {
    if (prevState.todos !== this.state.todos) {
      let percentage = handlePercentage(this.state.todos)
      this.setState({
        percentage,
      });
    }
  }

  render() {
    const { todos, percentage } = this.state;
    return (
      <main className="todolist">
        <TodoInput onSubmit={this.handleSubmitTodo} />
        <ProcessBar data={percentage} />
        <TodoList
          data={todos}
          onUpdateTodo={this.handleUpdateTodo}
          onDeleteTodo={this.handleDeleteTodo}
          onChangeIsComplete={this.handleIsComplete}
        />
      </main>
    );
  }
}


export default App;
