import { useEffect, useState } from "react";
import { Blog } from "../../../types/blog";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { Link } from "react-router-dom";
import { Breadcrumb, Image, message, Modal, Table } from "antd";
import DOMPurify from "dompurify";


const ListPost = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const fetchData = async () => {
    try {
      showSpinner();
      const API = `/blogs`;
      const { data } = await https.get(API);
      setBlogList(data.results);
      hiddenSpinner();
      setBlogList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    showSpinner();
    try {
      const data = await https.delete(`/blogs/${id}`);
      if (data) {
        message.success("Xóa thành công");
        fetchData();
        hiddenSpinner();
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };
  const { confirm } = Modal;

  const showConfirm = (id: string) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa?",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
      maskClosable: true,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => (index + 1),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text: string) => <Image src={text} width={100} height={100} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "content",
      key: "content",
      render: (text: string) => {
        return <h4 className="my-line-1"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></h4>
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: string, record: Blog) => (
        <span>
          <Link to={`/admin/blog/${record._id}`} className="text-yellow-500">Chi tiết</Link>
          <button
            onClick={() => showConfirm(record._id)}
            className="ml-2 text-red-500"
          >
            Xoá
          </button>
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        columns={columns}
        dataSource={blogList}
        pagination={false}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default ListPost;
