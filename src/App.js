import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { autoLogin } from "./containers/Auth/authSlice";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Logout from "./components/Logout/Logout";
import { useEffect } from "react";

function App() {
  const auth = useSelector((store) => store.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationDateTime = localStorage.getItem("expirationDateTime");
    if (token && expirationDateTime) {
      dispatch(autoLogin({ token, expirationDateTime }));
    }
  }, []);

  let routes = (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/" element={<QuizList />} />
      <Route path="*" element={<QuizList />} />
    </Routes>
  );

  if (auth) {
    routes = (
      <Routes>
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<QuizList />} />
      </Routes>
    );
  }

  return <Layout>{routes}</Layout>;
}

export default App;
