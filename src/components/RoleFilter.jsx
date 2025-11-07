const ROLES = ['All', 'Duelist', 'Sentinel', 'Initiator', 'Controller']

export default function RoleFilter({ value, onChange }) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by role"
    >
      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  )
}
