import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileData()
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
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
    console.log(updatedData)
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
  }

  render() {
    const {jobsApiStatus, profileApiStatus} = this.state
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="sidebar-container">
            <div className="loader-container">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
          <div className="jobs-container">
            <div>
              <input
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <button type="button" testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            switch (jobsApiStatus){
                case apiStatusConstants.loading:
                    return this.renderLoadingView()
                case apiStatusConstants.success:
                    return this.renderSuccessView()
                case apiStatusConstants.failure:
                    return this.renderFailureView()
                default:
                    return null
            }
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
