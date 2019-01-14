// const to pass them aroung especially into our reducer
export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'


// creating our action creators


// takes in an object w/ 3 properties
export function addRecipe({day, meal, recipe}){
  // returns an action(object)
  return {
    type: ADD_RECIPE,
    recipe,
    day,
    meal
  }

}

export function removeFromCalendar({ day, meal }){
  return{
    type: REMOVE_FROM_CALENDAR,
    day,
    meal
  }

}
