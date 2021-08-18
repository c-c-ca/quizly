import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppState } from "../store/AppState";
import { Question, QUESTION_TYPE } from "../store/questions/Reducer";
import { useDispatch, useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000";

function QuestionDisplay() {
  const questions = useSelector((state: AppState) => state.questions);
  const dispatch = useDispatch();

  // Index of the current question
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // Indices of the choices for each question selected by the user
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);

  useEffect(() => {
    (async function fetchQuestion() {
      dispatch({
        type: QUESTION_TYPE,
        payload: (await axios.get<Question[]>(`${BASE_URL}/questions`)).data,
      });
    })();
  }, []);

  useEffect(() => {
    if (questions && selectedChoices.length === 0)
      setSelectedChoices(Array(questions.length).fill(-1));
  }, [questions]);

  const onClickChoice = (choiceIndex: number) =>
    setSelectedChoices(
      selectedChoices.map((selectedChoice: number, index: number): number =>
        questionIndex === index ? choiceIndex : selectedChoice
      )
    );

  const onClickPreviousQuestion = (): void => {
    if (questions) {
      setQuestionIndex(Math.max(0, questionIndex - 1));
    }
  };

  const onClickNextQuestion = (): void => {
    if (questions) {
      setQuestionIndex(Math.min(questions.length - 1, questionIndex + 1));
    }
  };

  const renderChoices = (choices: string[]): JSX.Element => (
    <div>
      {choices.map(
        (choice: string, index: number): JSX.Element => (
          <div key={index}>
            <input
              type="radio"
              id={choice}
              name={`question${questionIndex}`}
              checked={index === selectedChoices[questionIndex]}
              onChange={() => onClickChoice(index)}
            />
            <label htmlFor={choice}>{choice}</label>
          </div>
        )
      )}
    </div>
  );

  const renderQuestion = ({ text, choices }: Question): JSX.Element => (
    <div>
      <p>{text}</p>
      {renderChoices(choices)}
    </div>
  );

  return questions ? (
    <div>
      {renderQuestion(questions[questionIndex])}
      <button onClick={onClickPreviousQuestion}>Previous</button>
      <button onClick={onClickNextQuestion}>Next</button>
    </div>
  ) : null;
}

export default QuestionDisplay;
