import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createQuizQuestion,
  setQuiz,
  sendCreatedQuiz,
} from "./quizCreatorSlice";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validateInput,
  validateForm,
} from "../../helpers/formHelper";
import classes from "./QuizCreator.module.css";

const QuizCreator = () => {
  // hooks:on
  const { quiz } = useSelector((state) => state.quizCreator);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls());

  useEffect(() => {
    setIsFormValid(validateForm(formControls));
  }, [formControls]);
  // hooks:off

  // handlers:on
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const reinitForm = (full = false) => {
    if (full) {
      dispatch(setQuiz([]));
    }
    setFormControls(createFormControls());
    setIsFormValid(false);
    setRightAnswerId(1);
  };
  const addQuestionHandler = (e) => {
    e.preventDefault();

    dispatch(createQuizQuestion({ rightAnswerId, formControls }));

    reinitForm();
  };
  const createTestHandler = async (e) => {
    e.preventDefault();

    dispatch(sendCreatedQuiz(quiz));
    reinitForm(true);
  };
  const selectChangeHandler = (e) => {
    setRightAnswerId(+e.target.value);
  };

  const onChaneInputHandler = (e, controlName) => {
    const currentInput = { ...formControls[controlName] };
    currentInput.value = e.target.value;
    currentInput.touched = true;
    currentInput.valid = validateInput(
      currentInput.value,
      currentInput.validation
    );

    setFormControls((prevControls) => {
      return { ...prevControls, [controlName]: currentInput };
    });
  };
  // handlers:off

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Quiz creator</h1>
        <form onSubmit={submitHandler}>
          {renderInputs(formControls, onChaneInputHandler)}

          <Select
            label="Choose correct answer"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          />

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Add question
          </Button>
          <Button
            type="success"
            onClick={createTestHandler}
            disabled={quiz.length === 0}
          >
            Create test
          </Button>
        </form>
      </div>
    </div>
  );
};

// helpers:on
function createOptionControl(number) {
  return createControl(
    {
      label: `Variant ${number}`,
      errorMessage: "Variant can not be empty",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Enter question",
        errorMessage: "Question can not be empty",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

function renderInputs(formControls, onChaneInputHandler) {
  return Object.keys(formControls).map((controlName, i) => {
    const { type, value, valid, touched, label, validation, errorMessage } =
      formControls[controlName];
    return (
      <React.Fragment key={i}>
        <Input
          key={controlName + i}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(e) => onChaneInputHandler(e, controlName)}
        />
        {i === 0 && <hr />}
      </React.Fragment>
    );
  });
}
// helpers:off

export default QuizCreator;
