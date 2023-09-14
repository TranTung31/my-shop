import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 0;
  height: 80px;
  align-items: center;
  width: 1285px;
`;

export const WrapperLogo = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
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
