import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompletedSection from '../../components/CompletedSection'

describe('CompletedSection', () => {
  const completedTasks = [
    { id: 1, text: 'Done task 1', isCompleted: true },
    { id: 2, text: 'Done task 2', isCompleted: true },
  ]

  const defaultProps = {
    tasks: completedTasks,
    onDelete: vi.fn(),
    onClear: vi.fn(),
    onRestore: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when no tasks', () => {
    const { container } = render(
      <CompletedSection tasks={[]} onDelete={vi.fn()} onClear={vi.fn()} onRestore={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render toggle button with task count', () => {
    render(<CompletedSection {...defaultProps} />)
    expect(screen.getByRole('button', { name: /conclu/i })).toBeInTheDocument()
  })

  it('should hide task list when collapsed', () => {
    render(<CompletedSection {...defaultProps} />)
    expect(screen.queryByText('Done task 1')).not.toBeInTheDocument()
  })

  it('should show task list when expanded', async () => {
    const user = userEvent.setup()
    render(<CompletedSection {...defaultProps} />)
    await user.click(screen.getByRole('button', { name: /conclu/i }))
    expect(screen.getByText('Done task 1')).toBeInTheDocument()
    expect(screen.getByText('Done task 2')).toBeInTheDocument()
  })

  it('should call onRestore when restore button is clicked', async () => {
    const user = userEvent.setup()
    const onRestore = vi.fn()
    render(<CompletedSection {...defaultProps} onRestore={onRestore} />)
    await user.click(screen.getByRole('button', { name: /conclu/i }))
    await user.click(screen.getAllByTitle('Restaurar')[0])
    expect(onRestore).toHaveBeenCalledWith(1)
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<CompletedSection {...defaultProps} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: /conclu/i }))
    await user.click(screen.getAllByTitle('Excluir')[0])
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('should call onClear when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<CompletedSection {...defaultProps} onClear={onClear} />)
    await user.click(screen.getByRole('button', { name: /conclu/i }))
    await user.click(screen.getByRole('button', { name: /limpar todas/i }))
    expect(onClear).toHaveBeenCalled()
  })
})
