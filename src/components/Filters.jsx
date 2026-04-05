export default function Filters({ filter, onFilterChange, search, onSearchChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar tarefas..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Buscar tarefas"
      />
      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>
          Todas
        </button>
        <button className={`filter-tab ${filter === 'active' ? 'active' : ''}`} onClick={() => onFilterChange('active')}>
          Ativas
        </button>
        <button className={`filter-tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => onFilterChange('completed')}>
          Concluídas
        </button>
      </div>
    </div>
  )
}
