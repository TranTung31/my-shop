import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  height: 50px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    background-color: rgb(0, 96, 255);
    span {
      color: #fff;
    }
  }
`;
