import styled from "styled-components";

export const WrapperNewsNavigate = styled.div`
  font-size: 1.6rem;
  padding: 14px 0;
`;

export const WrapperNewsNavigateHome = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

export const WrapperNews = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`;

export const WrapperNewsList = styled.div`
  width: 50%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WrapperNewsItem = styled.div`
  border: 2px solid #e8e8e8;
  border-radius: 16px;
  padding: 24px;
`;

export const WrapperNewsItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperNewsItemHeaderAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;

export const WrapperNewsItemBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
`;

export const WrapperNewsItemBodyInfo = styled.div`
  padding-right: 10px;
`;

export const WrapperNewsItemThumb = styled.div`
  img {
    width: 200px;
    max-height: 120px;
    border-radius: 15px;
    display: block;
    object-fit: cover;
    overflow: hidden;
  }
`;
