export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      placeholder="Search agent..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search agents"
    />
  )
}
