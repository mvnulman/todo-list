import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from '../../hooks/useDarkMode'

describe('useDarkMode', () => {
  function setup() {
    const { result, rerender } = renderHook(() => useDarkMode())
    return { result, rerender }
  }

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('should initialize with dark as false', () => {
    const { result } = setup()
    expect(result.current.dark).toBe(false)
  })

  it('should toggle dark mode', () => {
    const { result } = setup()
    expect(result.current.dark).toBe(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.dark).toBe(true)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.dark).toBe(false)
  })

  it('should add/remove dark class on document', () => {
    const { result } = setup()
    act(() => {
      result.current.toggle()
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.toggle()
    })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should persist dark mode to localStorage', () => {
    const { result, rerender } = setup()
    act(() => {
      result.current.toggle()
    })
    rerender()
    expect(localStorage.getItem('todo-dark-mode')).toBe('true')
  })

  it('should read initial value from localStorage', () => {
    localStorage.setItem('todo-dark-mode', 'true')
    const { result } = setup()
    expect(result.current.dark).toBe(true)
  })
})
