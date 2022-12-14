import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../constants";

const sliceName = "quizList";
const dbUrl = `${Constants.dbUrl}.json`;
const actionThunkName = "quiz/fetchList";

export const fetchQuizList = createAsyncThunk(
  actionThunkName,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(dbUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  quizData: [],
  loading: true,
  error: null,
};

export const quizListSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuizList.fulfilled, (state, { payload }) => {
      if (payload) {
        state.quizData = parseQuizList(payload);
      } else {
        state.error = Constants.fetchErrorMessage;
      }
      state.loading = false;
    });
  },
});

function parseQuizList(payload) {
  const getName = (i) => `Test #${i + 1}`;

  const quizList = [];
  Object.keys(payload).forEach((key, i) => {
    quizList?.push({
      id: key,
      name: getName(i),
    });
  });

  return quizList;
}

export default quizListSlice.reducer;
