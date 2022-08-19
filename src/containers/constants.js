const API_KEY = "AIzaSyCAIIIQ-ibL9O_EwJm1fgcnR4KET48POLE";

const Constants = {
  dbUrl:
    "https://react-quiz-91022-default-rtdb.europe-west1.firebasedatabase.app/quizlist",
  questionDelay: 1000,

  baseControlsData: {
    email: {
      value: "",
      type: "email",
      label: "Email",
      errorMessage: "Wrong email",
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      type: "password",
      label: "Password",
      errorMessage: "Wrong password",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  },

  registerApiUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  authApiUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,

  success: "success",
  error: "error",
  fetchErrorMessage: "Something wrong with fetching data.",
};

export default Constants;
