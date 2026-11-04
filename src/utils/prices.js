// Demo data only. All prices are dummy values for project demonstration.

export const PHONE_BRANDS = ['Apple', 'Samsung', 'Vivo', 'Oppo']

export const REPAIR_PROBLEMS = [
  { id: 'screen', name: 'Broken Screen', price: 1500, icon: '🖥️' },
  { id: 'battery', name: 'Battery Problem', price: 800, icon: '🔋' },
  { id: 'charging', name: 'Charging Problem', price: 500, icon: '🔌' },
  { id: 'audio', name: 'Speaker/Microphone Problem', price: 400, icon: '🎙️' },
  { id: 'water', name: 'Water Damage', price: 1000, icon: '💧' },
  { id: 'software', name: 'Software Problem', price: 300, icon: '⚙️' },
]

export function getProblemById(id) {
  return REPAIR_PROBLEMS.find((problem) => problem.id === id) || null
}

export function formatPrice(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}
