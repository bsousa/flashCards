import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import AddDeckScreen from '../screens/AddDeckScreen'
import AddCardScreen from '../screens/AddCardScreen'
import DeckScreen from '../screens/DeckScreen'
import CardScreen from '../screens/CardScreen'

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Deck: DeckScreen,
    AddCard: AddCardScreen,
    Card: CardScreen
  }
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Decks'
}

HomeStack.path = ''

const AddDeckScreenStack = createStackNavigator(
  {
    AddDeck: AddDeckScreen,
  }
)

AddDeckScreenStack.navigationOptions = {
  tabBarLabel: 'New Deck',
}

AddDeckScreenStack.path = ''


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AddDeckScreenStack,
})

tabNavigator.path = ''

export default tabNavigator
