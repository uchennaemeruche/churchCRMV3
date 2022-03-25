/**
 *
 * SocialLink
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Instagram from '../../assets/images/instagram.png';
import Twitter from '../../assets/images/social_twitter.png';
import Mixlr from '../../assets/images/mixlr1.png';
import Strapi from '../../assets/images/social_strapi.png';

import { SocialLinkWrapper } from './components';

function getSrc(name) {
  switch (name) {
    case 'Instagram':
      return Instagram;
    case 'Mixlr':
      return Mixlr;
    case 'Twitter':
      return Twitter;
    case 'Blog':
      return Strapi;
    default:
      return Strapi;
  }
}

const SocialLink = ({ link, name }) => {
  return (
    <SocialLinkWrapper className="col-6">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={getSrc(name)} alt={name} />
        <span>{name}</span>
      </a>
    </SocialLinkWrapper>
  );
};

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(SocialLink);
