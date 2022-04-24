import styled from "styled-components";

const Row = styled.div `
  padding-top: 18px;

  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    .pb-18 {
      padding-bottom: 18px;
    }
  }
`;

export default Row;
