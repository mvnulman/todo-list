import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'todo-list-data'

function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = useCallback((text) => {
    setTasks(prev => [...prev, { id: Date.now(), text: text.trim(), isCompleted: false }])
  }, [])

  const completeTask = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isCompleted: true } : task
    ))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [])

  const updateTask = useCallback((id, text) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, text: text.trim() } : task
    ))
  }, [])

  const uncompleteTask = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isCompleted: false } : task
    ))
  }, [])

  const clearActive = useCallback(() => {
    setTasks(prev => prev.filter(task => task.isCompleted))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.isCompleted))
  }, [])

  const activeTasks = tasks.filter(task => !task.isCompleted)
  const completedTasks = tasks.filter(task => task.isCompleted)

  return {
    tasks: { active: activeTasks, completed: completedTasks },
    addTask, completeTask, deleteTask, updateTask,
    uncompleteTask, clearActive, clearCompleted,
  }
}
