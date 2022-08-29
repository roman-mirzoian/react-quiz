import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizListReducer from "../containers/QuizList/quizListSlice";
import quizReducer from "../containers/Quiz/quizSlice";
import quizCreatorReducer from "../containers/QuizCreator/quizCreatorSlice";
import authReducer from "../containers/Auth/authSlice";

const rootReducer = combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
  quizCreator: quizCreatorReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
