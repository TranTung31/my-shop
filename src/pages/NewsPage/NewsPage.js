import { EllipsisOutlined, CalendarOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as NewService from "../../services/NewService";
import {
  WrapperNews,
  WrapperNewsItem,
  WrapperNewsItemBody,
  WrapperNewsItemBodyInfo,
  WrapperNewsItemHeader,
  WrapperNewsItemHeaderAuthor,
  WrapperNewsItemThumb,
  WrapperNewsList,
  WrapperNewsNavigate,
  WrapperNewsNavigateHome,
} from "./styles";
import { convertDate } from "../../utils/utils";

function NewsPage() {
  const [dataNew, setDataNew] = useState([]);
  const [pageValue, setPageValue] = useState(1);
  const [totalNew, setTotalNew] = useState(1);
  const [isLoadingNew, setIsLoadingNew] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataNew = async () => {
      setIsLoadingNew(true);
      const res = await NewService.getNew(pageValue, 5);
      console.log("🚀 ~ fetchDataNew ~ res:", res);
      setDataNew(res?.data);
      setTotalNew(res?.totalNew);
      setIsLoadingNew(false);
    };

    fetchDataNew();
  }, [pageValue]);

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <WrapperNews>
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <WrapperNewsNavigate>
          <WrapperNewsNavigateHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperNewsNavigateHome>
          <span> -- Tin tức</span>
        </WrapperNewsNavigate>
        <LoadingComponent isLoading={isLoadingNew}>
          <WrapperNewsList>
            {dataNew.map((item, index) => (
              <WrapperNewsItem>
                <WrapperNewsItemHeader>
                  <WrapperNewsItemHeaderAuthor>
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/blog_posts/9976/65fa652ce3a64.jpg"
                      alt=""
                    />
                    <span>Admin</span>
                  </WrapperNewsItemHeaderAuthor>
                  <div style={{ cursor: "pointer" }}>
                    <EllipsisOutlined style={{ fontSize: "20px" }} />
                  </div>
                </WrapperNewsItemHeader>
                <WrapperNewsItemBody
                  onClick={() => navigate(`/new-detail/${item._id}`)}
                >
                  <WrapperNewsItemBodyInfo>
                    <h2>{item.title}</h2>
                    <div style={{ fontSize: "1.6rem" }}>
                      <span><CalendarOutlined /> {convertDate(item.createdAt)}</span>
                    </div>
                  </WrapperNewsItemBodyInfo>
                  <WrapperNewsItemThumb>
                    <img src={item.image} alt="" />
                  </WrapperNewsItemThumb>
                </WrapperNewsItemBody>
                <WrapperNewsItemBody></WrapperNewsItemBody>
              </WrapperNewsItem>
            ))}
          </WrapperNewsList>
        </LoadingComponent>
        <div style={{ marginBottom: "20px" }}>
          <Pagination
            defaultCurrent={pageValue}
            total={totalNew}
            pageSize={5}
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </WrapperNews>
  );
}

export default NewsPage;
