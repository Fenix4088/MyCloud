import React, { useCallback, useState } from 'react';
import s from './Registration.module.scss';
import { Input } from '../Input/Input';

export const Registration = () => {
  const [{ email, password }, setInputValues] = useState({
    email: '',
    password: '',
  });

  const onInputChange = useCallback((e) => {
    const { name, value } = e.currentTarget;
    setInputValues((state) => ({ ...state, [name]: value }));
  }, [setInputValues]);

  return (
    <div className={s['wrapper']}>
      <form className={s['form']}>
        <h2>Registration</h2>
        <Input value={email} type='email' name={'email'} placeholder={'Enter your email...'} onChange={onInputChange} />
        <Input value={password} type='password' name={'password'} placeholder={'Enter your password...'} onChange={onInputChange} />
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};
