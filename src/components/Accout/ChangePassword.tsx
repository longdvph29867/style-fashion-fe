import { https } from "../../config/axios";
import { Button, Form, Input, message } from "antd";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { localUserService } from "../../services/localService";

const ChangePassword: React.FC = () => {
  const storedUserInfo = localUserService.get();
  const userId = storedUserInfo ? storedUserInfo.id : null;
  const useEmail = storedUserInfo ? storedUserInfo.email : null;
  const onFinish = async (values: any) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    const onPassword = async () => {
      showSpinner();
      try {
        const checkPassword: any = await https.post("/auth/login", {
          password: oldPassword,
          email: `${useEmail}`,
        });
        if (checkPassword?.name !== "Error") {
          await https.put(`/users/${userId}`, { password: newPassword });
          message.success("Password updated successfully");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data.message);
        console.error(error);
      }
    };
    onPassword();
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-xl sm:text-3xl font-semibold">
          Update your password
        </h2>
        <div className="max-w-xl space-y-6">
          <Form
            name="change_password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            <Form.Item
              className="text-sm sm:text-base font-medium text-neutral-900"
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                { required: true, message: "Please fill in this field!" },
                {
                  min: 6,
                  max: 25,
                  message: "Password must be between 6 and 25 characters!",
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,25}$/,
                  message:
                    "Password must contain at least one letter and one number!",
                },
              ]}
            >
              <Input.Password className="w-full bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />
            </Form.Item>
            <Form.Item
              className="text-sm sm:text-base font-medium text-neutral-900"
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Please fill in this field!" },
                {
                  min: 6,
                  max: 25,
                  message: "Password must be between 6 and 25 characters!",
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,25}$/,
                  message:
                    "Password must contain at least one letter and one number!",
                },
              ]}
            >
              <Input.Password className="w-full bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />
            </Form.Item>
            <Form.Item
              className="text-sm sm:text-base font-medium text-neutral-900"
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please fill in this field!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mismatched passwords!");
                  },
                }),
              ]}
            >
              <Input.Password className="w-full bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="relative mt-4 h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
