import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Blog } from "../../../types/blog";
import { https } from "../../../config/axios";
import { Typography, Image, Breadcrumb, Button } from "antd";
import DOMPurify from "dompurify";
import { hiddenSpinner, showSpinner } from "../../../util/util";

const { Title, Paragraph } = Typography;

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                showSpinner();
                const { data } = await https.get(`/blogs/${id}`);
                console.log(data);
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog detail:", error);
            } finally {
                hiddenSpinner();
            }
        };

        fetchBlogDetail();
    }, [id]);

    useEffect(() => {
        console.log(blog);
    }, [blog]);



    return (
        <div className="">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/admin/blog">Blog</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
            </Breadcrumb>
            <Link to={`/admin/blog/update/${blog?._id}`} className="text-yellow-500">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="text-white bg-green-500"
                >
                    Cập nhật
                </Button></Link>
            <div className="text-center">
                <Title level={2}>{blog?.title}</Title>
                <div className="mb-4">
                    <Image src={blog?.image} alt={blog?.title} width={400} />
                </div>

            </div>
            <div>
                <Paragraph>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog?.content || ""),
                        }}
                    />
                </Paragraph>
            </div>
        </div>
    );
};

export default BlogDetail;
