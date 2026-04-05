import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '../../components/TaskForm'
import Swal from 'sweetalert2'

describe('TaskForm', () => {
  const mockOnAdd = vi.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
    Swal.fire.mockClear()
  })

  it('should render input and add button', () => {
    render(<TaskForm onAdd={mockOnAdd} />)
    expect(screen.getByPlaceholderText('Adicione sua nova tarefa...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument()
  })

  it('should call onAdd with trimmed text on submit', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAdd={mockOnAdd} />)
    const input = screen.getByPlaceholderText('Adicione sua nova tarefa...')
    await user.type(input, 'New task')
    await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }))
    expect(mockOnAdd).toHaveBeenCalledWith('New task')
  })

  it('should clear input after submit', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAdd={mockOnAdd} />)
    const input = screen.getByPlaceholderText('Adicione sua nova tarefa...')
    await user.type(input, 'Task')
    await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }))
    expect(input).toHaveValue('')
  })

  it('should show error when submitting empty text', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAdd={mockOnAdd} />)
    await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }))
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        text: expect.stringContaining('Por favor'),
      })
    )
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should not call onAdd for whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAdd={mockOnAdd} />)
    const input = screen.getByPlaceholderText('Adicione sua nova tarefa...')
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }))
    expect(mockOnAdd).not.toHaveBeenCalled()
  })
})
