import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <div className="filter-group-container">
      <div className="employment-type-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(employmentType => (
            <li key={employmentType.employmentTypeId}>
              <input type="checkbox" id={employmentType.employmentTypeId} />
              <label
                htmlFor={employmentType.employmentTypeId}
                className="employment-type"
              >
                {employmentType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="salary-range-container">
        <h1 className="filter-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(salaryRange => (
            <li key={salaryRange.salaryRangeId}>
              <input
                type="radio"
                id={salaryRange.salaryRangeId}
                name="salary"
              />
              <label
                htmlFor={salaryRange.salaryRangeId}
                className="employment-type"
              >
                {salaryRange.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
