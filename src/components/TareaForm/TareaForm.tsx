import React, { useState } from "react"
// Tipos globales de la app
import type { Tarea, Prioridad } from "../../types"
import { v4 as uuidv4 } from "uuid"
import "./TareaForm.scss"

type Props = {
  agregarTarea: (tarea: Tarea) => void
}

const TareaForm: React.FC<Props> = ({ agregarTarea }) => {
  
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaLimite, setFechaLimite] = useState("")
  const [prioridad, setPrioridad] = useState<Prioridad>("media")
  const prioridades: Prioridad[] = ["alta", "media", "baja"]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioridad(e.target.value as Prioridad)
  }

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nuevaTarea: Tarea = {
      id: uuidv4(),
      titulo,
      descripcion,
      fechaLimite,
      prioridad,
      completada: false,
    }

    agregarTarea(nuevaTarea)
    setTitulo("")
    setDescripcion("")
    setFechaLimite("")
    setPrioridad("media")
  }

  return (
    <div className="form-container">
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
        />
        <select value={prioridad} onChange={handleChange}>
          {prioridades.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>

        <button type="submit">Agregar tarea</button>
      </form>
    </div>
  )
}

export default TareaForm
