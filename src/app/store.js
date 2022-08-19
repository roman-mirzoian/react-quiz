import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizListReducer from "../containers/QuizList/quizListSlice";
import quizReducer from "../containers/Quiz/quizSlice";

const rootReducer = combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
