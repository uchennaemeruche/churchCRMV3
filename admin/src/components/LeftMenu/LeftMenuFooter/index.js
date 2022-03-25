/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import Wrapper, { A } from './Wrapper';

import { Separator } from '../../../containers/HomePage/components';
function LeftMenuFooter({ version }) {
  // PROJECT_TYPE is an env variable defined in the webpack config
  // eslint-disable-next-line no-undef
  const projectType = "CUSTOM";

  return (
    <Wrapper>
      <Separator style={{marginBottom: 10 }} />
      <div className="poweredBy">
        <A key="website" href="/" target="_blank" rel="noopener noreferrer">
          ChurchCRM
        </A>
        &nbsp;
        <A
          href={`https://github.com/strapi/strapi/releases/tag/v${version}`}
          key="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          v{version}
        </A>
        &nbsp;
        <A href="https://strapi.io" target="_blank" rel="noopener noreferrer">
          — {projectType} Edition
        </A>
      </div>
    </Wrapper>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default LeftMenuFooter;
