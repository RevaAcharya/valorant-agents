import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchAgentById } from '../api/valorant'

export default function AgentDetail() {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await fetchAgentById(id)
        if (!mounted) return
        setAgent(data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <div className="skel" style={{ height: 360, borderRadius: 14 }}></div>
  if (error || !agent) return <p>Could not load agent. <Link to="/agents">Back</Link></p>

  return (
    <section className="detail">
      <div className="detail-header">
        <img className="detail-portrait" src={agent.fullPortrait || agent.displayIcon} alt={agent.displayName} />
        <div>
          <h1 className="section-title" style={{ marginTop: 0 }}>{agent.displayName}</h1>
          <p className="badge">Role: {agent.role?.displayName ?? 'Unknown'}</p>
          <p style={{ marginTop: 10 }}>{agent.description}</p>
          <p style={{ marginTop: 14 }}>
            <Link className="badge" to="/agents">← Back to Agents</Link>
          </p>
        </div>
      </div>

      <h2 className="section-title">Abilities</h2>
      <div className="abilities">
        {agent.abilities?.filter(Boolean).map((ab, i) => (
          <div className="ability" key={i}>
            {ab.displayIcon && <img src={ab.displayIcon} alt={ab.displayName} />}
            <div>
              <strong>{ab.displayName || `Ability ${i+1}`}</strong>
              <p className="muted">{ab.description || 'No description'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
