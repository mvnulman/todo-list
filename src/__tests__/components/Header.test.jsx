import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../../components/Header'

describe('Header', () => {
  it('should render the app title', () => {
    render(<Header dark={false} onToggleDark={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lista de Tarefas')
  })

  it('should render moon icon when not dark', () => {
    render(<Header dark={false} onToggleDark={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Ativar modo escuro')
  })

  it('should render sun icon when dark', () => {
    render(<Header dark={true} onToggleDark={vi.fn()} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Ativar modo claro')
  })

  it('should call onToggleDark when button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleDark = vi.fn()
    render(<Header dark={false} onToggleDark={onToggleDark} />)
    await user.click(screen.getByRole('button'))
    expect(onToggleDark).toHaveBeenCalledTimes(1)
  })
})
