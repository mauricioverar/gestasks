import React, { useState, useEffect } from "react"
import TareaForm from "./components/TareaForm/TareaForm"
import ListaTareas from "./components/ListaTareas/ListaTareas"
import type { Tarea } from "./types"

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([])

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas")
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  const agregarTarea = (tarea: Tarea) => {
    setTareas((prev) => [...prev, tarea])
  }

  const completarTarea = (id: string) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    )
  }

  const eliminarTarea = (id: string) => {
    setTareas((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Gestor de Tareas</h1>
      <TareaForm agregarTarea={agregarTarea} />
      <ListaTareas
        tareas={tareas}
        completarTarea={completarTarea}
        eliminarTarea={eliminarTarea}
      />
    </div>
  )
}

export default App
