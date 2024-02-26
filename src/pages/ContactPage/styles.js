import styled from "styled-components";

export const WrapperContact = styled.div`
  width: 1285px;
  margin: 0 auto;
  padding-bottom: 1px;
`;

export const WrapperContactNavigate = styled.div`
  font-size: 1.6rem;
  padding: 14px 0;
`;

export const WrapperContactNavigateHome = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

export const WrapperContactList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
`;

export const WrapperContactItems = styled.div`
  display: flex;
  width: 410px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`;

export const WrapperContactItemsIcon = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #228b22;
  border-radius: 50%;
  font-size: 1.8rem;
  text-align: center;
  color: #fff;
`;

export const WrapperContactItemsContent = styled.div`
  width: calc(100% - 40px);
  padding-left: 10px;
  font-size: 1.6rem;
`;

export const WrapperContactItemsTitle = styled.div`
  font-weight: bold;
`;

export const WrapperContactForm = styled.div`
  & form {
    .ant-form-item {
      .ant-row.ant-form-item-row {
        .ant-col.ant-form-item-label {
          width: 84px;
          text-align: left;
        }
      }
    }
  }
`;
