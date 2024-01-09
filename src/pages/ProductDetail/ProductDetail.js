import { useNavigate, useParams } from "react-router-dom";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { WrapperTitle, WrapperTitleHomePage } from "./styles";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { id: idProduct } = useParams();

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#efefef",
      }}
    >
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperTitle>
          <WrapperTitleHomePage onClick={() => navigate("/")}>
            Trang chủ
          </WrapperTitleHomePage>
          <span> -- Chi tiết sản phẩm</span>
        </WrapperTitle>
        <ProductDetailComponent id={idProduct}/>
      </div>
    </div>
  );
};

export default ProductDetail;
