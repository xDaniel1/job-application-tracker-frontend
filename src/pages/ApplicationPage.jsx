import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function ApplicationPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchApplication = async () => {
      setStatus('loading')

      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/applications/${id}`)

        if (!response.ok) {
          throw new Error('Application not found')
        }

        const data = await response.json()
        setApplication(data)
        setStatus('success')
      } catch (err) {
        setError(err.message)
        setStatus('error')
      }
    }

    fetchApplication()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this application?')
    if (!confirmed) return

    const apiUrl = import.meta.env.VITE_API_URL
    await fetch(`${apiUrl}/api/applications/${id}`, { method: 'DELETE' })
    // a 204 response has no body — calling response.json() on it would throw
    navigate('/')
  }

  if (status === 'loading') {
    return <p>Loading application...</p>
  }

  if (status === 'error') {
    return <p>{error}</p>
  }

  return (
    <div className="application-detail">
      <h2>{application.company}</h2>
      <p className="status">{application.status}</p>

      <dl>
        <dt>Position</dt>
        <dd>{application.position}</dd>

        <dt>Location</dt>
        <dd>{application.location || '—'}</dd>

        <dt>Date Applied</dt>
        <dd>{application.dateApplied || '—'}</dd>

        <dt>Job Link</dt>
        <dd>
          {application.jobLink ? (
            <a href={application.jobLink} target="_blank" rel="noreferrer">
              {application.jobLink}
            </a>
          ) : (
            '—'
          )}
        </dd>

        <dt>Notes</dt>
        <dd>{application.notes || '—'}</dd>
      </dl>

      <div className="actions">
        <Link to={`/applications/${id}/edit`}>Edit</Link>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ApplicationPage
