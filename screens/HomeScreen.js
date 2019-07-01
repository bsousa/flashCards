import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'
import { fetchDecksResults, submitEntry } from '../api'
import { receiveEntries } from '../actions'

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
class HomeScreen extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props

    fetchDecksResults()
      .then((entries) => dispatch(receiveEntries(entries)))
  }
  static navigationOptions = {
    header: null,
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <CardsStatusBar backgroundColor={Colors.black} barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.appTitle}>Flash Cards Mobile</Text>
          </View>
          {Object.keys(this.props.entries).map((entry) => {
            return (<View style={styles.item} key={entry}>
              <TouchableOpacity
                onPress={() => navigate('Deck', { key: entry })}>
                <Text style={styles.titleDeck}>{entry}</Text>
                <Text style={styles.cards}>{this.props.entries[entry].questions.length} cards</Text>
              </TouchableOpacity>
            </View>)
          })}
        </View>
      </ScrollView>
    )
  }
}
function mapStateToProps(entries=[]) {
  return {
    entries
  }
}
export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  appTitle : {
    fontSize: 22, 
    color: Colors.black 
  },
  titleDeck : { 
    fontSize: 22,
    color: Colors.black,
    textAlign: 'center', 
  },
  cards: {
    color: Colors.gray, 
    fontSize: 14, 
    textAlign: 'center', 
    paddingTop: 5,
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})
