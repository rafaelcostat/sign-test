// src/components/ActivityForm.tsx
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { activitySchema } from '../utils/validation/activitySchema'

interface ActivityFormProps {
  onSubmit: (data: any) => void
  initialValues: any
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Título</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label>Tipo</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.type && <p>{errors.type.message}</p>}
      </div>
      <div>
        <label>Descrição</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
      </div>
      <div>
        <label>Data de Início</label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.startDate && <p>{errors.startDate.message}</p>}
      </div>
      <div>
        <label>Data Prazo</label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.startDate && <p>{errors.dueDate.message}</p>}
      </div>
      <div>
        <label>Data de Fim</label>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.endDate && <p>{errors.endDate.message}</p>}
      </div>
      <div>
        <label>Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="open">Em Aberto</option>
              <option value="completed">Concluído</option>
            </select>
          )}
        />
        {errors.status && <p>{errors.status.message}</p>}
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default ActivityForm
