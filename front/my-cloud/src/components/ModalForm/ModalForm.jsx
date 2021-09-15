import { Input } from '../Input/Input';
import React from 'react';

export const ModalForm = ({
  title = 'Form title',
  inputs,
  wrapperStyles,
  formStyles,
  formSubmitHandler,
  inputChangeHandler,
  close = false,
  closeFormHandler = () => {},
}) => {
  return (
    <div className={wrapperStyles}>
      <form className={formStyles} onSubmit={formSubmitHandler}>
        {close && (
          <button onClick={closeFormHandler} type={'button'}>
            X
          </button>
        )}
        <h2>{title}</h2>
        {inputs.map(({ type, name, value }) => {
          return <Input key={name} value={value} type={type} name={name} placeholder={`Enter your ${name}...`} onChange={inputChangeHandler} />;
        })}
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};
