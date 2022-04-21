import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  overflow-x: hidden;

  p,
  span {
    font-family: Lato;
  }

  .adminPageRightWrapper {
    width: ${(props) =>
      `calc(100% - ${props.theme.main.sizes.leftMenu.width})`};

    @media screen and (max-width: 768px) {
      .collapse.show form div {
        display: flex;
        flex-wrap: wrap;
      }
      .container-fluid {
        width: 100vw !important;
        padding-left: 0 !important;

        .col-12 {
          width: 400px;
          overflow: scroll;
        }

        table.table {
          table-layout: auto;
        }

        .sticky-wrapper .row {
          flex-wrap: inherit;
          margin-left: 0 !important;
          overflow: auto;

          .header-title ~ div {
            padding-left: 0;

            button {
              white-space: inherit;
              height: auto;
            }
          }
        }
      }
      .container-fluid:last-child {
        padding-left: 15px;
      }
    }
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      sizes: {
        leftMenu: {},
      },
    },
  },
};

export default Wrapper;
