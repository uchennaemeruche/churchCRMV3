/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import Broadcast from "../../components/broadcast/index";

const HomePage = () => {
  // return (
  //   <div>
  //     <h1>Message Broadcast</h1>
  //     <p>Custom broadcast message via sms and whatsapp</p>
  //   </div>
  // );
  return <Broadcast />;
};

export default memo(HomePage);
