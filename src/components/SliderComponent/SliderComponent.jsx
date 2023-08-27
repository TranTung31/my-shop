import Slider from "react-slick";

const SlitherComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => {
        return <img src={image} alt="slider" key={index} width="100%"/>;
      })}
    </Slider>
  );
};

export default SlitherComponent;
