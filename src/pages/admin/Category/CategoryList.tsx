import { useEffect, useState } from "react";
import {
    hiddenSpinner,
    showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { message } from "antd";
import { https } from "../../../config/axios";
import { CategoryTpype } from "../../../types/categoryType";

const CategoryList: React.FC = () => {
    const [categoriesList, setCategoriesList] = useState<CategoryTpype[]>([]);

    const fetchData = async () => {
        showSpinner();
        try {
            const { data } = await https.get("/categories?limit=10");
            setCategoriesList(data.results);
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Bạn có chắc chắn xoá không!")) {
            try {
                const data = await https.delete(`/categories/${id}`);
                if (data) {
                    message.success('Deleted category successfully');
                    fetchData();
                }
            } catch (error) {
                console.log(error);
                message.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="">
            <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
                <Link
                    to="/admin/categories/add"
                    className="text-white text-base font-semibold bg-green-500 py-2 px-2 rounded my-5"
                >
                    <span>Thêm mới</span>
                </Link>
            </div>
            <div className="h-full overflow-x-auto">
                <div className="w-full border-gray-200 text-slate-500">
                    <div className="w-full grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-2 gap-2">
                        <div className="pr-6 pl-4 py-3  text-left font-bold uppercase text-slate-800">
                            STT
                        </div>
                        <div className="sm:col-span-2 pr-6 pl-4 py-3  text-left font-bold uppercase text-slate-800">
                            Category
                        </div>
                        <div className="sm:block hidden pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
                            Action
                        </div>
                    </div>
                    <div>
                        {[...categoriesList].reverse().map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className="grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-2 gap-2 border-b sm:border-transparent border-slate-300"
                                >
                                    <div className="p-2">
                                        <div className="px-2 py-1 min-w-[110px]">
                                            <div className="flex flex-col justify-center">
                                                <h6 className="text-base">{index + 1}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 sm:col-span-2">
                                        <div className="flex flex-col justify-center">
                                            <h6 className="text-base">{category.name}</h6>
                                        </div>
                                    </div>

                                    <div className="p-2 space-x-2">
                                        <Link
                                            to={`/admin/categories/update/${category.id}`}
                                            className="text-sm font-semibold text-yellow-500"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-sm font-semibold text-red-500"
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
