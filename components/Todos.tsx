import useTodoStore from '@/store/useTodoStore'
import React from 'react'

function Todos() {
    const todos = useTodoStore(state => state.todos)
    const addTodos = useTodoStore(state => state.addTodos)
    async function getTodos() {
        const res = await fetch("http://localhost:8000/api/todo/all", {
            method: "GET"
          })

          const data = await res.json()

          if(data.success) {
            addTodos(data.data)
          }
    }

    // getTodos()
    
    console.log(todos)
  return (
    <div>Todos</div>
  )
}

export default Todos