import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import favicon from '../../assets/images/rccg_logo.jpeg';
const customTitle = "ChurchCRM"

const PageTitle = ({ title }) => (
  <Helmet title={customTitle} link={[{ rel: 'icon', type: 'image/jpeg', href: favicon }]} />
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(PageTitle);
