import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 0;
  height: 80px;
  align-items: center;
  width: 1285px;
`;

export const WrapperLogo = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
`;

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  padding: 12px;
  margin: 0;
  &:hover {
    background-color: #007fff;
    color: #fff;
  }
`;

export const WrapperUser = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapperUserText = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-left: 6px;
  cursor: pointer;
`;

export const WrapperUserAll = styled.div`
  display: flex;
  align-items: center;
  margin-left: 28px;
`;

export const WrapperCart = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;
