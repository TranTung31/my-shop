import { Upload } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
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
`;

export const WrapperButtonComponent = styled(ButtonComponent)`
  background-color: #fff;
  margin-left: 20px;
  border: 1px solid #d9d9d9;

  span {
    color: #000;
    font-weight: 600;
  }

  & :hover {
    color: #007fff;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  `;
