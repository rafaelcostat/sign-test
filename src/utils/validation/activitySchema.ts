import { z } from 'zod'
import { isWeekend } from 'date-fns'
import { Activity } from '../../types/activity'

export const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
  startDate: z.coerce.date().refine((date) => !isWeekend(date), {
    message: 'Start date cannot be on a weekend',
  }),
  dueDate: z.coerce.date(),
  endDate: z.coerce
    .date()
    .optional()
    .refine((date) => !isWeekend(date), {
      message: 'End date cannot be on a weekend',
    }),
  status: z.enum(['open', 'completed']),
  uid: z.string(),
})

export const validateActivity = (
  data: Activity,
  existingActivities: Activity[],
) => {
  const parsedStartDate = new Date(data.startDate).toISOString()
  const parsedEndDate = new Date(data.dueDate).toISOString()

  const isOverlapping = existingActivities.some((activity) => {
    const activityStartDate = new Date(activity.startDate).toISOString()
    const activityEndDate = new Date(activity.dueDate).toISOString()

    // Verifica se há sobreposição
    const startsBeforeEndsAfter =
      parsedStartDate <= activityEndDate && parsedEndDate >= activityStartDate
    const startsAfterStartsBefore =
      parsedStartDate >= activityStartDate && parsedStartDate <= activityEndDate
    const endsAfterStartsBefore =
      parsedEndDate >= activityStartDate && parsedEndDate <= activityEndDate

    return (
      startsBeforeEndsAfter || startsAfterStartsBefore || endsAfterStartsBefore
    )
  })

  if (isOverlapping) {
    return {
      success: false,
      message: 'Atividades não podem ter sobreposição de datas',
    }
  }

  return { success: true }
}
