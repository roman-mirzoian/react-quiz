import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../constants";

const sliceName = "quizSlice";
const actionFetchType = "quiz/fetch";

export const fetchQuiz = (id = null) => {
  const dbUrl = `${Constants.dbUrl}/${id}.json`;

  return createAsyncThunk(actionFetchType, async (_, thunkAPI) => {
    try {
      const response = await axios.get(dbUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  });
};

const initialState = {
  loading: true,
  quizData: [],
  activeQuestionNumber: 0,
  answerState: null,
  isQuizFinished: false,
  results: {},
  error: null,
};

const quizSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveQuestionNumber: (state, action) => {
      state.activeQuestionNumber = action.payload;
    },
    setAnswerState: (state, action) => {
      state.answerState = action.payload;
    },
    setIsQuizFinished: (state, action) => {
      state.isQuizFinished = action.payload;
    },
    setResults: (state, action) => {
      state.results = { ...state.results, ...action.payload };
    },
    updateQuestion: (state) => {
      const isQuizFinished =
        state.activeQuestionNumber + 1 === state.quizData.length;
      if (isQuizFinished) {
        state.isQuizFinished = true;
      } else {
        state.activeQuestionNumber = state.activeQuestionNumber + 1;
      }
      state.answerState = null;
    },
    retryQuiz: (state) => {
      state.activeQuestionNumber = 0;
      state.answerState = null;
      state.isQuizFinished = false;
      state.results = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchQuiz().fulfilled, (state, { payload }) => {
      if (payload) {
        state.quizData = payload;
      } else {
        state.error = Constants.fetchErrorMessage;
      }
      state.loading = false;
    });
  },
});

export const { setAnswerState, setResults, updateQuestion, retryQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
