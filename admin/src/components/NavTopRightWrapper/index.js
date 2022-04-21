import styled from "styled-components";

const NavTopRightWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  z-index: 1050;

  @media screen and (max-width: 768px) {
    /* position: absolute;
    display: none;
    */
  }
`;

export default NavTopRightWrapper;
