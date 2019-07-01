import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import Colors from '../constants/Colors'
import { connect } from 'react-redux'

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params

    return {
      title: key
    }
  }
  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.black, fontSize: 22, textAlign: 'center' }}>{deck.title}</Text>
        <Text style={{ color: Colors.gray, fontSize: 14, textAlign: 'center', paddingTop: 5 }}>{deck.questions.length}  cards</Text>
        <View style={styles.btnArea}>
          <View style={styles.btn}>
            <Button
              style={{ margin: 20 }}
              title="Add Card"
              onPress={() => this.props.navigation.navigate('AddCard', {key: deck.title})}
            />
          </View>
          <View style={styles.btn}>
            <Button
              style={{ margin: 20 }}
              title="Start Quiz"
              onPress={() => this.props.navigation.navigate('Card', {key: deck.title})}
            />
          </View>
        </View>
      </View>
    )
  }
}
function mapStateToProps(entries, { navigation }) {
  const { key } = navigation.state.params
  const deck = entries[key]
  return {
    deck
  }
}
export default connect(mapStateToProps)(DeckScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  btn: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  btnArea: {
    justifyContent: 'flex-end'
  }
})
