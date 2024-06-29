import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'react-datepicker'
import { useContext } from 'react'
import { ActivityContext } from '../../contexts/ActivityContext'

const searchFormSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const context = useContext(ActivityContext)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchActivities(data: SearchFormInputs) {
    context.searchActivityByDateRange(
      data.startDate.toISOString(),
      data.endDate.toISOString(),
    )
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchActivities)}>
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Data de início"
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Data de fim"
          />
        )}
      />
      <button type="submit">
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </SearchFormContainer>
  )
}
