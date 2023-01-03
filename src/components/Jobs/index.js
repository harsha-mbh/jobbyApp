import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypeQuery: '',
    minimumpackageQuery: '',
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileData()
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.loading})
    const {searchInput, employmentTypeQuery, minimumpackageQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumpackageQuery}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = data.jobs
    const updatedData = fetchedData.map(eachJob => ({
      id: eachJob.id,
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({
      jobsList: updatedData,
      jobsApiStatus: apiStatusConstants.success,
    })
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileApiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobDetails = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickRetryProfile = () => this.getProfileData()

  renderProfileFailureView = () => (
    <div>
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onClickRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFiltersGroup = () => (
    <FiltersGroup
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
    />
  )

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  render() {
    const {searchInput} = this.state
    console.log(this.props)
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="sidebar-container">
            {this.renderProfileDetails()}
            <hr className="separator-sidebar" />
            {this.renderFiltersGroup()}
          </div>
          <div className="jobs-container">
            <div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button type="button">
                <BsSearch
                  className="search-icon"
                  testid="searchButton"
                  onClick={this.onClickSearchBtn}
                />
              </button>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
