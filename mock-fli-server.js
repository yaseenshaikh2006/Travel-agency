// Mock FLI server for testing - simulates Google Flights API
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Real-time flight data generator with dynamic pricing
function generateRealTimeFlights(params) {
  const airlines = [
    { name: 'Indigo', code: '6E', basePrice: 2500 },
    { name: 'Air India', code: 'AI', basePrice: 3200 },
    { name: 'Vistara', code: 'UK', basePrice: 3800 },
    { name: 'SpiceJet', code: 'SG', basePrice: 2200 },
    { name: 'GoAir', code: 'G8', basePrice: 2100 },
    { name: 'AirAsia', code: 'I5', basePrice: 1900 }
  ]
  
  const flights = []
  const now = new Date()
  const searchDate = new Date(params.departure_date || now.toISOString().slice(0,10))
  
  // Generate 6-8 flights with realistic timing
  for (let i = 0; i < 7; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)]
    
    // Dynamic pricing based on demand, time, and airline
    const demandMultiplier = 1 + (Math.random() * 0.8) // 1.0 to 1.8x
    const timeMultiplier = i < 2 ? 1.2 : i > 4 ? 0.9 : 1.0 // Early/late flights cost more/less
    const price = Math.round(airline.basePrice * demandMultiplier * timeMultiplier)
    
    // Realistic flight durations
    const baseDuration = 120 + Math.floor(Math.random() * 180) // 2-5 hours
    const departureHour = 6 + (i * 2) + Math.floor(Math.random() * 2) // 6 AM to 8 PM
    const departureMinute = Math.floor(Math.random() * 60)
    
    const departure = new Date(searchDate)
    departure.setHours(departureHour, departureMinute, 0, 0)
    
    const arrival = new Date(departure)
    arrival.setMinutes(arrival.getMinutes() + baseDuration)
    
    const stops = Math.random() > 0.6 ? 1 : 0 // 40% have stops
    
    flights.push({
      id: `F${1000 + i}`,
      flight_number: `${airline.code}${100 + i}`,
      departure_airport: params.departure_airport || 'DEL',
      arrival_airport: params.arrival_airport || 'BOM',
      departure_datetime: departure.toISOString(),
      arrival_datetime: arrival.toISOString(),
      duration_readable: `${Math.floor(baseDuration / 60)}h ${baseDuration % 60}m`,
      airline: airline.name,
      price: price,
      stops: stops,
      nonstop: stops === 0,
      aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A321'][Math.floor(Math.random() * 4)],
      seats_available: Math.floor(Math.random() * 20) + 5,
      booking_class: ['Economy', 'Premium Economy', 'Business'][Math.floor(Math.random() * 3)]
    })
  }
  
  // Sort by price if requested
  if (params.sort_by === 'CHEAPEST') {
    return flights.sort((a, b) => a.price - b.price)
  } else if (params.sort_by === 'DURATION') {
    return flights.sort((a, b) => a.duration_readable.localeCompare(b.duration_readable))
  }
  
  return flights.sort((a, b) => a.price - b.price)
}

app.post('/mcp/search_flights', (req, res) => {
  console.log('🚀 Real-time FLI API called with:', req.body)
  
  try {
    const params = req.body.params || req.body
    const flights = generateRealTimeFlights(params)
    
    // Simulate API delay for realism
    setTimeout(() => {
      res.json({
        content: flights,
        is_error: false,
        timestamp: new Date().toISOString(),
        search_params: params
      })
    }, 300 + Math.random() * 500) // 300-800ms delay
    
  } catch (error) {
    res.status(500).json({
      content: [],
      is_error: true,
      error: error.message
    })
  }
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`🛫 Real-time FLI server running on http://localhost:${PORT}`)
  console.log(`📡 Endpoint: http://localhost:${PORT}/mcp/search_flights`)
  console.log(`⏰ Generating live flight data with dynamic pricing...`)
  console.log(`🔄 Each search returns fresh results with realistic timing`)
})
