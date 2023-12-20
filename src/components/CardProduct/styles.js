import { Card } from "antd";
import { styled } from "styled-components";

export const WrapperCardStyle = styled(Card)`
  width: 200px;
  & img {
    width: 200px;
    height: 200px;
    position: relative;
  }
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyleNameProduct = styled.span`
  font-size: 1.2rem;
`;

export const WrapperReportProduct = styled.div`
  display: flex;
`;

export const WrapperPriceProduct = styled.span`
  font-size: 1.6rem;
  color: #ff424e;
  font-weight: 500;
`;

export const WrapperPriceDiscount = styled.span`
  font-size: 1.2rem;
  color: #ff424e;
  margin-left: 6px;
  font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 1.4rem;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
