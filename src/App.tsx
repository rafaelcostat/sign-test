import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { GlobalStyle } from './styles/global'

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  )
}

export default App
