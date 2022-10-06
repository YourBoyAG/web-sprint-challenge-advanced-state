import {MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM} from './action-types';
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return{ type: MOVE_CLOCKWISE }
 }

export function moveCounterClockwise() {
  return{ type: MOVE_COUNTERCLOCKWISE }
 }

export function selectAnswer(answerId) {
  return{ type: SET_SELECTED_ANSWER, payload: answerId }
 }

export function setMessage(message) {
  return{ type: SET_INFO_MESSAGE, payload: message }
 }

export function setQuiz(quiz) {
  return{ type: SET_QUIZ_INTO_STATE, payload: quiz }
 }

export function inputChange(input) {
  console.log(input)
  return{ type: INPUT_CHANGE, payload: input }
 }

export function resetForm() {
  return{ type: RESET_FORM }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch(setQuiz(res.data))
      })
      .catch((err)=>{
        console.log(err)
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answerObj) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post('http://localhost:9000/api/quiz/answer', answerObj)
      .then((res)=>{
        dispatch(fetchQuiz())
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
      })
      .catch((err)=>console.log(err))
  }
}
export function postQuiz(newQuiz) {
  console.log(newQuiz.newQuestion)
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/new`, {
      question_text: newQuiz.newQuestion.trim(), 
      true_answer_text: newQuiz.newTrueAnswer.trim(), 
      false_answer_text: newQuiz.newFalseAnswer.trim(), 
    })
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state