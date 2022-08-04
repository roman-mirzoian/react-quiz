import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
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
  });

  useEffect(() => {
    let isValid = true;
    Object.values(formControls).forEach((control) => {
      isValid = control.valid;
    });
    setIsFormValid(isValid);
  }, [formControls]);

  const loginHandler = () => {};
  const registerHandler = () => {};
  const submitHandler = (e) => {
    e.preventDefault();
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
      );
    });
  };

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Authorization</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}
          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Log in
          </Button>
          <Button
            type="primary"
            onClikc={registerHandler}
            disabled={!isFormValid}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateInput(value, validation) {
  if (!validation) {
    return true;
  }

  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.email) {
    isValid = validateEmail(value);
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  return isValid;
}

export default Auth;
