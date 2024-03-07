import styled from "styled-components";

export const WrapperProductsScroll = styled.div`
  padding: 20px 0px;
  display: grid;
  gap: 17px;
  overflow: hidden;
  transition: all 0.3 linear;
  scroll-behavior: smooth;
`;

export const WrapperButtonLeft = styled.div`
  font-size: 18px;
  position: absolute;
  width: 40px;
  height: 40px;
  color: white;
  background-color: rgb(24, 158, 255);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  top: 50%;
  left: -20px;
  transform: translateY(-30px);
  z-index: 10;

  &:hover {
    cursor: pointer;
    background-color: #74b9ff;
    transition: 0.3s;
  }
`;

export const WrapperButtonRight = styled.div`
  font-size: 18px;
  position: absolute;
  width: 40px;
  height: 40px;
  color: white;
  background-color: rgb(24, 158, 255);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  top: 50%;
  right: -20px;
  transform: translateY(-30px);
  z-index: 10;

  &:hover {
    cursor: pointer;
    background-color: #74b9ff;
    transition: 0.3s;
  }
`;
