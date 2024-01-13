import { WrapperSlider } from "./styles";

const SlitherComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 8000,
    autoplay: true,
  };
  return (
    <WrapperSlider {...settings}>
      {arrImages.map((image, index) => {
        return <img src={image} alt="slider" key={index} width="100%" height="425px"/>;
      })}
    </WrapperSlider>
  );
};

export default SlitherComponent;
