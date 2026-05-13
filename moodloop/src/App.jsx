import { useState } from 'react'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeePortal from './components/EmployeePortal'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <EmployeeLogin onLogin={(data) => setUser(data)} />
  }

  return <EmployeePortal user={user} onLogout={() => setUser(null)} />
}