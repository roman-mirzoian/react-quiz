import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizListReducer from "../containers/QuizList/quizListSlice";

const rootReducer = combineReducers({
  quizList: quizListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
