

type Props = {}


const BlogList = () => {
const blogList = [
    {
        id:1,
        title:"7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
        date:"21/02/2024",
        image:"https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
        describe:"Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng."
    },
    {
        id:2,
        title:"7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
        date:"21/02/2024",
        image:"https://bizweb.dktcdn.net/100/507/559/articles/1708274021-351-thumbnail-width64.jpg",
        describe:"Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng."
    },
    {
        id:3,
        title:"7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
        date:"21/02/2024",
        image:"https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
        describe:"Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng."
    },
    {
        id:4,
        title:"7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
        date:"21/02/2024",
        image:"https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
        describe:"Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng."
    },
    {
        id:5,
        title:"7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
        date:"21/02/2024",
        image:"https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
        describe:"Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng."
    }
]
   

  return (
    <div className="p-5 xl:w-3/4 lg:w-3/4">
        {/* <h1 className="text-2xl font-bold text-center">Tin Tức</h1> */}
        <div className="list-blog grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2">
            {blogList.map((blog)=>(
            <div className="">
                <div className="relative overflow-hidden rounded-md">
                    <a href="" className="">
                    <img className=" hover:scale-110 transform transition-all duration-200 ease-linear w-full" src={blog.image} alt="" />
                    </a>
                    <div className="absolute left-2 top-2 border w-28 h-7 bg-[#fe385c] flex justify-center items-center text-white font-medium rounded xl:w-20 xl:text-sm">{blog.date}</div>
                </div>
                <div className="post-new p-1">
                    <h3 className="my-line-1 p-1 font-semibold text-xl hover:text-[#fe385c] xl:text-base"><a href="">{blog.title}</a></h3>
                    <p className="my-line-2 text-lg font-thin sm:text-base">{blog.describe}</p>
            <a href="" className="flex justify-start items-center text-[#fe385c] hover:text-orange-500">Đọc tiếp
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"></path>
			<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"></path>
			</svg>
            </a>
                </div>
            </div>
            ))}
           
            </div>
        </div>
  )
}
export default BlogList