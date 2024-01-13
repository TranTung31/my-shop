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
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WrapperReportProduct = styled.div`
  display: flex;
`;

export const WrapperPriceProduct = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-weight: 500;
  color: #ff424e;
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

export const WrapperStyleDiscount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 1.6rem;
  font-weight: 400;
  color: #fff;
  background-color: #d51c24;
  border-radius: 50%;
`;
