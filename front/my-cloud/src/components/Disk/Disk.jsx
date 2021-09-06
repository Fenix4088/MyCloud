import React, {useEffect} from 'react';
import s from '../Disk/Disk.module.scss';
import { withRedirect } from '../../hoc/withRedirect';
import {useDispatch, useSelector} from "react-redux";
import {fetchFiles, fileReducer} from "../../redux/reducers/fileReducer/fileReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.fileReducer.currentDir);

  useEffect(() => {
    dispatch(fetchFiles(currentDir))
  }, [currentDir])

  return <div>
    <h1>DISK</h1>
  </div>;
};

export default withRedirect(Disk, false);
