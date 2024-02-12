import { create } from "zustand";

type Todo = {
    title: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}

type State = {
    todos: Todo[];
}

type Action = {
    addTodos: (todos: Todo[]) => void;
    removeTodo: (id: number) => void;
    updateTodo: (id: number,  title: Todo["title"]) => void;
}

const useTodoStore = create<State & Action>((set) => ({
    todos: [],
    addTodos: (todos) => set({ todos, }),
    updateTodo: (id, title) => set(state => {
        const updatedTodos = state.todos.map(todo => todo.id === id ? ({...todo, title}) : todo)
        return ({
            todos: updatedTodos
        })
    }),
    removeTodo: (id) => set(state => ({ todos: state.todos.filter(item => item.id !== id ) }))
}))

export default useTodoStore;