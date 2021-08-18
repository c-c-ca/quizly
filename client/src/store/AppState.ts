import { combineReducers } from "redux";
import { QuestionReducer } from "./questions/Reducer";

export const rootReducer = combineReducers({
  questions: QuestionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
