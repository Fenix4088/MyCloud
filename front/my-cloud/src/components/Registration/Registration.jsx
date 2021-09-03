import React, { useCallback, useState } from 'react';
import s from './Registration.module.scss';
import { useDispatch } from 'react-redux';
import { registration } from '../../redux/reducers/userReducer/userReducer';
import { ModalForm } from '../ModalForm/ModalForm';

export const Registration = () => {
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

    await dispatch(registration(email, password));
    setInputValues((state) => ({ email: '', password: '' }));
  };

  return (
    <>
      <ModalForm
        wrapperStyles={s['wrapper']}
        formStyles={s['form']}
        title={'Registration'}
        inputs={inputsData}
        formSubmitHandler={onFormSubmit}
        inputChangeHandler={onInputChange}
      />
    </>
  );
};


