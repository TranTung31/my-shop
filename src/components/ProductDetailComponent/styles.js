import { Image, InputNumber } from "antd";
import { styled } from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperImageProductSmall = styled(Image)``;

export const WrapperStyleTextHeader = styled.h1`
  margin: 0;
  color: rgb(39, 39, 42);
  font-size: 2rem;
  font-weight: 500;
  word-break: break-word;
  white-space: break-spaces;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 1.6rem;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperCurrentPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  color: #d51c24;
  line-height: 150%;
`;

export const WrapperDetailBook = styled.div`
  margin-top: 10px;
  font-size: 1.6rem;
`;

export const WrapperCurrentAddress = styled.div`
  font-size: 1.6rem;
  color: rgb(39, 39, 42);
  margin-top: 10px;
  span.address {
    color: #d51c24;
    text-decoration: underline;
    font-weight: 600;
  }
  span.change-address {
    cursor: pointer;
    font-weight: 600;
    color: rgb(10, 104, 255);
  }
`;

export const WrapperTextQuantity = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
`;

export const WrapperIcon = styled.div`
  margin-left: 8px;
`;
