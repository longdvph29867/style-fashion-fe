import React from "react";

type Props = {};

const HotBlog = (props: Props) => {
  const blogList = [
    {
      id: 1,
      title:
        "7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
      date: "21/02/2024",
      image:
        "https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
      describe:
        "Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng.",
    },
    {
      id: 2,
      title:
        "7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
      date: "21/02/2024",
      image:
        "https://bizweb.dktcdn.net/100/507/559/articles/1708274021-351-thumbnail-width64.jpg",
      describe:
        "Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng.",
    },
    {
      id: 3,
      title:
        "7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
      date: "21/02/2024",
      image:
        "https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
      describe:
        "Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng.",
    },
    {
      id: 4,
      title:
        "7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
      date: "21/02/2024",
      image:
        "https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
      describe:
        "Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng.",
    },
    {
      id: 5,
      title:
        "7 món thời trang không bao giờ là cũ, chị em mặc quanh năm vẫn đẹp sang",
      date: "21/02/2024",
      image:
        "https://bizweb.dktcdn.net/100/507/559/articles/1707844303-687-thumbnail-width64.jpg",
      describe:
        "Những món đồ cơ bản không bao giờ là cũ như áo thun trắng, quần jean ống đứng, tất dài, giày lười, thắt lưng… sẽ có sức sống lâu bền với thời gian và phù hợp với mọi xu hướng ăn mặc.Thời trang là xu hướng nhưng các chuyên gia về ăn mặc luôn khuyên chị em để sẵn những món đồ này trong tủ quần áo để luôn có những item phù hợp với mọi mùa và không bao giờ lỗi mốt.Có khá nhiều xu hướng thời trang cơ bản đang được chị em ưa chuộng và bài viết này chỉ đề cập những xu hướng phổ biến nhất, dễ mặc nhất từ trang phục, phụ kiện dễ kiếm trong mùa xuân hè này. Các chị em hãy lưu lại những bí kíp và item này để chuẩn bị cho phong cách sang - xịn - mịn nhất qua khả năng phối đồ của bản thân.Dưới đây là 7 món đồ mà hội chị em nên lưu giữ trong tủ đồ của mình để khi “cần là có” và trở thành những chuyên gia phối đồ sành điệu, tinh tế và hợp xu hướng.",
    },
  ];

  return (
    <div className="xl:w-4/12 lg:w-4/12 p-3">
      <h2 className="text-center p-4 pt-0 text-2xl font-semibold hover:text-[#fe385c]">
        <a href="">Tin tức nổi bật</a>
      </h2>
      {blogList.map((blog) => (
        <div className="flex justify-center items-center gap-2">
          <div className="relative p-3">
            <a href="">
              <img className="xl:w-72 xl:h-28 w-44 h-16 rounded" src={blog.image} alt="" />
            </a>
            <p className="absolute left-0 top-[35px] xl:top-[55px] rounded-full w-5 h-5 xl:w-6 xl:h-6 bg-[#fe385c] text-white flex justify-center items-center">
              {blog.id}
            </p>
          </div>
          <div className="">
            <h3 className="text-sm font-semibold hover:text-[#fe385c]">
              <a href="">{blog.title}</a>
            </h3>
            <p className="text-sm text-[#fe385c]">{blog.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotBlog;
