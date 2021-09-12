import React from 'react';
import s from './FileList.module.scss';
import {useSelector} from "react-redux";
import {File} from "./File/File";

export const FileList = () => {
  const fileListData = useSelector((state) => state.fileReducer.files);

  return (
    <div className={s['list-container']}>
      <div className={s['list-item']}>
        <div className={s['name']}>File name</div>
        <div className={s['date']}>Date</div>
        <div className={s['size']}>Size</div>
      </div>
      {fileListData.map((file) => {
        return <File key={file._id} filePayload={file}/>
      })}
    </div>
  );
};
