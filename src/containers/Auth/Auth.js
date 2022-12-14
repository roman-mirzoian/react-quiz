import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { validateInput, validateForm } from "../../helpers/formHelper";

import { useDispatch } from "react-redux";
import { auth } from "./authSlice";

import classes from "./Auth.module.css";
import Constants from "../constants";

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState(Constants.baseControlsData);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsFormValid(validateForm(formControls));
  }, [formControls]);

  const loginHandler = async () => {
    dispatch(
      auth({
        email: formControls.email.value,
        password: formControls.password.value,
        isLogin: true,
      })
    );
  };

  const registerHandler = async () => {
    dispatch(
      auth({
        email: formControls.email.value,
        password: formControls.password.value,
        isLogin: false,
      })
    );
  };

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
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
