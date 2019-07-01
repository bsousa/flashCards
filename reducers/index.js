import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries,
      }
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry
      }
    case ADD_CARD:
      return {
        ...state,
        ...state[action.key].questions.push(action.card)
      }
    default:
      return state
  }
}
export default entries