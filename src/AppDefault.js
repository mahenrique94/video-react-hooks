import React, { Component, createRef } from 'react'

import { getAll } from './api'

import { log } from './utils'

import './App.css'

class App extends Component {

    state = {
        task: '',
        tasks: []
    }

    constructor(props) {
        super(props)

        this.appTitle = createRef()
    }

    componentDidMount() {
        const { current } = this.appTitle
        if (current) {
            current.addEventListener('click', log)
        }

        getAll().then(({ tasks }) => this.setState({ tasks }))
    }

    componentWillUnmount() {
        const { current } = this.appTitle
        if (current) {
            current.removeEventListener('click', log)
        }
    }

    render() {
        const { task, tasks } = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title" ref={ this.appTitle }>To-do List</h1>
                    <form className="App-form">
                        <input className="App-input" onChange={ this.handleInputChange } type="text" value={ task }/>
                        <button className="App-btn" onClick={ this.handleBtnClick } type="button">Add</button>
                    </form>
                    <ul className="App-list">
                        { tasks.map(task => <li className="App-item" key={ task }>{ task }</li>) }
                    </ul>
                </header>
            </div>
        )
    }

    handleBtnClick = () => this.setState(({ task, tasks }) => ({ tasks: [].concat(tasks, task) }))

    handleInputChange = e => this.setState({ task: e.target.value })
    
}

export default App
