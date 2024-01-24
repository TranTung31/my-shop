import { styled } from "styled-components";

export const WrapperProducts = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const WrapperPublisher = styled.div``;

export const WrapperItemPublisher = styled.div`
  margin-right: 10px;
  height: 32px;
  line-height: 32px;
  background-color: rgb(240, 248, 255);
  padding: 0px 12px;
  border: 1px solid rgb(26, 148, 255);
  border-radius: 100px;
  color: rgb(11, 116, 229);
`;

export const WrapperNavbar = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-right: 10px;
`;

export const WrapperTitleText = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: #27272a;
  margin: 0;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
`;

export const WrapperItemCategory = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 14px;
  padding: 5px 0;
  color: #38383d;
`;

export const WrapperPriceText = styled.div`
  font-size: 1.4rem;
  border-radius: 10px;
  background-color: rgb(238, 238, 238);
  width: fit-content;
  padding: 6px;
`;
