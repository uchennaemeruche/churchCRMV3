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
  request,
} from "strapi-helper-plugin";
import Row from "../../components/Row";
import Block from "../../components/Block";
import { Select, Label } from "@buffetjs/core";
import { get, has, isEmpty, pickBy, set } from "lodash";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import PropTypes from "prop-types";
import UploadFileForm from "../../components/UploadFileForm";
import { mode } from "../../../../../../node_modules/simple-statistics/index";

const getUrl = (to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

// const HomePage = () => {
//   return <UploadFileForm />;
// };

class HomePage extends Component {
  importSources = [
    { label: "External URL ", value: "url" },
    { label: "Upload file", value: "upload" },
    { label: "Raw text", value: "raw" },
  ];
  state = {
    loading: true,
    modelOptions: [],
    models: [],
    importSource: "upload",
    analyzing: false,
    analysis: null,
    selectContentType: "",
  };

  componentDidMount() {
    this.getModels().then((res) => {
      const { models, modelOptions } = res;
      this.setState({
        models,
        modelOptions,
        selectContentType: modelOptions ? modelOptions[0].value : "",
      });
    });
  }

  getModels = async () => {
    this.setState({ loading: true });

    try {
      const response = await request("/content-type-builder/content-types", {
        method: "GET",
      });

      // Remove non-user content types from models
      const models = get(response, ["data"], []).filter(
        (obj) => !has(obj, "plugin")
      );
      const modelOptions = models.map((model) => {
        return {
          label: get(model, ["schema", "name"], ""), // (name is used for display_name)
          value: model.uid, // (uid is used for table creations)
        };
      });

      this.setState({ loading: false });

      return { models, modelOptions };
    } catch (error) {
      this.setState({ loading: false }, () => {
        strapi.notification.error(`${error}`);
      });
    }

    return [];
  };

  selectImportSource = (importSource) => {
    this.setState({ importSource });
  };

  selectImportDest = (selectContentType) => {
    this.setState({ selectContentType });
  };

  onRequestAnalysis = async (analysisConfig) => {
    this.analysisConfig = analysisConfig;

    this.setState({ analyzing: true }, async () => {
      try {
        const response = await request("/import-content/preAnalyzeImportFile", {
          method: "POST",
          body: analysisConfig,
        });

        this.setState({ analysis: response, analyzing: false }, () => {
          strapi.notification.success(`Analyzed successfully`);
        });
      } catch (error) {
        this.setState({ analyzing: false }, () => {
          strapi.notification.error(`Analysis Failed, try again`);
          strapi.notification.error(`${error}`);
        });
      }
    });
  };
  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
        <PluginHeader
          title={"Import Content"}
          description={"Import CSV and RSS-Feed into your Content Types"}
        />

        <HeaderNav
          links={[
            {
              name: "Import Data",
              to: getUrl(""),
            },
            {
              name: "Import History",
              to: getUrl("history"),
            },
          ]}
          style={{ marginTop: "4.4rem" }}
        />

        <div className="row">
          <Block
            title="General"
            description="Configure the Import Source & Destination"
            style={{ marginBottom: 12 }}
          >
            <Row className={"row"}>
              <div className={"col-4"}>
                <Label htmlFor="importSource">Import Source</Label>
                <Select
                  name="importSource"
                  options={this.importSources}
                  value={this.state.importSource}
                  onChange={({ target: { value } }) =>
                    this.selectImportSource(value)
                  }
                />
              </div>
              <div className={"col-4"}>
                <Label htmlFor="importDest">Import Destination</Label>
                <Select
                  value={this.state.selectedContentType}
                  name="importDest"
                  options={this.state.modelOptions}
                  onChange={({ target: { value } }) =>
                    this.selectImportDest(value)
                  }
                />
              </div>
            </Row>
            <UploadFileForm
              onRequestAnalysis={this.onRequestAnalysis}
              loadingAnalysis={this.state.analyzing}
            />
          </Block>
        </div>
      </div>
    );
  }
}

export default memo(HomePage);
