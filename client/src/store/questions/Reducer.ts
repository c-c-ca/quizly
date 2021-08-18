export const QUESTION_TYPE = "QUESTION_TYPE";

export interface Question {
  id: number;
  text: string;
  choices: string[];
  answer: string;
}

export interface QuestionsAction {
  type: string;
  payload: Question[] | null;
}

export const QuestionReducer = (
  state: Question[] | null = null,
  action: QuestionsAction
): Question[] | null => {
  switch (action.type) {
    case QUESTION_TYPE:
      return action.payload;
    default:
      return state;
  }
};
