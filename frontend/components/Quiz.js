import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const {quiz, fetchQuiz, postAnswer, selectAnswer, answerId } = props

  const handlePostAnswerClick = () => {
    console.log('post:', postAnswer({ quiz_id: quiz.quiz_id, answer_id: answerId}))
    postAnswer({ quiz_id: quiz.quiz_id, answer_id: answerId});
  }

  const handleSelectAnswerClick = (num) => {
    console.log('select:', selectAnswer(quiz.answers[num].answer_id))
    selectAnswer(quiz.answers[num].answer_id);
  }

  useEffect(()=>{
    if (!quiz) {
      fetchQuiz();
    }
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${answerId === quiz.answers[0].answer_id ? ' selected' : ''}`}>
                  {quiz.answers[0].text}
                <button onClick={()=>handleSelectAnswerClick(0)}>
                  {answerId === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${answerId === quiz.answers[1].answer_id ? ' selected' : ''}`}>
                  {quiz.answers[1].text}
                <button onClick={()=>handleSelectAnswerClick(1)}>
                  {answerId === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled={answerId ? false : true} id="submitAnswerBtn" onClick={handlePostAnswerClick}>Submit answer</button>
          </>
        ) : 'Loading next quiz...' 
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {quiz: state.quiz, answerId: state.selectedAnswer}
}

export default connect (mapStateToProps, {fetchQuiz, postAnswer, selectAnswer})(Quiz)