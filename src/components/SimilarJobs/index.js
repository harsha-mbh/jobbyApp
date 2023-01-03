import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobs = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <Link to={`jobs/${id}`}>
      <li className="similar-job-card">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <p className="rating">{rating}</p>
          </div>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="location-type-container">
          <p className="location">{location}</p>
          <p className="employment-type">{employmentType}</p>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobs
