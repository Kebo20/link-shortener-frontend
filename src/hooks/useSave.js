import { useState, useContext, useMemo } from "react";
import { TaskContext } from "../context/task.jsx";
import { useCallback } from "react";
export function useSave() {
    const { tasks, setTasks } = useContext(TaskContext)

    // const handleSave = useCallback((value) => {
    //     console.log('RENDER handleSave')

    //     let list = structuredClone(tasks)
    //     list = [...list, value]
    //     setTasks(list)

    // }, [])

    const handleSave = (value) => {

        let list = structuredClone(tasks)
        list = [...list, value]
        localStorage.setItem('tasks', JSON.stringify(list))
        setTasks(list)

    }

    const handleClear = () => {
        setTasks([])
        localStorage.setItem('tasks', '[]')
    }


    return { handleSave, handleClear, tasks }
}
