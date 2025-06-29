export type Prioridad = "alta" | "media" | "baja"

export type Tarea = {
  id: string
  titulo: string
  descripcion?: string
  fechaLimite?: string
  prioridad?: Prioridad
  completada: boolean
}
