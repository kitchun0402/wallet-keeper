import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from './redux/store'
import theme from './theme/theme'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRender as render }
