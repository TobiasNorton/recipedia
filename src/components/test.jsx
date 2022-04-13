import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
      super(props)

      this.state = {
        toDoItems: [
          'Make bed',
          'Clean kitchen',
          'Grocery shopping',
          'Gym'
        ],
        inputValue: undefined
      }

    }

    updateInput = (event) => {
      console.log(event)
      this.setState({
        inputValue: event.target.value
      })
    }

    addToDoItem = (event) => {
      console.log('event', event)
      event.preventDefault()
      this.setState({
        toDoItems: [...this.state.toDoItems, this.state.inputValue]
      })
    }
  render() {
    return (
      <div>
        {this.state.toDoItems.map(item => {
          return (
            <div>{item}</div>
          )
        })}
        <form onSubmit={this.addToDoItem}>
          <label htmlFor="to-do">Type your to-do here:</label>
          <input type="text" name="to-do" onChange={this.updateInput} />
          <button type="submit">Submit</button>
        </form>
        
      </div>
    );
  }
}

export default Test;
