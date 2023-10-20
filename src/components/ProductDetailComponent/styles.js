import { Image, InputNumber } from "antd";
import { styled } from "styled-components";

export const WrapperImageProductSmall = styled(Image)`
  // width: 64px;
  // height: 64px;
`;

export const WrapperStyleTextHeader = styled.h1`
  margin: 0;
  color: rgb(39, 39, 42);
  font-size: 2rem;
  font-weight: 500;
  word-break: break-word;
  white-space: break-spaces;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 1.4rem;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperCurrentPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 150%;
  margin-top: 20px;
`;

export const WrapperCurrentAddress = styled.div`
  font-size: 1.6rem;
  color: rgb(39, 39, 42);
  margin-top: 20px;
  span.address {
    text-decoration: underline;
    font-weight: 600;
  }
  span.change-address {
    font-weight: 600;
    color: rgb(10, 104, 255);
  }
`;

export const WrapperTextQuantity = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number-handler-wrap {
    display: none;
  }
`;

export const WrapperIcon = styled.div`
  margin-left: 8px;
`;
