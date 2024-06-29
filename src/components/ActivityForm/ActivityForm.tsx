// src/components/ActivityForm.tsx
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { activitySchema } from '../../utils/validation/activitySchema'
import { Activity } from '../../types/activity'

import { BtnWrapper, Content, Error, LinkBtn, Wrapper } from './styles'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

interface ActivityFormProps {
  onSubmit: (data: Activity) => void
  initialValues: Activity
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    setValue('uid', 1)
  }, [])

  return (
    <Content>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <div>
            <label htmlFor="title">Título</label>
            <input {...register('title')} placeholder="Title" required />
            {errors.title && <Error>{errors.title.message}</Error>}
          </div>
          <div>
            <label htmlFor="type">Tipo de atividade</label>
            <input {...register('type')} placeholder="Type" required />
            {errors.type && <Error>{errors.type.message}</Error>}
          </div>
        </Wrapper>

        <div>
          <label htmlFor="description">Descrição</label>
          <textarea {...register('description')} placeholder="Description" />
        </div>

        <Wrapper>
          <div>
            <label htmlFor="startDate">Data de Início</label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  required
                  placeholderText="Selecione uma data"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />

            {errors.startDate && <Error>{errors.startDate.message}</Error>}
          </div>

          <div>
            <label htmlFor="dueDate">Data de Prazo</label>

            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  required
                  placeholderText="Selecione uma data"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.dueDate && <Error>{errors.dueDate?.message}</Error>}
          </div>
        </Wrapper>

        <div>
          <label htmlFor="endDate">Data de Conclusão</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          {errors.endDate && <Error>{errors.endDate.message}</Error>}
        </div>

        <Wrapper>
          <div>
            <label htmlFor="status">Status</label>
            <select {...register('status')}>
              <option value="open">Em andamento</option>
              <option value="completed">Concluído</option>
            </select>
            {errors.status && <Error>{errors.status.message}</Error>}
          </div>

          <div>
            <label htmlFor="uid">Usuário</label>
            <select {...register('uid')}>
              <option value="1">Admin</option>
              <option value="2">Rafael</option>
            </select>
            {errors.uid && <Error>{errors.uid.message}</Error>}
          </div>
        </Wrapper>

        <BtnWrapper>
          <LinkBtn to="/">Voltar</LinkBtn>
          <button type="submit">Salvar</button>
        </BtnWrapper>
      </form>
    </Content>
  )
}

export default ActivityForm
