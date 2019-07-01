export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const ADD_CARD = 'ADD_CARD'

export function receiveEntries (entries) { 
  return {
    type: RECEIVE_ENTRIES,
    payload: { entries },
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    payload: { entry },
  }
}

export function addCard (key, card) {
  return {
    type: ADD_CARD,
    payload : { key, card },
  }
}
