import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'

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
    const {calendar, remove} = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className="container">
        <ul className="meal-types">
          {mealOrder.map((mealType) =>(
            <li key={mealType} className="subheader">
            {
              capitalize(mealType)
            }
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
     </div>
    )
  }
}

// FOOD REDUCER
// example say we have label would be pizza
// {
//   pizza:{
        // all the information of this label
//    }
// }
//  so this would be what our food slice would look like

// CALENDAR REDUCER
// {
//   moday :{
//     breakfast: here would be the id for the food in this case 'pizza'
//   }
// }


// this function is going to map our Redux state to component props
// recieve our state what ever we return from this component will pass to our as
// long as we pass mapStateToProps as the first argument in connect

// now we are passing food reducer but as object since we have combineReducers
// anything that has to do with recipe is going to live inside food reducers
function mapStateToProps({calendar, food}){
  const dayOrder = ['sunday','monday', 'tuesday','wednesday','thursday','friday','saturday']

  return{
    calendar: dayOrder.map((day)=>({
      day,
      // we want to reduce all of these into single object
      meals: Object.keys(calendar[day]).reduce((meals,meal) =>
      { // if these calendar on this day and this meal exist or is a thing
        meals[meal] = calendar[day][meal]
            // BECAUSE OF TOP EXAMPLE calendar[day][meal] NEEDS TO BE IN inside food[]
            // BECAUSE IT REPRESENTS AS THE ID OF FOOD REDUCER
          ? food[calendar[day][meal]]
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
