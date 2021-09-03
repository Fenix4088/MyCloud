import React, { useCallback, useState } from 'react';
import s from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ModalForm } from '../ModalForm/ModalForm';
import { authorization } from '../../redux/reducers/userReducer/userReducer';
import {Redirect} from "react-router-dom";
import {withRedirect} from "../../hoc/withRedirect";

 const Login = () => {
  const dispatch = useDispatch();

  const [{ email, password }, setInputValues] = useState({
    email: '',
    password: '',
  });

  const inputsData = [
    {
      type: 'text',
      name: 'email',
      value: email,
    },
    {
      type: 'password',
      name: 'password',
      value: password,
    },
  ];

  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      setInputValues((state) => ({ ...state, [name]: value }));
    },
    [setInputValues]
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    await dispatch(authorization(email, password));
    setInputValues((state) => ({ email: '', password: '' }));
  };

  return (
    <>
      <ModalForm
        wrapperStyles={s['wrapper']}
        formStyles={s['form']}
        title={'Authorization'}
        inputs={inputsData}
        formSubmitHandler={onFormSubmit}
        inputChangeHandler={onInputChange}
      />
    </>
  );
};

export default withRedirect(Login, true, '/');
