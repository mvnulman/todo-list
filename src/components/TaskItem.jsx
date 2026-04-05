import { useState, useCallback } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { MdCheckCircleOutline } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'

export default function TaskItem({ task, onComplete, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleEdit = useCallback(() => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdate(task.id, editText)
    }
    setEditing(false)
  }, [editText, task, onUpdate])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleEdit()
    if (e.key === 'Escape') { setEditText(task.text); setEditing(false) }
  }, [handleEdit, task.text])

  return (
    <div className={`task-item task-list ${editing ? 'editing' : ''}`}>
      {editing ? (
        <input
          className="task-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={200}
        />
      ) : (
        <span className="task-text" onDoubleClick={() => { setEditing(true); setEditText(task.text) }}>
          {task.text}
        </span>
      )}
      <div className="task-actions">
        {!editing && (
          <>
            <button
              className="btn-icon btn-check"
              title="Concluir"
              aria-label="Concluir tarefa"
              onClick={() => onComplete(task.id)}
            >
              <MdCheckCircleOutline />
            </button>
            <button
              className="btn-icon btn-edit"
              title="Editar"
              aria-label="Editar tarefa"
              onClick={() => { setEditing(true); setEditText(task.text) }}
            >
              <FiEdit3 />
            </button>
            <button
              className="btn-icon btn-delete"
              title="Excluir"
              aria-label="Excluir tarefa"
              onClick={() => onDelete(task.id)}
            >
              <BsTrash3 />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
