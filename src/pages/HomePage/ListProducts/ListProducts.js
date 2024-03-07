import React, { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import CardProduct from "../../../components/CardProduct/CardProduct";
import { SmoothHorizontalScrolling } from "../../../utils/utils";
import {
  WrapperButtonLeft,
  WrapperButtonRight,
  WrapperProductsScroll,
} from "./styles";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function ListProducts(props) {
  const { products, title, isLoading } = props;
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const productRef = useRef();
  const slitherRef = useRef();

  useEffect(() => {
    if (isDrag) {
      if (dragDown > dragMove) handleScrollRight();
      if (dragDown < dragMove) handleScrollLeft();
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };

  const onDragEnd = (e) => {
    setIsDrag(false);
  };

  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  const handleScrollLeft = () => {
    if (slitherRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        slitherRef.current,
        250,
        -productRef.current.clientWidth * 2,
        slitherRef.current.scrollLeft
      );
    }
  };

  const handleScrollRight = () => {
    const maxScrollWidth =
      slitherRef.current.scrollWidth - slitherRef.current.clientWidth;
    if (slitherRef.current.scrollLeft < maxScrollWidth) {
      // slitherRef.current là thẻ HTML hiện tại
      // 250 là thời gian
      // productRef.current.clientWidth là chiều ngang của các product
      // slitherRef.current.scrollLeft là vị trí ban đầu bằng 0
      SmoothHorizontalScrolling(
        slitherRef.current,
        250,
        productRef.current.clientWidth * 2,
        slitherRef.current.scrollLeft
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <h2 style={{ margin: "20px 0 0", textAlign: "center" }}>{title}</h2>
      <div style={{ position: "relative" }}>
        <WrapperProductsScroll
          ref={slitherRef}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          draggable="true"
          style={
            products && products.length > 0
              ? {
                  gridTemplateColumns: `repeat(${products.length}, 200px)`,
                }
              : null
          }
        >
          {products.map((product, index) => (
            <CardProduct
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              description={product.description}
              countInStock={product.countInStock}
              type={product.type}
              discount={product.discount}
              selled={product.selled}
              id={product._id}
              productRef={productRef}
            />
          ))}
        </WrapperProductsScroll>
        <WrapperButtonLeft onClick={handleScrollLeft}>
          <LeftOutlined />
        </WrapperButtonLeft>
        <WrapperButtonRight onClick={handleScrollRight}>
          <RightOutlined />
        </WrapperButtonRight>
      </div>
    </LoadingComponent>
  );
}

export default ListProducts;
