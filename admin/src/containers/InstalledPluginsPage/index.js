import React from "react";
import { useGlobalContext, request } from "strapi-helper-plugin";
import { Header, List } from "@buffetjs/custom";
import PageTitle from "../../components/PageTitle";
import ContainerFluid from "../../components/ContainerFluid";
import ListWrapper from "./ListWrapper";
import Row from "./Row";
import generateRows from "./utils/generateRows";

const InstalledPluginsPage = () => {
  const { formatMessage, plugins } = useGlobalContext();
  const onConfirm = async (id) => {
    try {
      const requestUrl = `/admin/plugins/uninstall/${id}`;
      // Force the Overlayblocker to be displayed
      const overlayblockerParams = {
        enabled: true,
        title: "app.components.ListPluginsPage.deletePlugin.title",
        description: "app.components.ListPluginsPage.deletePlugin.description",
      };
      // Lock the app
      strapi.lockApp(overlayblockerParams);
      const response = await request(
        requestUrl,
        { method: "DELETE" },
        overlayblockerParams
      );

      if (response.ok) {
        // Reload the app
        window.location.reload();
      }
    } catch (err) {
      strapi.unlockApp();
      strapi.notification.toggle({
        type: "warning",
        message: { id: "app.components.listPluginsPage.deletePlugin.error" },
      });
    }
  };

  const rows = generateRows(plugins, onConfirm);

  return <div>Hello teverone</div>;
};

export default InstalledPluginsPage;
