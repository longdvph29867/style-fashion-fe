import { useEffect, useState } from "react";
import {
    hiddenSpinner,
    showSpinner,
} from "../../../util/util";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Button, Modal, Table, message } from "antd";
import { Voucher } from "../../../types/voucher";
import commentService from "../../../services/commentService";

const ProductCommentDetail: React.FC = () => {
    // const params = new URLSearchParams(location.search);
    // const [totalVoucher, setTotalVoucher] = useState(0);
    // const [loading, setLoading] = useState(true);
    // const limitPerPage = 10;
    // const currentPage = params.get("page") ? Number(params.get("page")) : 1;
    const [commentsList, setCommentsList] = useState<Voucher[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    const { id }: any = useParams();

    const fetchComments = async () => {
        showSpinner()
        try {
            // const { data } = await voucherService.getVoucherAll(limitPerPage, currentPage);
            const { data } = await commentService.getCommentByProduct(id);
            // setLoading(false);
            setCommentsList(data);
            // setTotalVoucher(data.totalResults);
            window.scrollTo(0, 0);
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }

    }

    useEffect(() => {
        fetchComments();
    }, [location.search])

    const showDeleteModal = (id: any) => {
        setIsDeleteModalOpen(true);
        setSelectedCommentId(id);
    };

    const handleDelete = async () => {
        // console.log('Deleting review with id:', selectedCommentId);
        // return;
        setIsDeleteModalOpen(false);
        try {
            if (selectedCommentId) {
                showSpinner()
                const data = await commentService.deleteComment(selectedCommentId);
                if (data) {
                    message.success('Xóa thành công');
                    setCommentsList(commentsList.filter((comment: any) => comment._id !== selectedCommentId));
                    // fetchComments();
                    hiddenSpinner();
                }
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
    };

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (_: any, __: any, index: any) => <span>{index + 1}</span>,
        },
        {
            title: 'Người dùng',
            dataIndex: ['userId', 'name'],
            key: 'name',
            render: (_: any, record: any) => <Link to={`/admin/users/${record.userId._id}`}>{record.userId.name}</Link>,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: any) => new Date(text).toLocaleString(),
            // sorter: true,
            // sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="space-x-2">
                    <Button
                        type="link"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => showDeleteModal(record._id)}
                    >
                        Xoá
                    </Button>
                    <Modal
                        title="Xác nhận xóa"
                        open={isDeleteModalOpen}
                        onOk={handleDelete}
                        onCancel={handleCancel}
                    >
                        <p>Bạn có chắc chắn muốn xóa?</p>
                    </Modal>
                </div>
            ),
        },
    ];


    return (
        <div className="">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/admin/comments">Bình luận</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} dataSource={commentsList} pagination={false} />;

            {/* <PaginationPage
            current={1}
            total={totalVoucher}
            pageSize={limitPerPage} /> */}
        </div>
    );
};

export default ProductCommentDetail;
