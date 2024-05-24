import { Button, Form, Input, message } from "antd";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import styles from "./ChangePasswordPage.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ChangePasswordPage() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const mutationChangePassword = useMutationHook(
    ({ userId, data, access_token }) => {
      const res = UserService.changePassword(userId, data, access_token);
      return res;
    }
  );

  const {
    data: dataChangePassword,
    isSuccess: isSuccessChangePassword,
    isError: isErrorChangePassword,
  } = mutationChangePassword;

  useEffect(() => {
    if (isSuccessChangePassword && dataChangePassword?.status === "OK") {
      message.success("Thay đổi mật khẩu thành công!");
      navigate("/sign-in");
      form.resetFields();
    } else if (dataChangePassword?.status === "ERROR") {
      message.error(`${dataChangePassword?.message}`);
    }
  }, [isSuccessChangePassword, isErrorChangePassword]);

  const onFinish = (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và nhập lại mật khẩu mới phải trùng nhau!");
      return;
    }

    mutationChangePassword.mutate({
      userId: user?.id,
      data: values,
      access_token: user?.access_token,
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>Thay đổi mật khẩu</div>
        <div className={cx("form-input")}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            labelAlign="left"
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: 800,
            }}
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu hiện tại!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu mới!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
