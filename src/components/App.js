import React, { Component } from 'react'
import {connect} from 'react-redux'


class App extends Component {

  render() {
    console.log('Props', this.props)

    return (
      <div>
        Hello world
     </div>
    )
  }
}


// this function is going to map our Redux state to component props
// recieve our state what ever we return from this component will pass to our as
// long as we pass mapStateToProps as the first argument in connect
function mapStateToProps(calendar){

}


// want to connect app component to redux store to grab calendar state living
// Redux store

export default connect()(App)
