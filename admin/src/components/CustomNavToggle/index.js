import styled from "styled-components";

const CustomNavToggle = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (!props.isNavExpanded ? 0 : "21rem")};
  display: flex;
  z-index: 2050;
  transition: 500ms ease-in-out;

  .hamburger {
    border: 0;
    height: 40px;
    width: 40px;
    padding: 0.5rem;
    border-radius: 50%;
    display: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    position: absolute;
    transform: translateY(-50%);
    margin-top: 20px;

    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  .hamburger:hover {
    // background-color: #fff;
  }

  svg{
    transform: ${(props) => props.isNavExpanded && 'rotate(180deg)'};
     transition: 500ms ease-in-out;
  }
`;

export default CustomNavToggle;
