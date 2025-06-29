import React, { useState } from "react"
import type { Tarea } from "../../types"
import { v4 as uuidv4 } from "uuid"
import "./TareaForm.scss"

type Props = {
  agregarTarea: (tarea: Tarea) => void
}

const TareaForm: React.FC<Props> = ({ agregarTarea }) => {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaLimite, setFechaLimite] = useState("")
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media")

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
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
        />
        <select
          value={prioridad}
          onChange={(e) =>
            setPrioridad(e.target.value as "alta" | "media" | "baja")
          }
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button type="submit">Agregar tarea</button>
      </form>
    </div>
  )
}

export default TareaForm
