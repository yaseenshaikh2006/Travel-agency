import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell, 
  Heart, 
  Star,
  Plane,
  Hotel,
  TrainFront,
  Bus,
  Edit3,
  Save,
  X
} from 'lucide-react'

// Mock booking data
const mockBookings = [
  {
    id: 'BK001',
    type: 'flight',
    title: 'Delhi to Mumbai',
    date: '2024-01-15',
    status: 'confirmed',
    amount: 8500,
    icon: Plane
  },
  {
    id: 'BK002', 
    type: 'hotel',
    title: 'Taj Palace Hotel, Mumbai',
    date: '2024-01-15',
    status: 'confirmed',
    amount: 12000,
    icon: Hotel
  },
  {
    id: 'BK003',
    type: 'train',
    title: 'Rajdhani Express',
    date: '2024-02-20',
    status: 'pending',
    amount: 2500,
    icon: TrainFront
  }
]

const mockPreferences = {
  currency: 'INR',
  language: 'English',
  notifications: {
    email: true,
    sms: false,
    push: true
  },
  travelPreferences: {
    seatPreference: 'Window',
    mealPreference: 'Vegetarian',
    frequentDestinations: ['Mumbai', 'Delhi', 'Bangalore']
  }
}

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [preferences, setPreferences] = useState(mockPreferences)
  const [bookings] = useState(mockBookings)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  const handleSavePreferences = () => {
    // In a real app, this would save to backend
    setIsEditing(false)
    console.log('Preferences saved:', preferences)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <div className="container-safe py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-700">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.email}</h1>
              <p className="text-gray-600">Member since January 2024</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">Total Bookings: {bookings.length}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">₹{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString('en-IN')} spent</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700">{bookings.length}</div>
                      <div className="text-sm text-gray-600">Total Bookings</div>
                    </div>
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-700">₹{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString('en-IN')}</div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">{bookings.filter(b => b.status === 'confirmed').length}</div>
                      <div className="text-sm text-gray-600">Confirmed</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">{bookings.filter(b => b.status === 'pending').length}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <booking.icon className="text-primary-600" size={20} />
                        <div className="flex-grow">
                          <div className="font-medium">{booking.title}</div>
                          <div className="text-sm text-gray-600">{booking.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{booking.amount.toLocaleString('en-IN')}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <booking.icon className="text-primary-600" size={24} />
                          <div>
                            <h3 className="font-semibold">{booking.title}</h3>
                            <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                            <p className="text-sm text-gray-600">Date: {booking.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{booking.amount.toLocaleString('en-IN')}</div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded hover:bg-primary-100">
                          View Details
                        </button>
                        <button className="text-sm bg-gray-50 text-gray-700 px-3 py-1 rounded hover:bg-gray-100">
                          Download Ticket
                        </button>
                        {booking.status === 'confirmed' && (
                          <button className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100">
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Travel Preferences</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                          disabled={!isEditing}
                          className="form-select w-full"
                        >
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                          disabled={!isEditing}
                          className="form-select w-full"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Tamil">Tamil</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Travel Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seat Preference</label>
                        <select
                          value={preferences.travelPreferences.seatPreference}
                          onChange={(e) => setPreferences({
                            ...preferences, 
                            travelPreferences: {...preferences.travelPreferences, seatPreference: e.target.value}
                          })}
                          disabled={!isEditing}
                          className="form-select w-full"
                        >
                          <option value="Window">Window</option>
                          <option value="Aisle">Aisle</option>
                          <option value="Middle">Middle</option>
                          <option value="No Preference">No Preference</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meal Preference</label>
                        <select
                          value={preferences.travelPreferences.mealPreference}
                          onChange={(e) => setPreferences({
                            ...preferences, 
                            travelPreferences: {...preferences.travelPreferences, mealPreference: e.target.value}
                          })}
                          disabled={!isEditing}
                          className="form-select w-full"
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Vegan">Vegan</option>
                          <option value="No Preference">No Preference</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Frequent Destinations</h3>
                    <div className="flex flex-wrap gap-2">
                      {preferences.travelPreferences.frequentDestinations.map((dest, index) => (
                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                          <MapPin size={14} />
                          {dest}
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newDests = preferences.travelPreferences.frequentDestinations.filter((_, i) => i !== index)
                                setPreferences({
                                  ...preferences,
                                  travelPreferences: {...preferences.travelPreferences, frequentDestinations: newDests}
                                })
                              }}
                              className="ml-1 hover:text-red-600"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="inline-flex items-center gap-1 px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-gray-400">
                          <MapPin size={14} />
                          Add Destination
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={handleSavePreferences}
                        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.email}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, email: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive urgent updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.sms}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, sms: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.push}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, push: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

