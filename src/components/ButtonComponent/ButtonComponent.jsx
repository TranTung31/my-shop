import { Button } from "antd";

const ButtonComponent = ({
  icon,
  size,
  styleButton,
  buttonText,
  styleTextButton,
  onClick,
  disabled,
  ...rests
}) => {
  return (
    <Button
      icon={icon}
      size={size}
      style={{
        ...styleButton,
        backgroundColor: disabled ? "#ccc" : styleButton?.backgroundColor,
      }}
      onClick={onClick}
      disabled={disabled}
      {...rests}
    >
      <span style={styleTextButton}>{buttonText}</span>
    </Button>
  );
};

export default ButtonComponent;
