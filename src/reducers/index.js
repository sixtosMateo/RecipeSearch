import {ADD_RECIPE, REMOVE_FROM_CALENDAR} from '../actions'



// whenever the ADD_RECIPE is dispatch not only do we modify calendar state
// but also modify the food section of the store

// how do we combine the Calendar Reducer and Food reducer 

function food(state={},action){
  switch(action.type){

    case ADD_RECIPE:
      const { recipe } = action
      // state will remain same but the recipe will equal to  the action recipe
      return {
        ...state,
        [recipe.label]: recipe
      }

    default:
      return state

  }

}


// our reducer is going to specify the shape or our store

// first time that our reducer is called its state is equal to undefined

const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}


// Reducer Function:
// receives current state and action
// if state is undefined then we set the state to initialCalendarState ^^^
function calendar(state=initialCalendarState, action){
  // this 3 variables are equal to our action coming form actions/index.js
  const {day, recipe, meal } = action

  // specify how our state will change based off these actions
  // the state that we return from this Reducer Function is going to be the new
  // new state of our store

  switch (action.type) {
    case ADD_RECIPE:
      // return the same state, but we want to modify a specific day
      // ex: only modify if day is saturday and modify only the meal property
      // same logic: state at this specific day remains the same but meal was
              // now its going to be equal to recipe.label
      return {
        ...state,
        [day]:{
          ...state[day],
          [meal]: recipe.label
        }
      }

    case REMOVE_FROM_CALENDAR:
      // all of the state remains same except for the specific day

      return {
        ...state,
        [day]:{// all of other meals on this day are going to remain same except
          [meal]: null,// except for that specific meal is now going to be null
        }
      }
    default:
      return state
  }
}

export default calendar;
