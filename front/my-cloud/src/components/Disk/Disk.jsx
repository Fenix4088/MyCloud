import React, { useEffect } from 'react';
import { withRedirect } from '../../hoc/withRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, togglePopUp } from '../../redux/reducers/fileReducer/fileReducer';

import s from './Disk.module.scss';
import { FileList } from './FileList/FileList';
import { Popup } from '../Popup/Popup';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.fileReducer.currentDir);
  const isPopupVisible = useSelector((state) => state.fileReducer.isPopupVisible);

  useEffect(() => {
    dispatch(fetchFiles(currentDir));
  }, [currentDir]);

  const closeForm = () => {
    dispatch(togglePopUp(false));
  };

  const createFolder = () => {
    dispatch(togglePopUp(true));
  };

  return (
    <div className={s['container']}>
      {isPopupVisible && <Popup closeForm={closeForm} />}
      <div className={s['button-group']}>
        <button>Back</button>
        <button onClick={createFolder}>Create folder</button>
      </div>
      <FileList />
    </div>
  );
};

export default withRedirect(Disk, false);
