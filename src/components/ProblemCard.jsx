import { formatPrice } from '../utils/prices.js'

export default function ProblemCard({ problem, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`problem-card ${selected ? 'selected' : ''}`}
      aria-pressed={selected}
      onClick={() => onSelect(problem.id)}
    >
      <span className="problem-icon" aria-hidden="true">{problem.icon}</span>
      <span className="problem-name">{problem.name}</span>
      <span className="problem-price">{formatPrice(problem.price)}</span>
    </button>
  )
}
