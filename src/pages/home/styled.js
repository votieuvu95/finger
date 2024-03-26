import styled from "styled-components";
import background from "assets/images/background.jpg";

export const Main = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  background-color: #fff;
  .image {
    display: flex;
    .item {
      text-align: center;
      .ant-upload.ant-upload-select-picture-card {
        height: 200px;
        width: 200px;
      }
    }
  }
  .ant-card-bordered {
    border: 1px solid #000;
    margin-top: 20px;
  }
  .ant-card {
    .ant-card-body {
      border-top: 1px solid;
    }
  }
`;
