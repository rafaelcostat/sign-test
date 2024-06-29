import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import AddActivity from './pages/AddActivity'
import EditActivity from './pages/EditActivity'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/add',
    element: <AddActivity />,
  },
  {
    path: '/edit/:id',
    element: <EditActivity />,
  },
])
