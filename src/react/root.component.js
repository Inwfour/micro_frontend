import React from 'react'
import e from '../event-bus'

export default class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      result: []
    }

    this.messageHandler = this.messageHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    e.on('received', this.messageHandler)
  }

  componentDidUnmount() {
    e.off('received', this.messageHandler)
  }

  messageHandler(message) {
    this.setState({
      message: message.text
    })
  }

  // เปลี่ยนแปลงข้อความใน Input
  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  sendMessage() {
    this.setState({
      result: this.state.result.concat(this.state.message)
    }, () => {
      e.emit('message', { text: this.state.result })
    })
   
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        <h1>React Component</h1>
      <div>
        <label>กรอกข้อความขอบคุณที่นี่</label>
        <br/>
        <input text="text" onChange={(e) => this.handleChange(e)} placeholder="Your Test ..."></input>
      </div>
        <p>
          <button onClick={this.sendMessage}>
            Send a message to Angular
          </button>
        </p>

        <p>
          {/* {this.state.message} */}
        </p>
      </div>
    )
  }
}
