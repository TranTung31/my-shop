import { Button } from "antd";

const ButtonComponent = ({ icon, size, styleButton, buttonText, ...rests }) => {
  return (
    <Button icon={icon} size={size} style={styleButton}>
      <span>{buttonText}</span>
    </Button>
  );
};

export default ButtonComponent;
