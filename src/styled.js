import styled from "styled-components";

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
      .ant-upload {
        height: 206px;
        width: 192px;
        object-fit: contain;
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
    .ant-card-head {
      margin-bottom: 0px !important;
    }
  }
  .ant-upload-list-item-container {
    height: 206px !important;
    width: 192px !important;
    object-fit: contain;
  }
`;
