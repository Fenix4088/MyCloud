import React, { useState } from 'react';
import s from './Popup.module.scss';
import { ModalForm } from '../ModalForm/ModalForm';
import {createFolder} from "../../redux/reducers/fileReducer/fileReducer";
import {useDispatch, useSelector} from "react-redux";

export const Popup = ({ closeForm }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.fileReducer.currentDir);

  const [state, setState] = useState({
    'folder name': '',
  });

  const closePopup = (e) => {
    e.stopPropagation();
    closeForm();
  };

  const onInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setState((state) => ({ ...state, [name]: value }));
  };

  const onPopupSubmit = (e) => {
    e.preventDefault();
    dispatch(createFolder(state['folder name'], 'dir', currentDir));
    closeForm();
  };

  return (
    <div>
      <div className={s['wrapper']} onClick={closePopup} />
      <ModalForm
        close
        wrapperStyles={s['formWrapper']}
        formStyles={s['form']}
        title={'Create folder'}
        inputs={[{ type: 'text', name: 'folder name', value: state['folder name'] }]}
        formSubmitHandler={onPopupSubmit}
        inputChangeHandler={onInputChange}
        closeFormHandler={closePopup}
      />
    </div>
  );
};
