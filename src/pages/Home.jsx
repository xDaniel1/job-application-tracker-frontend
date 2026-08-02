import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApplicationCard from '../components/ApplicationCard'

function Home() {
  const [applications, setApplications] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchApplications = async () => {
      setStatus('loading')

      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/applications`)

        // fetch doesn't throw on a 404/500, so this has to be checked by hand
        if (!response.ok) {
          throw new Error('Could not load applications')
        }

        const data = await response.json()
        setApplications(data)
        setStatus('success')
      } catch (err) {
        setError(err.message)
        setStatus('error')
      }
    }

    fetchApplications()
  }, [])

  if (status === 'loading') {
    return (
      <div className="page-status">
        <p>Loading applications...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="page-status">
        <p>{error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="page-status">
        <p>No applications yet.</p>
        <Link to="/applications/new">Add your first application</Link>
      </div>
    )
  }

  return (
    <div className="application-list">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}

export default Home
