import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Dropdown } from "antd";

export const WrapperTypeProduct = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  height: 50px;
`;

export const WrapperDropdown = styled(Dropdown)`
  height: 100%;
  font-size: 1.6rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #189eff;
  }
`;

export const WrapperNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.6rem;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  &:hover {
    color: #fff;
    background-color: #189eff;
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const WrapperButtonComponent = styled(ButtonComponent)`
  &:hover {
    background-color: rgb(0, 96, 255);

    span {
      color: ${(props) => (props.disabled ? "#99999c" : "#fff")};
    }
  }
  width: 240px;
  height: 38px;
  color: rgb(0, 96, 255);
  border-radius: 6px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 20px;
  border: ${(props) =>
    props.disabled ? "1px solid #ccc" : "1px solid #0060ff"};
`;
