import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h1 className="section-title">Welcome to Valorant Agents Wiki</h1>
      <p className="muted">Explore every agent, their roles, and abilities.</p>
      <p style={{ marginTop: 20 }}>
        <Link className="badge" to="/agents">Browse Agents →</Link>
      </p>
    </section>
  )
}
