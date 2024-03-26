import React, { useEffect } from "react";

// import Layout from "app/Layout";
import LayoutLogin from "./LayoutLogin";
import { ConfigProvider } from "antd";
import { Switch, Route } from "react-router-dom";
import { pink } from "themes";
import { ThemeProvider } from "styled-components";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { GlobalStyle } from "./styled";

const App = ({ ...props }) => {
  
  return (
    <ThemeProvider theme={pink}>
      <GlobalStyle />
      <ConfigProvider>
        <Switch>
          <Route path={"/"} component={Layout} />
        </Switch>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
