import React, { useState } from "react";
import { Main } from "./styled";
import Image from "../src/Image";
import { Upload, Card, Tabs } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Search from "../src/Search";
import Map from "../src/Map";
import "./App.css"
const { TabPane } = Tabs;

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [state, _setState] = useState({
    file: "",
    finger_position: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      var bodyFormData = new FormData();
      bodyFormData.append("inputfile", info.file.originFileObj);
      axios({
        method: "post",
        url: "https://fingers-api.vnest.vn/identify_fingerprint/demo",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          const data = response?.data;
          setState({
            file: data?.data?.image_url,
            person_name: data?.data?.person_name,
            finger_position: data?.data?.finger_position,
            image_name: data?.data?.image_name,
          });
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Tabs defaultActiveKey={"0"}>
      <TabPane tab="Searching" key={0} style={{ fontSize: "25px" }}>
        <Search />
      </TabPane>
      <TabPane tab="Matching" key={1} style={{ fontSize: "25px" }}>
        <Map />
      </TabPane>
    </Tabs>
  );
};

export default HomePage;
