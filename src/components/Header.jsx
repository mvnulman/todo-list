import { FiSun, FiMoon } from 'react-icons/fi'

export default function Header({ dark, onToggleDark }) {
  return (
    <header className="app-header">
      <h1>Lista de Tarefas</h1>
      <button
        className="theme-toggle"
        onClick={onToggleDark}
        aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        title={dark ? 'Modo claro' : 'Modo escuro'}
      >
        {dark ? <FiSun /> : <FiMoon />}
      </button>
    </header>
  )
}
