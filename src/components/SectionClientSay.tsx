import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const SectionClientSay = () => {
    const settings = {
        dots: true, // Hiển thị chấm chuyển đổi
        infinite: true, // Lặp vô hạn
        speed: 500, // Tốc độ chuyển đổi (milliseconds)
        slidesToShow: 1, // Số lượng slide hiển thị trên mỗi trang
        slidesToScroll: 1, // Số lượng slide để chuyển đổi khi chuyển đến trang tiếp theo
        // autoplay: true, // Tự động chạy Slider
        autoplaySpeed: 2000, // Tốc độ tự động chạy (milliseconds)
    };

    return (
        <>
            <div className="nc-SectionClientSay relative flow-root  mt-24">
                <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
                    <div className="flex flex-col items-center text-center w-full mx-auto">
                        <h2 className="justify-center text-3xl md:text-4xl font-semibold">Good news from far away 🥇</h2>
                        <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">Let's see what people think of Ciseco</span>
                    </div>

                </div>

                <div className="relative md:mb-16 max-w-2xl mx-auto">
                    <div className="hidden md:block">
                        <img
                            alt=""
                            loading="lazy"
                            width="59"
                            height="59"
                            decoding="async"
                            data-nimg="1"
                            className="absolute top-9 -left-20"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay1e4d5.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="60"
                            height="59"
                            decoding="async"
                            data-nimg="1"
                            className="absolute bottom-[100px] right-full mr-40"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay2dd5e.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="55"
                            height="58"
                            decoding="async"
                            data-nimg="1"
                            className="absolute top-full left-[140px]"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay43bf4.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="47"
                            height="49"
                            decoding="async"
                            data-nimg="1"
                            className="absolute -bottom-10 right-[140px]"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay68d98.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="65"
                            height="63"
                            decoding="async"
                            data-nimg="1"
                            className="absolute left-full ml-32 bottom-[80px]"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay31777.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="57"
                            height="56"
                            decoding="async"
                            data-nimg="1"
                            className="absolute -right-10 top-10"
                            style={{ color: 'transparent' }}
                            sizes="100px"
                            srcSet="src/assets/img/clientSay54865.png"
                        />
                    </div>

                    <img
                        alt=""
                        loading="lazy"
                        width="126"
                        height="120"
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto"
                        style={{ color: 'transparent' }}
                        srcSet="src/assets/img/clientSay1e4d5.png"
                    />
                    <div className="mt-12 lg:mt-16 relative glidejs_Rcrcja_ glide--ltr glide--slider glide--swipeable">
                        <img
                            alt=""
                            loading="lazy"
                            width="52"
                            height="45"
                            decoding="async"
                            data-nimg="1"
                            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
                            style={{ color: 'transparent' }}
                            srcSet="src/assets/img/quotation0027.png"
                        />
                        <img
                            alt=""
                            loading="lazy"
                            width="52"
                            height="45"
                            decoding="async"
                            data-nimg="1"
                            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
                            style={{ color: 'transparent' }}
                            srcSet="src/assets/img/quotation28d7c.png" />
                        <div className="glide__track ">
                            <Slider {...settings} className="glide__slides" >
                                <li className="glide__slide flex flex-col items-center text-center glide__slide--active" style={{ width: "672px", marginRight: "5px" }}>
                                    <span className="block text-2xl">Great quality products, affordable prices, fast and friendly delivery. I very recommend.</span>
                                    <span className="block mt-8 text-2xl font-semibold">Tiana Abie</span>
                                    <div className="flex  space-x-0.5 mt-3.5 text-yellow-500 justify-center	">
                                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                    </div>
                                    
                                </li>
                                <li className="glide__slide flex flex-col items-center text-center" style={{ width: "672px", marginLeft: "5px", marginRight: "5px" }}>
                                    <span className="block text-2xl">Great quality products, affordable prices, fast and friendly delivery. I very recommend.</span>
                                    <span className="block mt-8 text-2xl font-semibold">Lennie Swiffan</span>
                                    <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500 justify-center	">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                    </div>
                                </li>
                                <li className="glide__slide flex flex-col items-center text-center" style={{ width: "672px", marginLeft: "5px" }}>
                                    <span className="block text-2xl">Great quality products, affordable prices, fast and friendly delivery. I very recommend.</span>
                                    <span className="block mt-8 text-2xl font-semibold">Berta Emili</span>
                                    <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500 justify-center	">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                                    </div>
                                </li>
                            </Slider>

                        </div>
                        
                    </div>

                </div>
            </div>


        </>
    )
}

export default SectionClientSay;