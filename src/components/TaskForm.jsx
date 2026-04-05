import { useState, useCallback } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      MySwal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Por favor, adicione uma tarefa primeiro!',
      })
      return
    }
    onAdd(trimmed)
    setText('')
  }, [text, onAdd])

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione sua nova tarefa..."
        maxLength={200}
      />
      <button className="button-add" type="submit" aria-label="Adicionar tarefa">+</button>
    </form>
  )
}
