import { useState, useCallback, useMemo } from 'react'
import { useTasks } from './hooks/useTasks'
import { useDarkMode } from './hooks/useDarkMode'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import Filters from './components/Filters'
import CompletedSection from './components/CompletedSection'
import './App.css'

export default function App() {
  const { tasks, addTask, completeTask, deleteTask, updateTask, uncompleteTask, clearActive, clearCompleted } = useTasks()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const handleRestore = useCallback((id) => {
    uncompleteTask(id)
  }, [uncompleteTask])

  const filteredActive = useMemo(() => {
    let list = tasks.active
    if (search) {
      list = list.filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    }
    return list
  }, [tasks.active, search])

  const filteredCompleted = useMemo(() => {
    let list = tasks.completed
    if (search) {
      list = list.filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    }
    return list
  }, [tasks.completed, search])

  const showMain = filter === 'all' || filter === 'active'
  const showCompleted = filter === 'all' || filter === 'completed'

  return (
    <div className="App">
      <Header dark={dark} onToggleDark={toggleDark} />
      <TaskForm onAdd={addTask} />
      <Filters filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch} />

      {showMain && (
        <section className="task-section">
          {!filteredActive.length ? (
            <p className="empty-message">
              {search
                ? 'Nenhuma tarefa encontrada na busca.'
                : 'A lista está vazia! Vamos adicionar algumas tarefas :)'
              }
            </p>
          ) : (
            filteredActive.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
          {tasks.active.length > 0 && filter !== 'completed' && (
            <button className="clear-button" onClick={clearActive}>
              Limpar ativas
            </button>
          )}
        </section>
      )}

      {showCompleted && (
        <CompletedSection
          tasks={filteredCompleted}
          onDelete={deleteTask}
          onClear={clearCompleted}
          onRestore={handleRestore}
        />
      )}
    </div>
  )
}
