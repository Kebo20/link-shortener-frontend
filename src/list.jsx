import { useState } from 'react'
import { useSave } from './hooks/useSave.js'

export const List = () => {
    const { handleSave, handleClear, tasks } = useSave()
    const [input, setInput] = useState('')
    const [error, setError] = useState('')



    const save = () => {
        // if (e.key === 'Enter') {

        if (input.trim().length > 0) {

            let newInput = input.trim()
            let validate = tasks.indexOf(newInput)
            if (validate < 0) {
                handleSave(newInput)
                setInput('')
                setError('')

                return

            }
            setError('Tarea repetida')


        }


        setError('Ingrese una tarea válida')
        return
        // }
    }

    const clear = () => {
        handleClear()
        setError('')

    }

    return (
        <>
            <div style={{ 'margin': '32px' }}>

                <div style={{ 'margin': '8px' }}>
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                        type="text" placeholder="Ingrese una tarea" aria-label="Text" />
                    <span className='error'>{error}</span>
                </div>

                <div className="container-button" >

                    <button onClick={save}>
                        Añadir
                    </button>

                    <button onClick={clear}>
                        Limpiar
                    </button>

                </div>


            </div>

            <div className="tasks">
                <label>LISTA DE TAREAS:</label>

                <ul>
                    {
                        tasks.map((t) => {
                            return <li key={t}>{t}</li>
                        })
                    }
                </ul>

            </div>
        </>

    )
}