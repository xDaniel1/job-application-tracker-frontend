import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected', 'Closed']

function EditApplicationPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
        setFormData({
          company: data.company,
          position: data.position,
          status: data.status,
          location: data.location || '',
          dateApplied: data.dateApplied || '',
          jobLink: data.jobLink || '',
          notes: data.notes || '',
        })
        setStatus('success')
      } catch (err) {
        setError(err.message)
        setStatus('error')
      }
    }

    fetchApplication()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await fetch(`${apiUrl}/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not update application')
      }

      navigate(`/applications/${id}`)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <p>Loading application...</p>
  }

  if (status === 'error') {
    return <p>{error}</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Application</h1>

      <label>
        Company
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Position
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange} required>
          {STATUSES.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </label>

      <label>
        Location
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>

      <label>
        Date Applied
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Link
        <input type="url" name="jobLink" value={formData.jobLink} onChange={handleChange} />
      </label>

      <label>
        Notes
        <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}

export default EditApplicationPage
