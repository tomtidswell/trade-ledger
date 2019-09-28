import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import axios from 'axios'
import jsonp from 'jsonp'


class Search extends Component{
  constructor(){
    super()
    this.state = {
      companies: [],
      errorMessage: '',
      searchString: ''
    }
    //use a regex to validate the search input - name or ABN search
    this.abnRegex = new RegExp(/[0-9 ]{11}/)
    this.searchChange = this.searchChange.bind(this)
  }
  searchChange(e){
    // function to handle the typing in the search input
    e.preventDefault()
    this.setState({ searchString: e.target.value}, ()=>this.search())
  }
  submit(e){
    // function to prevent default submission of the form
    e.preventDefault()
  }
  search(){
    // function to run either the Name, or ABN search

    //dont search if we dont have a search string
    if (!this.state.searchString) return 
    //dont search of we have a very short search string (removes pointless results)
    if (this.state.searchString.length < 3) return 

    // work out which type of search to run... name or abn, using the regex
    if (this.abnRegex.test(this.state.searchString))
      jsonp(`https://abr.business.gov.au/json/AbnDetails.aspx?abn=${this.state.searchString}&guid=b6242120-5bce-4b10-9839-d3045a7682da`, null, (err, data) => {
        // handle some of the empty returns
        if (!data) return this.setState({ companies: [], errorMessage: 'No company found for that ABN' })
        if (data.Message) return this.setState({ companies: [], errorMessage: data.Message })
        // handle a good response - convert it to the same format as a name response
        if (data.Abn) return this.setState({ companies: [{
          Abn: data.Abn,
          IsCurrent: data.AbnStatus,
          Name: data.BusinessName[0],
          NameType: data.EntityTypeName,
          Postcode: data.AddressPostcode,
          State: data.AddressState
        }], errorMessage: '' })
      })
    else
      //improve this request later to handle any errors, but I couldnt find a request which caused an error
      jsonp(`https://www.abr.business.gov.au/json/MatchingNames.aspx?name=${this.state.searchString}&maxResults=5&guid=b6242120-5bce-4b10-9839-d3045a7682da`, null, (err, data) => {
        //handle the null returns, and the API error messaging
        if (!data) return this.setState({ companies: [], errorMessage: 'No company found with that name' })
        if (data.Names.length === 0) return this.setState({ companies: [], errorMessage: 'No company found with that name' })
        if (data.Message) return this.setState({ companies: [], errorMessage: data.Message })
        // handle a positive response
        if (data) return this.setState({ companies: data.Names, errorMessage: '' })
      })
  }
  
  
  render(){
    const { companies, searchString, errorMessage } = this.state
    // console.log(companies)
    // console.log('error:', errorMessage)
    
    if(!companies) return null
    return (
      <form onSubmit={this.submit} className="panel search-panel">
        <div className="panel-header text-center">
          <figure className="avatar" data-initial="TL"></figure>
          <div className="panel-title h5">Business Search</div>
          <div className="panel-subtitle">Search for a company name or ABN</div>
          <input type="text"
            className="form-input"
            onChange={this.searchChange}
            value={searchString}
            placeholder="Search" />
        </div>
        <div className="panel-body">
          {errorMessage &&
            <div className="card">
              <div className="card-header">
                <span className="card-subtitle text-gray">{errorMessage}</span>
              </div>
            </div>
          }
          {!errorMessage && searchString.length > 3 &&            
            companies.map((company, index) => (
              <Link className="card card-result" key={index} to={`/company/${company.Abn}`}>
                <div className="card-header">
                  <span className="card-title">
                    <span className="h5">
                      {company.Name}</span> ({company.NameType})
                  </span>
                  <span className="card-subtitle text-gray"> {company.Postcode}, {company.State}</span>
                </div>
                <div className="card-body">
                  {company.IsCurrent ? 'Active' : 'Inactive'}
                </div>
              </Link>
            ))
          }
        </div>
      </form>
    )
  }
} 

export default Search
