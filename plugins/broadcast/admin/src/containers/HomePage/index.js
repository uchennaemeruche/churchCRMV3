/*
 *
 * HomePage
 *
 */

import React, { memo, Component } from "react";

import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader,
} from "strapi-helper-plugin";

import {
  InputText,
  Select,
  Label,
  Button,
  List,
  Textarea,
} from "@buffetjs/core";

import Row from "../../../../../commons/component/Row";
import Block from "../../../../../commons/component/Block";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import Broadcast from "../../components/broadcast/index";
import axios from "axios";
import Value from "../../../../../../.cache/admin/src/components/Roles/ConditionsModal/ConditionsSelect/SingleValue";

// const HomePage = () => {
//   // return (
//   //   <div>
//   //     <h1>Message Broadcast</h1>
//   //     <p>Custom broadcast message via sms and whatsapp</p>
//   //   </div>
//   // );
//   return <Broadcast />;
// };

const port = 1337;

const getUrl = (to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

const sendBroadcasts = [
  {
    sender: "RCCG Cop",
    recipients: "All Members",
    text: "Hello everyone, good evening",
  },
  {
    sender: "RCCG Cop",
    recipients: "Youth",
    text: "YAYA Leap 2022",
  },
];

const defaultMessages = [
  {
    message: "Hello there 1",
    category: "Birthday",
  },
  {
    message: "Hi there 1",
    category: "Digging Deep",
  },
];
class HomePage extends Component {
  state = {
    sender: "",
    message: "",
    recipient_categories: [
      { label: "Select Category", value: "select" },
      { label: "All Members", value: "all" },
      { label: "Natural Groups", value: "natural_group" },
      { label: "Ministers", value: "ministers" },
      { label: "Departments/Units", value: "department" },
      { label: "All Workers", value: "workers" },
      { label: "Custom Recipients", value: "custom_recipients" },
    ],
    selectedCategory: "",
    show_subcategory: false,
    isCustomRecipient: false,
    recipient_subcategory: [],
    selectedRecipient: "All Members",
    history: sendBroadcasts,
    isBroadcasting: false,
    messageTemplates: [{ label: "Select Message Template", value: "select" }],
    selectedTemplate: "",
    customRecipient: "",
    formErrors: [],
  };

  setRecipient = (recipient) => {
    this.setState({
      show_subcategory: false,
      isCustomRecipient: false,
    });
    if (recipient === "custom_recipients") {
      this.setState({
        isCustomRecipient: true,
        selectedRecipient: recipient,
        selectedCategory: recipient,
      });
    } else if (recipient === "department" || recipient === "natural_group") {
      this.loadRecipients(
        recipient === "department" ? "departments" : "natural-groups"
      ).then((response) => {
        const res = response.map((res) => {
          return { label: res.name, value: res.id };
        });
        const newArr = [
          { label: "Select Subcategory", value: "select" },
          ...res,
        ];
        this.setState({
          recipient_subcategory: newArr,
          show_subcategory: true,
        });
      });
      // this.setState({ show_subcategory: true });
      this.setState({ selectedCategory: recipient });
    } else {
      this.setState({
        selectedRecipient: recipient,
        selectedCategory: recipient,
      });
    }
  };

  setMessageTemplate = (template) => {
    this.setState({ selectedTemplate: template });
  };

  sendBroadcastMessage = async () => {
    this.setState({ isBroadcasting: true });

    // setTimeout(() => {
    //   this.setState({ isBroadcasting: false });
    //   strapi.notification.success(
    //     `Broadcast successfully ${this.state.sender} -  ${this.state.selectedRecipient} -  ${this.state.selectedTemplate}`
    //   );
    // }, 1000);

    const payload = {
      sender: this.state.sender,
      recipients:
        this.state.selectedRecipient == "custom_recipients"
          ? this.state.customRecipient
          : this.state.selectedRecipient,
      message: this.state.selectedTemplate,
      // isCustomRecipient: this.state.selectedRecipient == "custom_recipients",
      recipientCategory: this.state.selectedCategory,
    };

    // const errors = this.state.formErrors;

    // if (payload.sender == "") errors.push("Sender address cannot be empty");
    // if (payload.message == "" || payload.message.includes("select"))
    //   errors.push("Enter a valid message to broadcast");
    // if (
    //   payload.recipients == "" ||
    //   payload.recipients.toLowerCase().includes("select")
    // )
    //   errors.push("Select a valid recipient");

    // if (errors.length >= 1) {
    //   return errors.forEach((error) => {
    //     return strapi.notification.error(`${error}`);
    //   });
    // }

    axios.post("http://localhost:1337/broadcast", payload).then(
      (response) => {
        console.log(response);
        strapi.notification.error(` Res: ${response}`);
      },
      (error) => {
        console.log(error);
        strapi.notification.error(`Err: ${error.toString()}`);
        strapi.notification.error(`Msg: ${error.message}`);
        strapi.notification.error(`Data1: ${error.data}`);
        strapi.notification.error(`Data: ${error.data.toString()}`);
      }
    );
  };

  loadRecipients = async (model) => {
    return axios
      .get(`http://localhost:${port}/${model}`)
      .then((response) => response.data);
  };
  getMessageTemplates = async () => {
    return axios
      .get(`http://localhost:${port}/broadcast-templates`)
      .then((response) => response.data);
  };

  componentDidMount() {
    this.getMessageTemplates()
      .then((messages) => {
        const msgs = messages.map((msg) => {
          return { label: msg.message, value: msg.message };
        });
        const newArr = [...this.state.messageTemplates, ...msgs];
        newArr.push({ label: "Custom Message", value: " " });
        this.setState({
          messageTemplates: newArr,
        });
      })
      .catch((err) => {
        strapi.notification.error(`Err: ${err}`);
      });
  }

  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
        <PluginHeader
          title={"Broadcast Message"}
          description={
            "Complete the form below to broadcast your message to recipients"
          }
        />

        <HeaderNav
          links={[
            {
              name: "New Broadcast",
              to: getUrl(""),
            },
            {
              name: "Broadcast History",
              to: getUrl("history"),
            },
          ]}
          style={{ marginTop: "4.4rem" }}
        />

        <div className="row">
          <Block
            title="General"
            description="Set broadcast parameters"
            style={{ marginBottom: 12 }}
          >
            <Row className={"row"}>
              <div className={"col-6"}>
                {/* <Label htmlFor="sender">Set Sender Address</Label> */}
                <InputText
                  name="sender"
                  value={this.state.sender}
                  placeholder="Enter Sender Address - E.g RCCG CoP"
                  type="text"
                  onChange={({ target: { value } }) =>
                    this.setState({ sender: value })
                  }
                />
              </div>
              <div className={"col-6"}>
                {/* <Label htmlFor="recipients">Recipients</Label> */}
                <Select
                  value={this.state.selectedCategory}
                  name="recipients"
                  options={this.state.recipient_categories}
                  onChange={({ target: { value } }) => this.setRecipient(value)}
                />
              </div>
            </Row>
            {this.state.show_subcategory && (
              <Row className={"row"}>
                <div className={"col-6"}>
                  {/* <Label htmlFor="recipients">Select Sub Category</Label> */}
                  <Select
                    value={this.state.selectedRecipient}
                    name="recipients"
                    options={this.state.recipient_subcategory}
                    onChange={({ target: { value } }) =>
                      this.setState({ selectedRecipient: value })
                    }
                  />
                </div>
              </Row>
            )}

            {this.state.isCustomRecipient && (
              <Row className={"row"}>
                <div className={"col-12"}>
                  <Textarea
                    type="text"
                    name="recipients"
                    placeholder="Custom Recipients -  Enter comma-separated phone numbers."
                    onChange={({ target: { value } }) =>
                      this.setState({ customRecipient: value })
                    }
                    value={this.state.customRecipient}
                  />
                </div>
              </Row>
            )}

            <Row className={"row"}>
              <div className={"col-12"}>
                {/* <Label htmlFor="templates">Select Template</Label> */}
                <Select
                  value={this.state.selectedTemplate}
                  name="messageTemplates"
                  options={this.state.messageTemplates}
                  onChange={({ target: { value } }) =>
                    this.setMessageTemplate(value)
                  }
                />
              </div>
            </Row>

            <Row className={"row"}>
              <div className={"col-12"}>
                <Textarea
                  type="text"
                  name="selectedTemplate"
                  placeholder="Message to Broadcast"
                  onChange={({ target: { value } }) =>
                    this.setState({ selectedTemplate: value })
                  }
                  value={this.state.selectedTemplate}
                />
              </div>
            </Row>

            <Row className={"row"}>
              <div className={"col-12"}>
                <Button
                  label={"Send Broadcast"}
                  color={"secondary"}
                  onClick={this.sendBroadcastMessage}
                >
                  {this.state.isBroadcasting && (
                    <LoadingIndicator
                      animationTime="0.6s"
                      borderWidth="4px"
                      borderColor="#f3f3f3"
                      borderTopColor="#555555"
                      size="26px"
                    />
                  )}
                </Button>
              </div>
            </Row>
          </Block>
        </div>
        <Row className="row">
          <List items={this.state.history} />
        </Row>
      </div>
    );
  }
}

export default memo(HomePage);
