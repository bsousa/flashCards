import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { submitCard } from '../api'

class AddCardScreen extends Component {
  state = {
    question: '',
    answer: '',
  }
  static navigationOptions = {
    title: 'New Card',
  }
  submit = () => {
    const { dispatch, entries } = this.props

    const key = this.props.deck.title

    dispatch(addCard(key, {question: this.state.question, answer: this.state.answer}))

    submitCard(entries, key, {question: this.state.question, answer: this.state.answer})

    this.toHome()

  }
  toHome = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textArea}>
          <TextInput
            placeholder=' Question'
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View style={styles.textArea}>
          <TextInput
            placeholder=' Answer'
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <View style={styles.btn}>
          <Button
            disabled={this.state.question === '' || this.state.answer === ''}
            style={{ margin: 20 }}
            title="Add Card"
            onPress={this.submit}
          />
        </View>
      </View>
    )
  }
}
function mapStateToProps(entries, { navigation }) {
  const { key } = navigation.state.params
  const deck = entries[key]
  return {
    deck,
    entries,
  }
}
export default connect(mapStateToProps)(AddCardScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  btn: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  textArea: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'flex-end'
  }
});