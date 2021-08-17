import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppState } from "./store/AppState";
import { Question, QUESTION_TYPE } from "./store/questions/Reducer";
import { useDispatch, useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000";

function App() {
  const question = useSelector((state: AppState) => state.question);
  const [questionNum, setQuestionNum] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchQuestion() {
      const { data } = await axios.get<Question>(
        `${BASE_URL}/questions/${questionNum}`
      );

      if (data) {
        const { id, text, choices, answer } = data;
        dispatch({
          type: QUESTION_TYPE,
          payload: { id, text, choices, answer },
        });
      }
    })();
  }, [questionNum]);

  const onClickNextQuestion = () => {
    setQuestionNum(questionNum + 1);
  };

  const renderChoices = (choices: string[]): JSX.Element => (
    <ul>
      {choices.map(
        (choice: string, index: number): JSX.Element => (
          <li key={index}>{choice}</li>
        )
      )}
    </ul>
  );

  const renderQuestion = ({ text, choices }: Question): JSX.Element => (
    <div>
      <h3>{text}</h3>
      {renderChoices(choices)}
    </div>
  );

  return question ? (
    <div>
      {renderQuestion(question)}
      <button onClick={onClickNextQuestion}>Next</button>
    </div>
  ) : null;
}

export default App;
