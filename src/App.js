import React, { useState } from "react";
import { Main } from "./styled";
import Image from "../src/Image";
import { Upload, Card } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

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
  console.log("state?.file", state?.finger_position);

  return (
    <Main>
      <div className="image">
        <div className="item">
          <div style={{ marginBottom: "5px" }}>Ảnh mẫu</div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            onChange={handleChange}
            accept=".png,.jpg,.jpeg,.bmp"
            customRequest={({ onSuccess }) => {
              onSuccess(null, {});
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="item" style={{ paddingLeft: "30px" }}>
          <div style={{ marginBottom: "5px" }}>Ảnh khớp</div>
          <Image width={200} height={200} src={state?.file || "error"} />
        </div>
      </div>

      <Card title="Thông tin">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Tên</p> :{" "}
          <b  style={{ paddingLeft: "10px" }}>{state?.person_name}</b>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p >Hand</p> :{" "}
          <b style={{ paddingLeft: "10px" }}>{state?.finger_position?.split("_")?.[1]}</b>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p >Position</p> :{" "}
          <b style={{ paddingLeft: "10px" }}>{state?.finger_position?.split("_")?.[2]}</b>
        </div>
      </Card>
    </Main>
  );
};

export default HomePage;
