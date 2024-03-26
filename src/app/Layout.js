import React, { useState } from "react";
import { Layout } from "antd";
import Pages from "pages";
import { MainPage } from "./styled";
const { Content } = Layout;

const LayoutLogin = () => {
  const [state, _setState] = useState({ collapsed: true });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onClickIcon = (data) => {
    setState({ collapsed: !state.collapsed });
  };
  return (
    <MainPage>
      <Pages />
    </MainPage>
  );
};
export default LayoutLogin;
