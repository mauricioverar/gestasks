export type Tarea = {
  id: string
  titulo: string
  descripcion?: string
  fechaLimite?: string
  prioridad?: "alta" | "media" | "baja"
  completada: boolean
}
