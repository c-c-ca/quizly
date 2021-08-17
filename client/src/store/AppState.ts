import { combineReducers } from "redux";
import { QuestionReducer } from "./questions/Reducer";

export const rootReducer = combineReducers({
  question: QuestionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
