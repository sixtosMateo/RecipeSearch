import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'


class App extends Component {

  // doThing=()=>{
  //   // allow to grab dispatch we are connect to component
  //   this.props.dispatch(addRecipe({}))
  //
  // } instead of having to use the dispatch property that is being passed to component
  // by tying up mapDispatchToProps to component by passing it as the second argument to connect
  // now our component will have a selectRecipe method as well as remove method on its props
  // when this functions are callled they automatically going to dispatch for us
  // we can do this:

  doThing=()=>{

    this.props.selectRecipe({})

  }

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
  const dayOrder = ['sunday','monday', 'tuesday','wednesday','thursday','friday','saturday']

  return{
    calendar: dayOrder.map((day)=>({
      day,
      // we want to reduce all of these into single object
      meals: Object.keys(calendar[day]).reduce((meals,meal) =>
      { // if these calendar on this day and this meal exist or is a thing
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null
        return meals
      },{})

    }))
  }

}


// allow us to map the dispatch method to our specific props
function mapDispatchToProps(dispatch){
  // can add few properties to this object
  return{
    // it is invoking dispatch calling addRecipe passing data
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }

}


// want to connect app component to redux store to grab calendar state living
// Redux store

export default connect(mapStateToProps,mapDispatchToProps)(App)
