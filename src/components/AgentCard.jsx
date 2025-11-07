import { useNavigate } from 'react-router-dom'

export default function AgentCard({ agent }) {
  const navigate = useNavigate()
  const role = agent.role?.displayName ?? 'Unknown'

  return (
    <div
      className="card"
      onClick={() => navigate(`/agents/${agent.uuid}`)}
      style={{ cursor: 'pointer' }}
    >
      <img src={agent.displayIcon} alt={agent.displayName} loading="lazy" />
      <div className="card-body">
        <div className="card-title">{agent.displayName}</div>
        <p className="card-sub">{role}</p>
      </div>
    </div>
  )
}
