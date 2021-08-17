export const QUESTION_TYPE = "QUESTION_TYPE";

export interface Question {
  id: number;
  text: string;
  choices: string[];
  answer: string;
}

export interface QuestionAction {
  type: string;
  payload: Question | null;
}

export const QuestionReducer = (
  state: Question | null = null,
  action: QuestionAction
): Question | null => {
  switch (action.type) {
    case QUESTION_TYPE:
      return action.payload;
    default:
      return state;
  }
};
