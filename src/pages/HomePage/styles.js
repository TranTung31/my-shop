import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  height: 50px;
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
