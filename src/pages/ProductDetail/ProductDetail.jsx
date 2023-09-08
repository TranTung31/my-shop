import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetail = () => {
  return (
    <div
      style={{
        padding: "0 120px",
        backgroundColor: "#efefef",
        height: "2000px",
      }}
    >
      <span style={{ fontSize: "1.6rem", color: "rgb(128, 128, 137)", padding: '10px 0' }}>
        Trang chủ
      </span>
      <ProductDetailComponent />
    </div>
  );
};

export default ProductDetail;
