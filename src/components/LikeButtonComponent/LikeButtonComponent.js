const LikeButtonComponent = (props) => {
  const { dataHref } = props;
  return (
    <div
      className="fb-like"
      data-href={dataHref}
      data-width=""
      data-layout=""
      data-action=""
      data-size=""
      data-share="true"
      style={{ marginTop: "20px" }}
    ></div>
  );
};

export default LikeButtonComponent;
