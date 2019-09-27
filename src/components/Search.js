import React, { Component, Fragment } from 'react'
// import axios from 'axios'
import jsonp from 'jsonp'


class Search extends Component{
  constructor(){
    super()
    this.state = {
      companies: [],
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    this.search()
  }
  componentDidUpdate(prevProps, prevState){
    // search if the searchstring was changed
    if (prevState.searchString !== this.state.searchString && this.state.searchString.length > 3) {
      console.log('prevState', prevState)
      this.search()
    }
  }
  handleChange({target}){
    console.log(target.name, target.value)
    this.setState({ searchString: target.value})
  }
  search(){
    if (!this.state.searchString) return 
    this.callback()
    jsonp(`https://www.abr.business.gov.au/json/MatchingNames.aspx?name=${this.state.searchString}&maxResults=5&guid=b6242120-5bce-4b10-9839-d3045a7682da`, null, this.callback)
  }
  
  callback(err, data){
    if (err) {
      console.error(err.message)
    } else {
      this.setState({ companies: data.Names})
    }
  }
  render(){
    const { companies } = this.state
    console.log(companies)
    if(!companies) return null
    return (
      <Fragment>
        <h1>Business Search</h1>
        <form>
          <div className="has-icon-right">
            <input type="text" 
              className="form-input" 
              onChange={this.handleChange}
              value={this.state.searchString}
              placeholder="Search for a company name or ABN" />
            <i className="form-icon"></i>
          </div>
        </form>
        <section>
          {this.state.searchString.length > 3 &&            
            companies.map(company => (
              <div className="card" key={company.Abn}>
                <div className="card-header">
                  <span className="card-title"><span className="h5">{company.Name}</span> ({company.NameType})</span>
                  <span className="card-subtitle text-gray"> {company.Postcode}, {company.State}</span>
                </div>
                <div className="card-body">
                  {company.IsCurrent ? 'Active' : 'Inactive'}
                </div>
              </div>
            ))
          }
        </section>
      </Fragment>

    )
  }
} 

//hello all are you well


export default Search
