import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
      <p className="home-page-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your ability and potential.
      </p>
      <div>
        <button type="button" className="home-btn">
          Find Jobs
        </button>
      </div>
    </div>
  </>
)

export default Home
