import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 0 auto;
  padding: 30px;
  gap: 30px;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapperLable = styled.span`
  font-size: 1.6rem;
  text-align: left;
  width: 70px;
`;

export const WrapperUpload = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`
