import React from 'react';
import s from './File.module.scss';
import folderImg from '../../../../assets/img/fxemoji_filefolder.svg';
import fileImg from '../../../../assets/img/flat-color-icons_file.svg';
import shareImg from '../../../../assets/img/share.svg';
import trashImg from '../../../../assets/img/trash.svg';
import downloadImg from '../../../../assets/img/download.svg';

export const File = ({ filePayload }) => {
  const { name, date, size, type } = filePayload;

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString({
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const getCurrentIcon = (type) => (type === 'dir' ? folderImg : fileImg);

  return (
    <div>
      <div className={s['list-item']}>
        <img className={s['file-type-img']} src={getCurrentIcon(type)} alt='file type' />
        <div className={s['name']}>{name}</div>
        <div className={s['date']}>{dateFormat(date)}</div>
        <div className={s['size']}>{size}</div>
        <div className={s['control-btn']}>
          <img src={shareImg} alt='img' />
        </div>
        {type === 'file' && <div className={s['control-btn']}>
          <img src={downloadImg} alt='img' />
        </div>}
        <div className={s['control-btn']}>
          <img src={trashImg} alt='img' />
        </div>
      </div>
    </div>
  );
};
