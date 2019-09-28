import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import jsonp from 'jsonp'

const Company = (props) => {

  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  // callback for the jsonp request
  function handleResponse(err, data) {
    // console.log(data)
    if (!data) {
      setData([])
      setError('No company found for that ABN')
    } else if (data.Message) {
      setData([])
      setError(data.Message)
    } else if (data.Abn) {
      setData(data)
      setError('')
    }
  }

  // make the jsonp call if there is an ID passed in, and also only if we havent set either the error or data
  if (props.match.params.id && !data && !error) jsonp(`https://abr.business.gov.au/json/AbnDetails.aspx?abn=${props.match.params.id}&guid=b6242120-5bce-4b10-9839-d3045a7682da`, null, handleResponse)


  const inputAbn = props.match.params.id
  // console.log(inputAbn, data, errorMessage)

  // return for when we are waiting for the API to return
  if ((!data || data.length === 0) && !error) return (
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
  if (error) return (
    <div className="panel show-panel">
      <div className="panel-header text-center">
        <Link to="/"><figure className="avatar" data-initial="TL"></figure></Link>
        <div className="panel-title h5">Business Search</div>
        <div className="panel-subtitle">Results for: {inputAbn}</div>
        <div className="panel-title h5">{error}</div>
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


export default Company
