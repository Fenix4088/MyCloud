import React from 'react';
import s from '../Disk/Disk.module.scss';
import { withRedirect } from '../../hoc/withRedirect';

const Disk = () => {
  return <div>
    <h1>DISK</h1>
  </div>;
};

export default withRedirect(Disk, false);
