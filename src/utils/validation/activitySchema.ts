import { z } from 'zod'
import { parseISO, isWeekend } from 'date-fns'
import { Activity } from '../../types/activity'

export const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
  startDate: z.string().refine((date) => !isWeekend(parseISO(date)), {
    message: 'Start date cannot be on a weekend',
  }),
  endDate: z.string().refine((date) => !isWeekend(parseISO(date)), {
    message: 'End date cannot be on a weekend',
  }),
  status: z.enum(['open', 'completed']),
})

export const validateActivity = (
  data: Activity,
  existingActivities: Activity[],
) => {
  const parsedStartDate = parseISO(data.startDate)
  const parsedEndDate = data.endDate ? parseISO(data.endDate) : null

  for (const activity of existingActivities) {
    const activityStartDate = parseISO(activity.startDate)
    const activityEndDate = activity.endDate ? parseISO(activity.endDate) : null

    const isOverlapping =
      // Caso onde ambos endDate estão presentes
      parsedEndDate !== null && activityEndDate !== null
        ? (parsedStartDate >= activityStartDate &&
            parsedStartDate <= activityEndDate) ||
          (parsedEndDate >= activityStartDate &&
            parsedEndDate <= activityEndDate) ||
          (parsedStartDate <= activityStartDate &&
            parsedEndDate >= activityEndDate)
        : // Caso onde somente data.endDate está presente
          parsedEndDate !== null
          ? (parsedStartDate >= activityStartDate ||
              parsedEndDate >= activityStartDate) &&
            (!activityEndDate || parsedEndDate <= activityEndDate)
          : // Caso onde somente activity.endDate está presente
            activityEndDate !== null
            ? parsedStartDate <= activityEndDate &&
              parsedStartDate >= activityStartDate
            : // Caso onde nenhum endDate está presente
              parsedStartDate >= activityStartDate

    if (isOverlapping) {
      return {
        success: false,
        message: 'Activity dates cannot overlap with existing activities.',
      }
    }
  }

  return { success: true }
}
