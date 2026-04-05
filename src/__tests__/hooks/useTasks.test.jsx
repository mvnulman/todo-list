import { renderHook, act } from '@testing-library/react'
import { useTasks } from '../../hooks/useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty tasks', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks.active).toEqual([])
    expect(result.current.tasks.completed).toEqual([])
  })

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Test task')
    })
    expect(result.current.tasks.active).toHaveLength(1)
    expect(result.current.tasks.active[0].text).toBe('Test task')
    expect(result.current.tasks.active[0].isCompleted).toBe(false)
  })

  it('should trim text when adding a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('  spaced  ')
    })
    expect(result.current.tasks.active[0].text).toBe('spaced')
  })

  it('should complete a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Task to complete')
    })
    const taskId = result.current.tasks.active[0].id

    act(() => {
      result.current.completeTask(taskId)
    })
    expect(result.current.tasks.active).toHaveLength(0)
    expect(result.current.tasks.completed).toHaveLength(1)
    expect(result.current.tasks.completed[0].isCompleted).toBe(true)
  })

  it('should delete a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Task to delete')
    })
    const taskId = result.current.tasks.active[0].id
    act(() => {
      result.current.deleteTask(taskId)
    })
    expect(result.current.tasks.active).toHaveLength(0)
    expect(result.current.tasks.completed).toHaveLength(0)
  })

  it('should update a task text', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Old text')
    })
    const taskId = result.current.tasks.active[0].id
    act(() => {
      result.current.updateTask(taskId, 'New text')
    })
    expect(result.current.tasks.active[0].text).toBe('New text')
  })

  it('should uncomplete (restore) a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Task')
    })

    act(() => {
      result.current.completeTask(result.current.tasks.active[0].id)
    })
    const taskId = result.current.tasks.completed[0].id
    act(() => {
      result.current.uncompleteTask(taskId)
    })
    expect(result.current.tasks.completed).toHaveLength(0)
    expect(result.current.tasks.active).toHaveLength(1)
    expect(result.current.tasks.active[0].isCompleted).toBe(false)
  })

  it('should clear all active tasks', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Active 1')
      result.current.addTask('Active 2')
    })
    act(() => {
      result.current.clearActive()
    })
    expect(result.current.tasks.active).toHaveLength(0)
  })

  it('should clear all completed tasks', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Task')
    })
    act(() => {
      result.current.completeTask(result.current.tasks.active[0].id)
    })
    act(() => {
      result.current.clearCompleted()
    })
    expect(result.current.tasks.completed).toHaveLength(0)
  })

  it('should persist tasks to localStorage', () => {
    const { result, rerender } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Persisted')
    })
    rerender()
    expect(result.current.tasks.active).toHaveLength(1)
    expect(result.current.tasks.active[0].text).toBe('Persisted')
  })
})
