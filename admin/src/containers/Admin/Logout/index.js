/**
 *
 * Logout
 *
 */

/* eslint-disable */
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get } from "lodash";
import { auth } from "strapi-helper-plugin";
import Wrapper from "./components";

const Logout = ({ history: { push } }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleGoToMe = () => {
    push({
      pathname: `/me`,
    });
  };

  const handleLogout = () => {
    auth.clearAppStorage();
    push("/auth/login");
  };


  const toggle = () => setIsOpen((prev) => !prev);

  const userInfo = auth.getUserInfo();
  const displayName =
    userInfo && userInfo.firstname && userInfo.lastname
      ? `${userInfo.firstname} ${userInfo.lastname}`
      : get(userInfo, "username", "");

  return (
    <Wrapper>
      {/* <CustomNavToggle>
        <button
          className={`hamburger ${isNavExpanded ? "turn-blue" : "turn-red"}`}
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </CustomNavToggle> */}
      <ButtonDropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
          {displayName}
          <FontAwesomeIcon icon="caret-down" />
        </DropdownToggle>
        <DropdownMenu className="dropDownContent">
          <DropdownItem onClick={handleGoToMe} className="item">
            <FormattedMessage id="app.components.Logout.profile" />
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            <FormattedMessage id="app.components.Logout.logout" />
            <FontAwesomeIcon icon="sign-out-alt" />
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </Wrapper>
  );
};

export default withRouter(Logout);
