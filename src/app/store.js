import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizListReducer from "../containers/QuizList/quizListSlice";
import quizReducer from "../containers/Quiz/quizSlice";
import quizCreatorReducer from "../containers/QuizCreator/quizCreatorSlice";

const rootReducer = combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
  quizCreator: quizCreatorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
