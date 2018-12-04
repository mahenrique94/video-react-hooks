import React, { useEffect, useRef, useState } from 'react'

import { getAll } from './api'

import { log } from './utils'

import './App.css'

const App = () => {

    const appTitle = useRef(null)
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (!tasks.length) {
            getAll().then(({ tasks }) => setTasks(tasks))  
        }
    })

    useSetup(appTitle)    

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title" ref={ appTitle }>To-do List</h1>
                <form className="App-form">
                    <input className="App-input" onChange={ e => setTask(e.target.value) } type="text" value={ task }/>
                    <button className="App-btn" onClick={ () => setTasks([].concat(tasks, task)) } type="button">Add</button>
                </form>
                <ul className="App-list">
                    { tasks.map(task => <li className="App-item" key={ task }>{ task }</li>) }
                </ul>
            </header>
        </div>   
    )

}

const useSetup = (appTitle) => {

    useEffect(() => {
        const { current } = appTitle
        if (current) {
            current.addEventListener('click', log)
        }

        return () => {
            current.removeEventListener('click', log)
        }
    })

}

export default App
