/**
 *
 * Wrapper
 *
 */

import styled from "styled-components";
import PropTypes from "prop-types";

// background: ${props => props.theme.main.colors.strapi['blue-darker']};
const Wrapper = styled.div`
  position: fixed;
  float: left;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(props) => props.theme.main.sizes.leftMenu.width};
  background: rgb(255, 255, 255);

  @media screen and (max-width: 768px) {
    /* width: 4rem; */
    left: ${(props) => (props.isNavExpanded ? 0 : "-900px")};
    transition: left 500ms ease-in-out;
    z-index: 3000;
  }

  /* scrollbar overrides */
  * {
    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track:hover {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.main.colors.leftMenu["title-color"]};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) =>
        props.theme.main.colors.leftMenu["link-color"]};
    }

    /* firefox */
    scrollbar-color: ${(props) =>
        props.theme.main.colors.leftMenu["title-color"]}
      transparent;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        strapi: {},
      },
      sizes: {
        header: {},
        leftMenu: {},
      },
    },
  },
};

Wrapper.propTypes = {
  theme: PropTypes.object,
};

export default Wrapper;
