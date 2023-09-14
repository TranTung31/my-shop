import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetail = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#efefef",
        height: "2000px",
      }}
    >
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <span
          style={{
            fontSize: "1.6rem",
            color: "rgb(128, 128, 137)",
            padding: "10px 0",
          }}
        >
          Trang chủ
        </span>
        <ProductDetailComponent />
      </div>
    </div>
  );
};

export default ProductDetail;
