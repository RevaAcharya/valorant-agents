const BASE = 'https://valorant-api.com/v1'

export async function fetchAgents() {
  const res = await fetch(`${BASE}/agents?isPlayableCharacter=true`)
  if (!res.ok) throw new Error('Failed to fetch agents')
  const json = await res.json()
  return json.data
}

export async function fetchAgentById(id) {
  const res = await fetch(`${BASE}/agents/${id}`)
  if (!res.ok) throw new Error('Failed to fetch agent')
  const json = await res.json()
  return json.data
}
