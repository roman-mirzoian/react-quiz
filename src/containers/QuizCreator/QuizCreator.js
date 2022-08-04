import React, { useState, useEffect } from "react";
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
  const [quiz, setQuiz] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls());

  useEffect(() => {
    setIsFormValid(validateForm(formControls));
  }, [formControls]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const addQuestionHandler = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
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
    setQuiz((prevQuiz) => {
      return [...prevQuiz, questionItem];
    });
    setFormControls(createFormControls());
    setIsFormValid(false);
    setRightAnswerId(1);
  };
  const createTestHandler = (e) => {
    e.preventDefault();
    // TODO: add server connect
    console.log(quiz);
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

  const renderInputs = () => {
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
  };

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Quiz creator</h1>
        <form onSubmit={submitHandler}>
          {renderInputs()}
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

export default QuizCreator;
