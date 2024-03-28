import React, { useState } from "react";
import { Main } from "./styled";
import Image from "../src/Image";
import { Upload, Card, Tabs } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);
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
      setFileList(info.fileList);
      if (info.fileList.length === 2) {
        var bodyFormData = new FormData();
        bodyFormData.append("sample1", info.fileList[0].originFileObj);
        bodyFormData.append("sample2", info.fileList[1].originFileObj);
        axios({
          method: "post",
          url: "https://fingers-api.vnest.vn/identify_fingerprint/matching",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            const data = response?.data;
            setState({
              file: data?.data?.matching_image,
              match: data?.data?.match,
            });
            //handle success
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      }

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
    <Main>
      <div className="image">
        <div className="item">
          <div style={{ marginBottom: "5px" }}>Ảnh mẫu</div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            onChange={handleChange}
            accept=".png,.jpg,.jpeg,.bmp"
            customRequest={({ onSuccess }) => {
              onSuccess(null, {});
            }}
          >
            {fileList.length > 1 ? null : uploadButton}
          </Upload>
        </div>
      </div>
      {fileList.length === 2 && (
        <Card
          title={state?.match ? "Khớp" : "Không khớp"}
          bodyStyle={{ display: !state?.match ? "none" : "" }}
        >
          {state?.match ? (
            <div className="item" style={{ paddingLeft: "30px" }}>
              <Image width={192} height={206} src={state?.file || "error"} />
            </div>
          ) : null}
        </Card>
      )}
    </Main>
  );
};

export default Search;
