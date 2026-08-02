import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected', 'Closed']

function CreateApplicationPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Saved',
    location: '',
    dateApplied: '',
    jobLink: '',
    notes: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
      const response = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not create application')
      }

      navigate(`/applications/${data.id}`)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Application</h1>

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
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
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
        {submitting ? 'Adding...' : 'Add Application'}
      </button>
    </form>
  )
}

export default CreateApplicationPage
