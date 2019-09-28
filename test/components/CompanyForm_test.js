/* global describe, it */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Company from '../../src/components/Company'
import Search from '../../src/components/Search'

describe('Search page test', () => {
  // it should render the initial state of the page
  it('it should render the search panel and input box', done => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find('form.search-panel').length).to.equal(1)
    expect(wrapper.find('input').length).to.equal(1)
    done()
  })

  // input into the box and check the state
  it('typing in the input changes the state', done => {
    const wrapper = shallow(<Search />)
    wrapper.find('input')
      .simulate('change', { target: { value: 'A Company' }, preventDefault: ()=>{} })
    const state = wrapper.state()
    expect(state.searchString).to.eq('A Company')
    done()
  })

  // here I wanted to test the jsonp requests presenting the results, but I'm not sure how to test jsonp requests with enzyme
  // i tried using a timeout, but that failed!!!
  it('typing in the input provides results', done => {
    const wrapper = shallow(<Search />)
    wrapper.find('input')
      .simulate('change', { target: { value: 'A Company' }, preventDefault: ()=>{} })
    const state = wrapper.state()
    expect(state.searchString).to.eq('A Company')
    //here I wanted to detect the JSONP, but I don't know how
    done()
  })

  //move on to test the results display properly
  
})

describe('Company page test', () => {
  // it should render the initial state of the page
  it('it should render the show panel', done => {
    const props = { match: { params: {} } }
    const wrapper = shallow(<Company {...props} />)
    expect(wrapper.find('div.show-panel').length).to.equal(1)
    expect(wrapper.find('button.loading').length).to.equal(1)
    done()
  })

  // here I wanted to test the transition from loading to either error state, but I'm not sure how to test jsonp requests with enzyme
  // i tried using a timeout, but that failed!!!
  it('after loading, the loading spinner should be replaced', done => {
    const props = { match: { params: {} } }
    const wrapper = shallow(<Company {...props} />)
    expect(wrapper.find('div.show-panel').length).to.equal(1)
    expect(wrapper.find('button.loading').length).to.equal(0)
    done()
  })

  //move on to test the page layout
  
})