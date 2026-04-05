import { useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { MdCheckCircleOutline } from 'react-icons/md'

export default function CompletedSection({ tasks, onDelete, onClear, onRestore }) {
  const [expanded, setExpanded] = useState(false)

  if (!tasks.length) return null

  return (
    <div className="completed-section">
      <button className="toggle-completed" onClick={() => setExpanded(!expanded)}>
        Tarefas concluídas ({tasks.length})
        <span className={`arrow ${expanded ? 'open' : ''}`}>&#9660;</span>
      </button>
      {expanded && (
        <div className="completed-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item task-list task-done">
              <span className="task-text">{task.text}</span>
              <div className="task-actions">
                <button
                  className="btn-icon btn-restore"
                  title="Restaurar"
                  aria-label="Restaurar tarefa"
                  onClick={() => onRestore(task.id)}
                >
                  <MdCheckCircleOutline />
                </button>
                <button
                  className="btn-icon btn-delete"
                  title="Excluir"
                  aria-label="Excluir tarefa"
                  onClick={() => onDelete(task.id)}
                >
                  <BsTrash3 />
                </button>
              </div>
            </div>
          ))}
          <button className="clear-button clear-completed" onClick={onClear}>
            Limpar todas as concluídas
          </button>
        </div>
      )}
    </div>
  )
}
