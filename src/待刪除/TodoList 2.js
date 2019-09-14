import React, { Component } from 'react'

/*
  目前問題
    1. v 編輯後的內容要如何傳上去（要找到 id）
    2. v 點編輯會全部一起編輯 rrrr 用 index 看看
    3. 編輯完成後點選其他編輯的項目內容錯誤顯示剛剛編輯完的內容
    4. 點選完成後會變成一半的編輯模式-.-
*/

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

  handleDeleteTodo (e) { // 這邊想傳進 index 會出錯 QQ
    this.props.onDeleteTodo({
      id: e.target.id,
    })
  }

  handleEdit(e) { // 待優化應該可以向上 parend 找到 id 這邊就不用在多加 id
    // 編輯後會壞掉無法再次編輯 whywhy
    // console.log(typeof(Number(e.target.id)))
    this.setState({
      index: Number(e.target.id),
    })
  }
  
  handleSubmitEdit(e) {
    // console.log($(e.target).parent('.list-group-item').find('.fa-square'))
    if (e.keyCode === 13) {
      this.props.onUpdateTodo({
        content: this.state.content,
        id: Number(e.target.parentNode.id),
        isComplete: $(e.target).parent('.list-group-item').find('.fa-square') ? false : true
      })
      this.setState({
        index: ''
      })
    }
  }

  handleIsComplete(e) {
    this.props.onChangeIsComplete({
      isComplete: $(e.target).parent('.list-group-item').find('.fa-square') ? false : true,
      id: Number(e.target.parentNode.id)
    })
  }

  render() {
    const { data } = this.props
    const { isEdit } = this.state
    // console.log(this.state)
    return(
      <section className='todolist__content'>
      {console.log(this.state)}
        {
          data.map((data, index) => {
            if(data.isComplete === true) {
              return <div className='list-group-item list-group-item-action' id={data.id} key={data.id}>
                        <i className="far fa-check-square" onClick={this.handleIsComplete.bind(this)}></i>
                        {
                          data.id ===  this.state.index ?
                          <input className='todolist__content-edit' value={this.state.content || data.content} onChange={this._editTodo.bind(this)} onKeyDown={this.handleSubmitEdit.bind(this)}></input> : 
                          <span className='todolist__content-item'>{data.content}</span>
                        }
                        {
                          data.id ===  this.state.index ?
                          <span><span className='todolist__content-message'> （編輯後按 enter 送出）</span><button type='button' className='btn btn-link' onClick={this.handleEdit.bind(this)}>取消編輯</button></span> : 
                          <i className="fas fa-pen" id={data.id} onClick={this.handleEdit.bind(this)}></i>
                        }
                        <i className="fas fa-times" id={data.id} onClick={this.handleDeleteTodo.bind(this)}></i>
                     </div>
            } else {
              return <div className='list-group-item list-group-item-action' id={data.id} key={data.id}>
                        <i className="far fa-square" onClick={this.handleIsComplete.bind(this)}></i>
                        {
                          data.id ===  this.state.index ? 
                          <input className='todolist__content-edit' value={this.state.content || data.content} onChange={this._editTodo.bind(this)} onKeyDown={this.handleSubmitEdit.bind(this)}></input> : 
                          <span className='todolist__content-item'>{data.content}</span>
                        }
                        {
                          data.id ===  this.state.index ? 
                          <span><span className='todolist__content-message'> （編輯後按 enter 送出）</span><button type='button' className='btn btn-link' onClick={this.handleEdit.bind(this)}>取消編輯</button></span> : 
                          <div><i className='fas fa-pen' id={data.id} onClick={this.handleEdit.bind(this)}></i></div>
                        }
                        <i className='fas fa-times' id={data.id} onClick={this.handleDeleteTodo.bind(this)}></i>
                     </div>
            }
          })
        }
      </section>
    )
  }
}

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


// export default TodoList