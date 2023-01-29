import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    jobDescription,
    companyLogoUrl,
    employmentType,
    location,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-card">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <p className="rating">{rating}</p>
          </div>
        </div>
        <div className="location-package-container">
          <p className="location">{location}</p>
          <p className="employment-type">{employmentType}</p>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
