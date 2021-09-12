import React, { useEffect } from 'react';
import { withRedirect } from '../../hoc/withRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../../redux/reducers/fileReducer/fileReducer';

import s from './Disk.module.scss';
import {FileList} from "./FileList/FileList";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.fileReducer.currentDir);

  useEffect(() => {
    dispatch(fetchFiles(currentDir));
  }, [currentDir]);

  return (
    <div className={s['container']}>
      <div className={s['button-group']}>
        <button>Back</button>
        <button>Create folder</button>
      </div>
      <FileList/>
    </div>
  );
};

export default withRedirect(Disk, false);
