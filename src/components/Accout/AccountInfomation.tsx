import ChangeImage from "./ChangeImage";
import { useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { https } from "../../config/axios";
import { useEffect, useState } from "react";
import { AddUserType, UpdateUserTypeWithoutPassword, User } from "../../types/users";


const AccountInfomation = () => {
  const [avatar, setAvatar] = useState<string>("")
  const { id } = useParams();
  const [form] = Form.useForm();

  const fetchUserDetail = async () => {
    showSpinner();
    try {
      const { data } = await https.get<User>(`/users/6656f1d6518d4a3b415e761b`);
      console.log(data)
      setAvatar(data.image)
      const user: UpdateUserTypeWithoutPassword = data;
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        
      });
      
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
    
  };
  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const onFinish = (values: AddUserType) => {
    const data = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
    }
    // console.log(values);
    const postUser = async () => {
      showSpinner();
      try {
         await https.put(`/users/6656f1d6518d4a3b415e761b`, data);
        message.success("Cập nhật thành công!");
        hiddenSpinner();

      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data.message);
        console.log(error);
      }
    };
    postUser();
  };


  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const formData = new FormData();
      
      // Nếu chỉ có một ảnh, bạn vẫn thêm nó vào FormData như một mảng
      for (const file of files) {
        formData.append("images", file);
      }
      showSpinner();  
      try {
        // Gửi FormData lên server
        const response = await https.post("/images", formData);
        
        // Giả sử phản hồi chứa URL của ảnh
        const imageUrl = response.data.data[0].url;
    setAvatar(imageUrl);
      
        
        // Gửi yêu cầu PUT để cập nhật thông tin người dùng với khóa "image"
        await https.put(`/users/6656f1d6518d4a3b415e761b`, { image: imageUrl });
        message.success("Cập nhật thành công!");
      } catch (error) {
        message.error(error.response.data.message || "Có lỗi xảy ra.");
        console.log(error);
      } finally {
        hiddenSpinner();
      }
    } else {
      message.error("Vui lòng chọn một ảnh.");
    }
  };
  
  


  return (
    <div
      id="infomation"
      className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32"
    >
      <div>
        <div className="space-y-10 sm:space-y-12">
          <h2 className="text-2xl sm:text-3xl font-semibold sm:text-left text-center">
            Account infomation
          </h2>
          <div className="flex flex-col md:flex-row">
            {/* Change Image */}
            <ChangeImage handleUpload={handleUpload} image={avatar}/>
            {/* Form */}
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

              <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}
              >
                <Form.Item
                  label="Full name"
                  className=" text-base font-medium text-neutral-900"
                  name="name"
                  rules={[
                    { required: true, message: "Please fill in this field!" },
                    {
                      min: 6,
                      max: 25,
                      message: "Name must be between 6 and 25 characters!",
                    },
                  ]}
                >
                  <Input className="block w-full border-neutral-200  bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  className=" text-base font-medium text-neutral-900"
                  name="email"
                  rules={[
                    { required: true, message: "Please fill in this field!" },
                    {
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address!",
                    },
                  ]}
                >
                  <Input className="block w-full border-neutral-200  bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />


                </Form.Item>

                <Form.Item
                  label="Phone number"
                  className=" text-base font-medium text-neutral-900"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Please fill in this field!" },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: "Invalid phone number format!",
                    },
                  ]}
                >
                  <Input className="block w-full border-neutral-200  bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>




            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfomation;