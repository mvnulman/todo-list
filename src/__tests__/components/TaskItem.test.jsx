import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../../components/TaskItem'

describe('TaskItem', () => {
  const mockTask = { id: 1, text: 'Test task', isCompleted: false }

  const renderTaskItem = (props = {}) => {
    const defaultProps = {
      task: mockTask,
      onComplete: vi.fn(),
      onDelete: vi.fn(),
      onUpdate: vi.fn(),
      ...props,
    }
    return render(<TaskItem {...defaultProps} />)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render task text', () => {
    renderTaskItem()
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('should call onComplete when check button is clicked', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    renderTaskItem({ onComplete })
    await user.click(screen.getByTitle('Concluir'))
    expect(onComplete).toHaveBeenCalledWith(1)
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    renderTaskItem({ onDelete })
    await user.click(screen.getByTitle('Excluir'))
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('should call onEdit when edit button is clicked and enter editing mode', async () => {
    const user = userEvent.setup()
    renderTaskItem()
    await user.click(screen.getByTitle('Editar'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call onUpdate when editing is confirmed with Enter', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    renderTaskItem({ onUpdate })
    await user.click(screen.getByTitle('Editar'))
    const editInput = screen.getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, 'Updated task')
    await user.keyboard('{Enter}')
    expect(onUpdate).toHaveBeenCalledWith(1, 'Updated task')
  })

  it('should cancel editing on Escape', async () => {
    const user = userEvent.setup()
    renderTaskItem()
    await user.click(screen.getByTitle('Editar'))
    const editInput = screen.getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, 'Will be cancelled')
    await user.keyboard('{Escape}')
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('should not show action buttons when editing', async () => {
    const user = userEvent.setup()
    renderTaskItem()
    await user.click(screen.getByTitle('Editar'))
    expect(screen.queryByTitle('Concluir')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Excluir')).not.toBeInTheDocument()
  })
})
