import { useState } from "react";
import { createContext } from "react";

export const TaskContext = createContext()

export function TaskContextProvider({ children }) {

    const [tasks, setTasks] = useState(() => {

        let oldTasks = localStorage.getItem('tasks')
        return oldTasks ? JSON.parse(oldTasks) : []
    }
    )

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )

}