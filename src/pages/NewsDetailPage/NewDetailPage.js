import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as NewService from "../../services/NewService";
import { WrapperNewDetail } from "./styles";

function NewDetailPage() {
  const [dataDetailNew, setDataDetailNew] = useState(null);

  const { id } = useParams();

  const fetchDetailNew = async () => {
    const res = await NewService.getDetailNew(id);
    setDataDetailNew(res?.data);
  };

  useEffect(() => {
    fetchDetailNew();
  }, []);

  return (
    <WrapperNewDetail>
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <h2>Chi tiết bài viết</h2>
        <h3>{dataDetailNew?.title}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: dataDetailNew?.ckeditor }}
        ></div>
      </div>
    </WrapperNewDetail>
  );
}

export default NewDetailPage;
