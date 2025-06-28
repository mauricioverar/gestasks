import React from "react"
import type { Tarea } from "../types"

type Props = {
  tareas: Tarea[]
  completarTarea: (id: string) => void
  eliminarTarea: (id: string) => void
}

const ListaTareas: React.FC<Props> = ({
  tareas,
  completarTarea,
  eliminarTarea,
}) => {
  if (tareas.length === 0) {
    return <p>No hay tareas aún. ¡Agrega una!</p>
  }

  return (
    <ul>
      {tareas.map((tarea) => (
        <li
          key={tarea.id}
          style={{ textDecoration: tarea.completada ? "line-through" : "none" }}
        >
          <h3>{tarea.titulo}</h3>
          {tarea.descripcion && <p>{tarea.descripcion}</p>}
          {tarea.fechaLimite && <p>Fecha límite: {tarea.fechaLimite}</p>}
          <p>Prioridad: {tarea.prioridad}</p>
          <button onClick={() => completarTarea(tarea.id)}>
            {tarea.completada ? "Deshacer" : "Completar"}
          </button>
          <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}

export default ListaTareas
