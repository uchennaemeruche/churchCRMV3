import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';
import { Separator } from '../../../containers/HomePage/components';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <span className="projectName" />
    </Link>
     <Separator style={{ marginTop: 0, marginBottom: 10 }} />
  </Wrapper>
);

export default LeftMenuHeader;
