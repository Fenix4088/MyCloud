import React from 'react';
import s from './File.module.scss';
import folderImg from '../../../../assets/img/fxemoji_filefolder.svg';
import fileImg from '../../../../assets/img/flat-color-icons_file.svg';
import shareImg from '../../../../assets/img/share.svg';
import trashImg from '../../../../assets/img/trash.svg';
import downloadImg from '../../../../assets/img/download.svg';
import {useDispatch, useSelector} from 'react-redux';
import {putToStack, setCurrentDir} from '../../../../redux/reducers/fileReducer/fileReducer';

export const File = ({ filePayload }) => {
  const { name, date, size, type, _id } = filePayload;

  const dispatch = useDispatch();

  const currentDir = useSelector(state => state.fileReducer.currentDir);

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString({
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const getCurrentIcon = (type) => (type === 'dir' ? folderImg : fileImg);

  const onFileClick = () => {
    if (type === 'file') return;

    dispatch(putToStack(currentDir));
    dispatch(setCurrentDir(_id));
  };

  return (
    <div>
      <div className={s['list-item']}>
        <img onClick={onFileClick} className={s['file-type-img']} src={getCurrentIcon(type)} alt='file type' />
        <div className={s['name']}>{name}</div>
        <div className={s['date']}>{dateFormat(date)}</div>
        <div className={s['size']}>{size}</div>
        <div className={s['control-btn']}>
          <img src={shareImg} alt='img' />
        </div>
        {type === 'file' && (
          <div className={s['control-btn']}>
            <img src={downloadImg} alt='img' />
          </div>
        )}
        <div className={s['control-btn']}>
          <img src={trashImg} alt='img' />
        </div>
      </div>
    </div>
  );
};
