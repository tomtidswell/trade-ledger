import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import jsonp from 'jsonp'

class Company extends Component{
  constructor(){
    super()
    this.state = {
      data: null,
      errorMessage: ''
    }
  }
  componentDidMount(){
    if (this.props.match.params.id) 
      jsonp(`https://abr.business.gov.au/json/AbnDetails.aspx?abn=${this.props.match.params.id}&guid=b6242120-5bce-4b10-9839-d3045a7682da`, null, (err, data) => {
        // console.log(data)
        if (!data) return this.setState({ data: [], errorMessage: 'No company found for that ABN' })
        if (data.Message) return this.setState({ data: [], errorMessage: data.Message })
        if (data.Abn) return this.setState({ data, errorMessage: ''})
      })
  }
  render(){
    const { data, errorMessage } = this.state
    const inputAbn = this.props.match.params.id
    // console.log(inputAbn, data, errorMessage)

    // return for when we are waiting for the API to return
    if ((!data || data.length === 0) && !errorMessage) return (
      <div className="panel show-panel">
        <div className="panel-header text-center">
          <Link to="/"><figure className="avatar" data-initial="TL"></figure></Link>
          <div className="panel-title h5">Business Search</div>
          <div className="panel-subtitle">Results for: {inputAbn}</div>
          <div className="panel-title h5">
            <button className="btn btn-link loading">loading</button>
          </div>
        </div>
      </div>
    )

    // return for an error response
    if (errorMessage) return (
      <div className="panel show-panel">
        <div className="panel-header text-center">
          <Link to="/"><figure className="avatar" data-initial="TL"></figure></Link>
          <div className="panel-title h5">Business Search</div>
          <div className="panel-subtitle">Results for: {inputAbn}</div>
          <div className="panel-title h5">{errorMessage}</div>
        </div>
      </div>
    )
    
    //return for a positive response 
    return (
      <div className="panel show-panel">
        <div className="panel-header text-center">
          <Link to="/"><figure className="avatar" data-initial="TL"></figure></Link>
          <div className="panel-title h5">Business Search</div>
          <div className="panel-subtitle">Results for: {data.Abn}</div>
          <div className="panel-title h2">{data.BusinessName[0]}</div>
        </div>
        <div className="panel-body">
          <div className="tile tile-centered">
            <div className="tile-content">
              <div className="tile-title text-bold">Entity</div>
              <div className="tile-subtitle">{data.EntityName} ({data.EntityTypeName})</div>
            </div>
          </div>
          <div className="tile tile-centered">
            <div className="tile-content">
              <div className="tile-title text-bold">ABN status</div>
              <div className="tile-subtitle">{data.AbnStatus} from {data.AddressDate}</div>
            </div>
          </div>
          <div className="tile tile-centered">
            <div className="tile-content">
              <div className="tile-title text-bold">Goods & Services Tax (GST)</div>
              <div className="tile-subtitle">{data.Gst ? 'Registered' : 'Not currently registered for GST'}</div>
            </div>
          </div>
          <div className="tile tile-centered">
            <div className="tile-content">
              <div className="tile-title text-bold">Main business location</div>
              <div className="tile-subtitle">{data.AddressPostcode}, {data.AddressState}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 


export default Company
