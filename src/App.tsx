import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}

export default App
