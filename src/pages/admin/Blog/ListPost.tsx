import React, { useEffect, useState } from "react";
import { Blog } from "../../../types/blog";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { Link } from "react-router-dom";
import { Breadcrumb, Image, message, Modal, Pagination, Table } from "antd";
import DOMPurify from "dompurify";

type Props = {};

const ListPost = (props: Props) => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const fetchData = async (page = 1) => {
    try {
      showSpinner();
      const API = `/blogs`;
      const { data } = await https.get(API);
      setBlogList(data.results);
      setTotalResults(data.totalResults);
      hiddenSpinner();
      setBlogList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
        const maxLength = 50; // Độ dài tối đa của mô tả trước khi thêm dấu '...'
        // return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
        return <h4 className="my-line-1"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></h4>
      },
    },
    // {
    //   title: "View",
    //   dataIndex: "view",
    //   key: "view",
    //   render: (text: number) => (
    //     <span className="text-green-500">{text}</span>
    //   ),
    // },
    {
      title: "Thao tác",
      key: "action",
      render: (text: string, record: Blog) => (
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
