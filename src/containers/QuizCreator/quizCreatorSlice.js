import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../constants";

const sliceName = "quizCreatorSlice";

export const sendCreatedQuiz = createAsyncThunk("quiz/send", async (quiz) => {
  const response = await axios.post(`${Constants.dbUrl}.json`, quiz);
  return response.data;
});

const initialState = {
  quiz: [],
};

const quizCreatorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    createQuizQuestion: (state, { payload }) => {
      const { rightAnswerId, formControls } = payload;
      const questionItem = createQuestionItem({
        quiz: state.quiz,
        rightAnswerId,
        ...formControls,
      });
      state.quiz = [...state.quiz, questionItem];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCreatedQuiz.fulfilled, () => {
      console.log("Quiz created without errors.");
    });
  },
});

function createQuestionItem({
  quiz,
  question,
  rightAnswerId,
  option1,
  option2,
  option3,
  option4,
}) {
  return {
    id: quiz.length + 1,
    question: question.value,
    rightAnswerId,
    answers: [
      { text: option1.value, id: option1.id },
      { text: option2.value, id: option2.id },
      { text: option3.value, id: option3.id },
      { text: option4.value, id: option4.id },
    ],
  };
}

export const { setQuiz, createQuizQuestion } = quizCreatorSlice.actions;
export default quizCreatorSlice.reducer;
