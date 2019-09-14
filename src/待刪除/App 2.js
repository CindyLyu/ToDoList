import React, { Component } from 'react'
import './style.css'

// class Todo extends Component {
//   render() {
//     const { data } = this.props
//     return {
//       // 待解決想改為倒轉的顯示順序
//       data.map(data => {
        
//         if (data.complete === '1') {
//           return <div className='list-group-item list-group-item-action' id={data.id}><i className="far fa-check-square"></i><span className='todolist__content-item'>{data.name}</span><i className="fas fa-pen"></i><i className="fas fa-times"></i></div>
//         } else {
//           return <div className='list-group-item list-group-item-action' id={data.id}><i className="far fa-square"></i><span className='todolist__content-item'>{data.name}</span><i className="fas fa-pen"></i><i className="fas fa-times"></i></div>
//         }
//       }
//     }
//   }
// }
class CancelEdit extends Component {
  render() {
    console.log(this.props.children)
    return (
      <div>{this.props.children}</div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  componentDidMount() {
    fetch('http://cindylyu.tw/todolist/api/todo.php')
      .then(res => res.json())
      .then(data => {
        this.setState({
          todos: data
        })
      })
  }

  
  handleChange (e) {
    this.setState({
      todoText: e.target.value
    })
  }

  addTodo () {
    // const { todoText } = this.state
    this.setState({
      todoText: todoText,
    })
  //   fetch('http://localhost:8080/Week19/hw1/todo.php', {
  //     method: 'POST',
  //     body: JSON.stringify(todoText),
  //     // headers: {
  //     //   'dataType': 'text',
  //     //   'contentType': 'application/x-www-form-urlencoded',
  //     // },
  //   })
  //   .then(response => response.json())
    $.ajax({
      type: 'POST',
      url: 'http://cindylyu.tw/todolist/api/todo.php',
      dataType: 'text',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        todo_name: todoText,
      },
      success: (res) => {
        console.log(res);
      },
      error(jqXHR, textStatus, errorThrown) {
        console.log(`${textStatus} ${errorThrown}`);
      },
    });
  }
  // 新增 ok 但要如何讓網頁 rerender 及讓 input 變空

  shouldComponentUpdate() {
    return true
  }

  changeEdit(e) {
    const todoName = e.target.parentNode.innerText;
    e.target.parentNode.childNodes[1].outerHTML = `<input class='todolist__content-edit' value=${todoName}></input><span class='todolist__content-message'> （編輯後按 enter 送出）</span>`;
    e.target.outerHTML = `<CancelEdit><button type="button" class="btn btn-link">取消編輯</button></CancelEdit>`;
  }


  render() {
    const { todos, todoText } = this.state
    return (
      <main className='todolist'>
        <header className='todolist__title'>ToDoList</header>
        <div className='todolist__additem'>
          <input className='todolist__additem-input' placeholder='What needs to be done?' value={this.state.todoText} onChange={this.handleChange.bind(this)}/>
          <button className='todolist__additem-add' onClick={this.addTodo}>新增</button>
        </div>
        <section className='todolist__process progress'>
          <div className="progress-bar bg-info" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100">67%</div>
        </section>
        <section className='todolist__content'>
          {
            todos.map(todos => {
              if(todos.complete === '1') {
                return <div className='list-group-item list-group-item-action' id={todos.id} key={todos.id}>
                          <i className="far fa-check-square"></i>
                          <span className='todolist__content-item'>{todos.name}</span>
                          <i className="fas fa-pen" onClick={this.changeEdit}></i><i className="fas fa-times">
                       </i></div>
              } else {
                return <div className='list-group-item list-group-item-action' id={todos.id} key={todos.id}>
                          <i className="far fa-square"></i>
                          <span className='todolist__content-item'>{todos.name}</span>
                          <i className="fas fa-pen" onClick={this.changeEdit}></i><i className="fas fa-times"></i>
                       </div>
              }
            })
          }
        </section>
      </main>
    )
  }
}

// complete = 0
// <div class='list-group-item list-group-item-action' id=${list[i].id}><i class="far fa-square"></i><span class='todolist__content-item'></span><i class="fas fa-pen"></i><i class="fas fa-times"></i></div>

export default App