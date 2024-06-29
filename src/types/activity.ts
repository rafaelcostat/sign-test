export interface Activity {
  id: string
  uid: string
  title: string
  type: string
  description?: string
  startDate: Date
  dueDate: Date
  endDate?: Date
  status: 'Open' | 'Completed'
  createdAt: Date
}
