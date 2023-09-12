import { Button } from "antd";

const ButtonComponent = ({
  icon,
  size,
  styleButton,
  buttonText,
  styleTextButton,
  ...rests
}) => {
  return (
    <Button icon={icon} size={size} style={styleButton}>
      <span style={styleTextButton}>{buttonText}</span>
    </Button>
  );
};

export default ButtonComponent;
