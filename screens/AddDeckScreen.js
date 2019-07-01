import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { addEntry } from '../actions/'
import { submitEntry } from '../api'
import { getMetaInfo } from '../utils'

class AddDeckScreen extends Component {
  static navigationOptions = {
    title: 'New Deck',
  }
  state = {
    title: '',
  }
  submit = () => {
    const { dispatch } = this.props
    const key = this.state.title
    let deck = getMetaInfo(key)

    dispatch(addEntry({
      [key]: deck
    }))

    submitEntry(key, deck)

    this.setState({ title: '' })

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
            placeholder=' Deck Name'
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
        </View>
        <View style={styles.btn}>
          <Button 
            disabled={this.state.title === ''}
            style={{ margin: 20 }}
            title="Add Deck"
            onPress={this.submit}
          />
        </View>
      </View>
    )
  }
}
function mapStateToProps (state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(AddDeckScreen)

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
