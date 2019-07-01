import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'flashCards:decks-storage'

export function fetchDecksResults() {
  return AsyncStorage.getItem(STORAGE_KEY).then(formatCalendarResults)
}
export function formatCalendarResults(results) {
  return JSON.parse(results)
}
export function submitEntry(key, entry) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}
export function submitCard(entries) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}
