import React, { useCallback, useState } from 'react';
import s from './Registration.module.scss';
import { Input } from '../Input/Input';
import { useDispatch } from 'react-redux';
import { registration } from '../../redux/reducers/userReducer/userReducer';

export const Registration = () => {
  const dispatch = useDispatch();

  const [{ email, password }, setInputValues] = useState({
    email: '',
    password: '',
  });

  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      setInputValues((state) => ({ ...state, [name]: value }));
    },
    [setInputValues]
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if(!email.trim() || !password.trim()) return;

    await dispatch(registration(email, password));
    setInputValues(state => ({email: '', password: ''}));
  };

  return (
    <div className={s['wrapper']}>
      <form className={s['form']} onSubmit={onFormSubmit}>
        <h2>Registration</h2>
        <Input value={email} type='email' name={'email'} placeholder={'Enter your email...'} onChange={onInputChange} />
        <Input value={password} type='password' name={'password'} placeholder={'Enter your password...'} onChange={onInputChange} />
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};
