import React, { Component } from 'react'
import { View, StyleSheet, Button, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import { clearLocalNotification, setLocalNotification } from '../utils'

class CardScreen extends Component {
  state = {
    currentQuestion: 1,
    correctAnswer: 0,
    showAnswer: false,
    showResult: false,
  }
  static navigationOptions = {
    title: 'Quiz',
  }
  showAnswer = () => {
    this.setState({
      showAnswer: true
    })
  }
  nextQuestion = () => {
    const questions = Object.entries(this.props.deck.questions)
    if (this.state.currentQuestion === questions.length) {
      this.setState({
        showResult: true
      })

      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        showAnswer: false,
      })
    }
  }
  corretQuestion = () => {
    this.setState({
      correctAnswer: this.state.correctAnswer + 1,
    })
    this.nextQuestion()
  }
  render() {
    const { deck } = this.props
    const questions = Object.entries(deck.questions)
    return (
      this.state.showResult ?
        <View style={styles.container}>
          <View style={styles.question}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>Correct Answer: {this.state.correctAnswer} </Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>Incorrect Answer: {deck.questions.length - this.state.correctAnswer} </Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>Result: {((this.state.correctAnswer * 100) / deck.questions.length).toFixed(2)} % </Text>
          </View>

        </View>
        :
        !this.state.showAnswer
          ? <View style={styles.container}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>{this.state.currentQuestion} / {deck.questions.length}</Text>
            <View style={styles.question}>
              <Text style={{ fontSize: 32, textAlign: "center" }}>{questions[this.state.currentQuestion - 1][1].question}?</Text>
              <TouchableOpacity onPress={this.showAnswer}>
                <Text style={styles.answer}>Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <View style={styles.container}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>{this.state.currentQuestion} / {deck.questions.length}</Text>
            <View style={styles.question}>
              <Text style={{ fontSize: 32, textAlign: "center" }}>{questions[this.state.currentQuestion - 1][1].answer}</Text>
            </View>
            <View style={styles.question}>
              <View style={styles.btn}>
                <Button
                  color={Colors.green}
                  style={{ margin: 20 }}
                  title="Correct"
                  onPress={this.corretQuestion}
                />
              </View>
              <View style={styles.btn}>
                <Button
                  color={Colors.red}
                  style={{ margin: 20 }}
                  title="Incorrect"
                  onPress={this.nextQuestion}
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
export default connect(mapStateToProps)(CardScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  question: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  answer: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 16,
    color: Colors.purple
  },
  btn: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
});
