import React, { useState, useEffect, useRef } from "react"
import TareaForm from "./components/TareaForm/TareaForm"
import ListaTareas from "./components/ListaTareas/ListaTareas"
import type { FiltroTarea, Tarea } from "./types"

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [filtro, setFiltro] = useState<FiltroTarea>("todas")
  const firstLoad = useRef(true)
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "completadas") return t.completada
    if (filtro === "pendientes") return !t.completada
    return true
  })

  useEffect(() => {
    try {
      const tareasGuardadas = localStorage.getItem("tareas")
      if (tareasGuardadas) {
        //console.log("tareasGuardadas", tareasGuardadas)
        setTareas(JSON.parse(tareasGuardadas))
      }
    } catch (error) {
      console.error("Error al cargar tareas desde localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false // Evita que se ejecute en el primer renderizado
      return
    }

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
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="filtro">Filtrar:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as FiltroTarea)}
        >
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>
      </div>

      <ListaTareas
        tareas={tareasFiltradas}
        completarTarea={completarTarea}
        eliminarTarea={eliminarTarea}
      />
    </div>
  )
}

export default App
