import styled from 'styled-components';

// color: ${props => props.theme.main.colors.leftMenu['link-color']};
const A = styled.a`
  display: flex;
  position: relative;
  padding-top: 1rem;
  padding-bottom: 0.2rem;
  padding-left: 1.6rem;
  min-height: 3.6rem;
  line-height: 1.8rem;
  border-left: 0.3rem solid transparent;
  border-radius:4px;
  cursor: pointer;

  color:#666687;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;

  &:hover {
    color: ${props => props.theme.main.colors.white};
    background: #f6f6f9;
    border-left: 0.3rem solid ${props => props.theme.main.colors.strapi.blue};
    text-decoration: none;
  }

  &:focus {
    color: ${props => props.theme.main.colors.white};
    text-decoration: none;
  }

  &:visited {
    color: ${props => props.theme.main.colors.leftMenu['link-color']};
  }

  &.linkActive {
    color: #007eff !important;
    border-left: 0.3rem solid ${props => props.theme.main.colors.strapi.blue};
    background: #f0f0ff !important;
    font-weight:500;
  }
`;

export default A;
