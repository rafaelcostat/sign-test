import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Activity } from '../types/activity'
import { api } from '../services/api'

interface ActivityContextType {
  activities: Activity[]
  fetchActivities: (query?: string) => Promise<void>
  createActivity: (data: Activity) => Promise<void>
  deleteActivity: (id: string) => Promise<void>
  updateActivity: (id: string, data: Activity) => Promise<void>
  getActivityById: (id: string) => Promise<Activity>
  searchActivityByDateRange: (
    startDate: string,
    endDate: string,
  ) => Promise<void>
}

export const ActivityContext = createContext({} as ActivityContextType)

interface ActivityProviderProps {
  children: ReactNode
}

export function ActivitiesProvider({ children }: ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  const createActivity = useCallback(async (data: Activity) => {
    const response = await api.post('/activities', data)

    setActivities((state) => [response.data, ...state])
  }, [])

  const fetchActivities = useCallback(async (query?: string) => {
    const response = await api.get('/activities', {
      params: {
        _sort: '-createdAt',
        q: query,
      },
    })
    setActivities(response.data)
  }, [])

  const deleteActivity = useCallback(async (id: string) => {
    await api.delete(`/activities/${id}`)
    setActivities((state) => state.filter((activity) => activity.id !== id))
  }, [])

  const updateActivity = useCallback(async (id: string, data: Activity) => {
    const response = await api.put(`/activities/${id}`, data)
    setActivities((state) =>
      state.map((activity) => (activity.id === id ? response.data : activity)),
    )
  }, [])

  const getActivityById = useCallback(async (id: string): Promise<Activity> => {
    const response = await api.get(`/activities/${id}`)
    return response.data
  }, [])

  // Devido a uma limitação do JSON Server, não é possível fazer uma busca por range de datas
  const searchActivityByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await api.get('/activities', {
        params: {
          _sort: 'createdAt',
          startDate_gte: startDate,
          startDate_lte: endDate,
        },
      })
      setActivities(response.data)
    },
    [],
  )

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  return (
    <ActivityContext.Provider
      value={{
        activities,
        fetchActivities,
        createActivity,
        deleteActivity,
        updateActivity,
        getActivityById,
        searchActivityByDateRange,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}
