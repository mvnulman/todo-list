import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Filters from '../../components/Filters'

describe('Filters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function renderFilters(props = {}) {
    const defaultProps = {
      filter: 'all',
      onFilterChange: vi.fn(),
      search: '',
      onSearchChange: vi.fn(),
      ...props,
    }
    return { ...render(<Filters {...defaultProps} />), ...defaultProps }
  }

  it('should render search input and three filter buttons', () => {
    renderFilters()
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ativas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /conclu/i })).toBeInTheDocument()
  })

  it('should highlight active filter', () => {
    renderFilters({ filter: 'active' })
    expect(screen.getByRole('button', { name: /ativas/i })).toHaveClass('active')
    expect(screen.getByRole('button', { name: /todas/i })).not.toHaveClass('active')
  })

  it('should call onFilterChange when filter button is clicked', async () => {
    const user = userEvent.setup()
    const { onFilterChange } = renderFilters()
    await user.click(screen.getByRole('button', { name: /ativas/i }))
    expect(onFilterChange).toHaveBeenCalledWith('active')
  })

  it('should call onSearchChange when search input changes', async () => {
    const user = userEvent.setup()
    const { onSearchChange } = renderFilters()
    const searchInput = screen.getByPlaceholderText('Buscar tarefas...')
    await user.type(searchInput, 'test')
    expect(onSearchChange).toHaveBeenCalled()
  })

  it('should show current search value', () => {
    renderFilters({ search: 'hello' })
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toHaveValue('hello')
  })
})
