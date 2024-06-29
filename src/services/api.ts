import axios from 'axios'
import { Activity } from '../types/activity'

const api = axios.create({
  baseURL: 'http://localhost:5001',
})

export const getActivities = async (): Promise<Activity[]> => {
  const response = await api.get('/activities')
  return response.data
}

export const getActivityById = async (id: string): Promise<Activity> => {
  const response = await api.get(`/activities/${id}`)
  return response.data
}

export const addActivity = async (activity: Activity): Promise<Activity> => {
  const response = await api.post('/activities', activity)
  return response.data
}

export const updateActivity = async (
  id: number,
  activity: Activity,
): Promise<Activity> => {
  const response = await api.put(`/activities/${id}`, activity)
  return response.data
}

export const deleteActivity = async (id: number): Promise<void> => {
  const response = await api.delete(`/activities/${id}`)
  return response.data
}
