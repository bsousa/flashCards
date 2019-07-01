import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.payload.entries,
      }
    case ADD_ENTRY:
      return {
        ...state,
        ...action.payload.entry
      }
    case ADD_CARD:
      return {
        ...state,
        ...state[action.payload.key].questions.push(action.payload.card)
      }
    default:
      return state
  }
}
export default entries