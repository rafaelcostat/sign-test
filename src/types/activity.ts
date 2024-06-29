export interface Activity {
  id: number
  uid: number
  title: string
  type: string
  description?: string
  startDate: string
  dueDate: string
  endDate?: string
  status: 'Open' | 'Completed'
}
