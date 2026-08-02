import { Link } from 'react-router-dom'

function ApplicationCard({ application }) {
  return (
    <Link to={`/applications/${application.id}`} className="application-card">
      <h3>{application.company}</h3>
      <p>{application.position}</p>
      <p className="status">{application.status}</p>
      <p>{application.location || '—'}</p>
      <p>{application.dateApplied || '—'}</p>
    </Link>
  )
}

export default ApplicationCard
