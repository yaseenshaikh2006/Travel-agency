// Minimal client for FLI-backed flight search. Expects an HTTP endpoint that returns flights.
// Configure base URL via VITE_FLI_URL (e.g., http://127.0.0.1:8000/mcp/search_flights or your proxy)

const FLI_URL = import.meta.env.VITE_FLI_URL || 'http://127.0.0.1:8000/mcp/search_flights'

export async function fliSearchFlights(params, { timeoutMs = 5000 } = {}) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const res = await fetch(FLI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'search_flights',
        params: {
          departure_airport: params.from || 'DEL',
          arrival_airport: params.to || 'BOM', 
          departure_date: params.date || new Date().toISOString().slice(0,10),
          passenger_info: { adults: 1 },
          seat_type: 'ECONOMY',
          stops: params.nonstop ? 'NON_STOP' : 'ONE_STOP',
          sort_by: params.sort === 'price-asc' ? 'CHEAPEST' : 'DURATION'
        }
      }),
      signal: controller.signal,
      mode: 'cors',
      credentials: 'same-origin'
    }).finally(() => clearTimeout(t))
    
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`FLI request failed: ${res.status} ${text}`)
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.warn('FLI API error:', error)
    throw error
  }
}

export function isFliEnabled() {
  return Boolean(FLI_URL)
}


