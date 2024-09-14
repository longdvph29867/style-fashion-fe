import React, { useEffect, useState } from 'react'
import { hiddenSpinner, showSpinner } from '../../../util/util'
import { https } from "../../../config/axios";
import { Button, Modal, Popconfirm, Rate, message } from 'antd';


type Props = {
    reviewsList: any,
    fetchData: () => void,
    currentPage: number,
    limitPerPage: number
}

const ChildrenTab = ({ reviewsList, fetchData, currentPage, limitPerPage }: Props) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    const handleApprove = async () => {
        console.log('Approve review with id:', selectedReviewId);
        setIsApproveModalOpen(false);
        try {
            showSpinner()
            const data = await https.post(`/reviews/approve?reviewId=${selectedReviewId}`);
            if (data) {
                message.success('Duyệt thành công');
                fetchData();
                // hiddenSpinner();
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
        setSelectedReviewId(null);
    };

    const handleDelete = async () => {
        console.log('Deleting review with id:', selectedReviewId);
        setIsDeleteModalOpen(false);
        try {
            showSpinner()
            const data = await https.delete(`/reviews/${selectedReviewId}`);
            if (data) {
                message.success('Xóa thành công');
                fetchData();
                hiddenSpinner();
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
        setSelectedReviewId(null);
    };

    const handleRestore = async () => {
        console.log('Restore review with id:', selectedReviewId);
        setIsRestoreModalOpen(false);
        try {
            showSpinner()
            const data = await https.post(`/reviews/restore?reviewId=${selectedReviewId}`);
            if (data) {
                message.success('Khôi phục thành công');
                fetchData();
                hiddenSpinner();
            }
        } catch (error) {
            hiddenSpinner();
            console.log(error);
            message.error(error.response.data.message);
        }
        setSelectedReviewId(null);
    };

    const showDeleteModal = (id: any) => {
        setIsDeleteModalOpen(true);
        setSelectedReviewId(id);
    };

    const showApproveModal = (id: any) => {
        setIsApproveModalOpen(true);
        setSelectedReviewId(id);
    };

    const showRestoreModal = (id: any) => {
        setIsRestoreModalOpen(true);
        setSelectedReviewId(id);

    };

    // const showModal = (id: any) => {
    //     console.log(id, 'id')
    //     setSelectedReviewId(id);
    //     setIsModalOpen(true);
    // };

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setIsApproveModalOpen(false);
        setIsRestoreModalOpen(false);
        setSelectedReviewId(null);
    };

    return (
        <div className="h-full mt-4 overflow-x-auto">
            <div className="w-full border-gray-200 text-slate-500">
                <div className="w-full grid md:grid-cols-10 grid-cols-6 gap-2">
                    <div className="block xl:col-span-2 md:col-span-2 col-span-2  text-center pr-6 pl-4 py-3 font-bold uppercase text-slate-800">
                        Tên
                    </div>
                    {/* <div className="xl:block hidden lg:col-span-1 pr-6 pl-4 py-3  text-left font-bold uppercase text-slate-800">
                        Email
                    </div> */}
                    <div className="block  lg:col-span-4 md:col-span-4 col-span-4 pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
                        Nội dung đánh giá
                    </div>
                    <div className="md:block hidden pr-6 pl-2 py-3  text-center font-bold uppercase text-slate-800">
                        Sao
                    </div>
                    <div className="md:block hidden col-span-1 pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
                        Trạng thái
                    </div>
                    <div className="md:block hidden col-span-2 pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
                        Thao tác
                    </div>
                </div>
                <div>
                    {
                        reviewsList.map((review: any, index: number) => (
                            <div key={review.id} className="relative w-full grid md:grid-cols-10 sm:grid-cols-6 grid-cols-6 gap-2 items-center border-t border-slate-100 pl-2">
                                <span className='absolute text-slate-300'>{((currentPage - 1) * limitPerPage + (index + 1))}</span>
                                <div className="md:block xl:col-span-2 col-span-2 text-center pr-6 pl-4 py-3 text-slate-800">
                                    {review.name}
                                    <span className='block'>
                                        {`(${review.email})`}
                                    </span>
                                </div>
                                {/* <div className="xl:block xl:static absolute bottom-0 xl:col-span-1 pr-6 pl-4 py-3  text-left text-slate-800">
                                    {review.email}
                                </div> */}
                                <div className="md:block lg:col-span-4  col-span-4 pr-6 pl-2 py-3  text-left text-slate-800">
                                    {review.content}
                                </div>
                                <div className="md:block col-span-2 md:col-span-1 text-left ">
                                    <Rate className='' allowHalf defaultValue={review.score} count={Math.floor(review.score)} />
                                </div>

                                <div className={`md:block md:col-span-1 col-span-2 text-center  pr-6 pl-2 py-3  xl:text-left ${review.status === "reviewed" && "text-green-500"} ${review.status === "deleted" && "text-red-500"} ${review.status === "offline" && "text-slate-500"} `}>
                                    {review.status === "reviewed" && "Đã duyệt"}
                                    {review.status === "offline" && "Chưa duyệt"}
                                    {review.status === "deleted" && "Đã xóa"}
                                </div>
                                <div className="md:block md:col-span-2 ml-30 col-span-2 text-right grid grid-flow-row justify-end  pl-2 py-3  md:text-left text-slate-800">
                                    {review.status !== "deleted" &&
                                        <>
                                            <Button onClick={() => showDeleteModal(review.id)} className="mr-2 text-white text-base font-semibold sm:w-20 w-20 h-10 bg-red-500 rounded mb-1">Xóa</Button>
                                            <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                                                <p>Bạn có chắc chắn muốn xóa?</p>
                                            </Modal>
                                        </>
                                    }
                                    {review.status === "offline" &&
                                        <>
                                            <Button onClick={() => showApproveModal(review.id)} className="text-white text-base font-semibold sm:w-20 w-20 h-10 bg-green-500 rounded">Duyệt</Button>
                                            <Modal title="Xác nhận duyệt" open={isApproveModalOpen} onOk={handleApprove} onCancel={handleCancel}>
                                                <p>Bạn có chắc chắn muốn duyệt?</p>
                                            </Modal>
                                        </>
                                    }
                                    {review.status === "deleted" &&
                                        <>
                                            <Button onClick={() => showRestoreModal(review.id)} className="text-white text-center text-base font-semibold h-10 bg-green-500 rounded">Khôi phục</Button>
                                            <Modal title="Xác nhận khôi phục" open={isRestoreModalOpen} onOk={handleRestore} onCancel={handleCancel}>
                                                <p>Bạn có chắc chắn muốn khôi phục?</p>
                                            </Modal>
                                        </>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ChildrenTab