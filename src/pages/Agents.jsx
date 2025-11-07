import { useMemo, useState } from 'react'
import { fetchAgents } from '../api/valorant'
import useLocalCache from '../util/useLocalCache'
import AgentCard from '../components/AgentCard'
import SearchBar from '../components/SearchBar'
import RoleFilter from '../components/RoleFilter'

export default function Agents() {
  const { data: agents, loading, error } = useLocalCache('agents', fetchAgents)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All')

  const filtered = useMemo(() => {
    if (!agents) return []
    return agents.filter(a => {
      const matchesQuery = a.displayName.toLowerCase().includes(query.toLowerCase())
      const matchesRole = role === 'All' || (a.role?.displayName === role)
      return matchesQuery && matchesRole
    })
  }, [agents, query, role])

  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="skel skel-card" key={i}></div>
        ))}
      </div>
    )
  }

  if (error) return <p>Failed to load agents. Try refreshing.</p>

  return (
    <section>
      <h2 className="section-title">All Agents</h2>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <RoleFilter value={role} onChange={setRole} />
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No agents found.</p>
      ) : (
        <div className="grid">
          {filtered.map(agent => (
            <AgentCard key={agent.uuid} agent={agent} />
          ))}
        </div>
      )}
    </section>
  )
}
