import styled from "styled-components";
import PropTypes from "prop-types";

import Logo from "../../../assets/images/rccg_logo.jpeg";

// background-color: ${props => props.theme.main.colors.leftMenu['background-header-link']};
// color: $white;
const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  padding-left: 2rem;
  height: ${(props) => props.theme.main.sizes.leftMenu.height};

  .leftMenuHeaderLink {
    &:hover {
      text-decoration: none;
    }
  }

  .projectName {
    display: block;
    width: 100%;
    height: ${(props) => props.theme.main.sizes.leftMenu.height};
    font-size: 2rem;
    letter-spacing: 0.2rem;
    color: rgb(50, 50, 77);

    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: auto 2.5rem;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        leftMenu: {},
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
