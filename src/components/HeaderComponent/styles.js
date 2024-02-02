import Search from "antd/es/input/Search";
import { styled } from "styled-components";

export const WrapperHeader = styled.div`
  width: 1285px;
  height: 70px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    background-color: #189eff;
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
  gap: 30px;
`;

export const WrapperCart = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const WrapperSearch = styled(Search)`
  & .ant-input-wrapper .ant-input-affix-wrapper {
    width: 300px;
  };
  & .ant-input-wrapper .ant-input-group-addon .ant-btn {
    background-color: #1465d6;
  }
`;
