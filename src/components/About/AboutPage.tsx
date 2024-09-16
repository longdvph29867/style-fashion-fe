import {
  FaSmile,
  FaChartLine,
  FaRocket,
  FaBirthdayCake,
  FaLightbulb,
  FaCode,
} from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./About.css";
const AboutPage = () => {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: ref4, inView: inView4 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  return (
    <div>
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Digital Services
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Service Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://samar-ruddy.vercel.app/Samar/pic1_3.jpg"
              alt="Web Development"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p className="text-gray-600">
              Vestibulum a efficitur ex. Ut iaculis dapibus iaculis. Praesent
              lacus magna, rhoncus quis magna quis.
            </p>
          </div>
          {/* Service Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://samar-ruddy.vercel.app/Samar/pic2_2.jpg"
              alt="Strategy & Research"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Strategy &amp; Research
            </h3>
            <p className="text-gray-600">
              Vestibulum a efficitur ex. Ut iaculis dapibus iaculis. Praesent
              lacus magna, rhoncus quis magna quis.
            </p>
          </div>
          {/* Service Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://samar-ruddy.vercel.app/Samar/pic3_2.jpg"
              alt="Growth Tracking"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Growth Tracking</h3>
            <p className="text-gray-600">
              Vestibulum a efficitur ex. Ut iaculis dapibus iaculis. Praesent
              lacus magna, rhoncus quis magna quis.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between p-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://samar-ruddy.vercel.app/Samar/pic1.jpg"
            alt="About Us Image"
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Content Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-16">
          <h3 className="text-pink-500 font-bold text-xl mb-2">About Us</h3>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Build Your Business Website Better
          </h1>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-pink-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                We support programs that create advancement opportunities for
                people.
              </p>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-pink-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                Get a view of events and trends. Be updated on our recent news.
              </p>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-pink-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                Finally, it all comes down to people. Creating a winning team.
              </p>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-pink-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                Get a view of events and trends. Be updated on our recent news.
              </p>
            </li>
          </ul>
          <button className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg shadow-lg hover:opacity-90 transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Satisfied Clients */}
            <div className="text-center" ref={ref1}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 mx-auto mb-4">
                <FaSmile className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-pink-500">
                {inView1 && (
                  <CountUp start={0} end={18} suffix=" MI" duration={3} />
                )}
              </div>
              <div className="text-gray-600 mt-2">Satisfied Clients</div>
            </div>

            {/* Projects Completed */}
            <div className="text-center" ref={ref2}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 mx-auto mb-4">
                <FaChartLine className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-pink-500">
                {inView2 && (
                  <CountUp start={0} end={20} suffix=" MI" duration={3} />
                )}
              </div>
              <div className="text-gray-600 mt-2">Projects Completed</div>
            </div>

            {/* Projects Launched */}
            <div className="text-center" ref={ref3}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 mx-auto mb-4">
                <FaRocket className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-pink-500">
                {inView3 && (
                  <CountUp start={0} end={30} suffix=" MI" duration={3} />
                )}
              </div>
              <div className="text-gray-600 mt-2">Projects Launched</div>
            </div>

            {/* Years Completed */}
            <div className="text-center" ref={ref4}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 mx-auto mb-4">
                <FaBirthdayCake className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-pink-500">
                {inView4 && <CountUp start={0} end={50} duration={3} />}
              </div>
              <div className="text-gray-600 mt-2">Years Completed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20 py-12">
        <div className="space-y-8">
          <div
            ref={ref1}
            className={`transition-transform duration-700 ease-in-out transform ${inView1 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              } p-6 bg-white text-black rounded-lg shadow-lg w-full lg:w-96 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white`}
          >
            <div className="flex items-center mb-4">
              <FaLightbulb className="text-3xl text-pink-500 mr-4" />
              <h2 className="text-xl font-semibold">
                Idea & Analysis Gathering
              </h2>
            </div>
            <p>
              Maecenas laoreet efficitur sagittis. Aliquam eleifend nisl leo,
              sit amet consequat augue.
            </p>
          </div>

          <div
            ref={ref2}
            className={`transition-transform duration-700 ease-in-out transform ${inView2 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              } p-6 bg-white text-black rounded-lg shadow-lg w-full lg:w-96 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white`}
          >
            <div className="flex items-center mb-4">
              <FaCode className="text-3xl text-pink-500 mr-4" />
              <h2 className="text-xl font-semibold">Design & Developing</h2>
            </div>
            <p>
              Maecenas laoreet efficitur sagittis. Aliquam eleifend nisl leo,
              sit amet consequat augue.
            </p>
          </div>

          <div
            ref={ref3}
            className={`transition-transform duration-700 ease-in-out transform ${inView3 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              } p-6 bg-white text-black rounded-lg shadow-lg w-full lg:w-96 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white`}
          >
            <div className="flex items-center mb-4">
              <FaRocket className="text-3xl text-pink-500 mr-4" />
              <h2 className="text-xl font-semibold">Testing & Launching</h2>
            </div>
            <p>
              Maecenas laoreet efficitur sagittis. Aliquam eleifend nisl leo,
              sit amet consequat augue.
            </p>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:ml-12 flex justify-center items-center">
          <img
            src="https://samar-ruddy.vercel.app/Samar/pic3.png" // Thay đường dẫn bằng đường dẫn ảnh của bạn
            alt="Illustration"
            className="w-96 h-auto transition-transform duration-700 ease-in-out animate-shake"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Latest Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large Image */}
          <div className="relative group overflow-hidden col-span-2 row-span-2">
            <img src="https://samar-ruddy.vercel.app/Samar/pic1_2.jpg" alt="Project 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-lg">Software Landing</span>
            </div>
            <div className="absolute inset-0">
              <div className="absolute w-full h-20 bg-slate-100 opacity-20 transform rotate-45 -translate-x-full translate-y-full group-hover:animate-light-sweep"></div>
            </div>
          </div>

          {/* Small Image 1 */}
          <div className="relative group overflow-hidden">
            <img src="https://samar-ruddy.vercel.app/Samar/pic1_2.jpg" alt="Project 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-lg">Project 2</span>
            </div>
            <div className="absolute inset-0">
              <div className="absolute w-full h-[70px] bg-white opacity-20 transform rotate-45 -translate-x-full translate-y-full group-hover:animate-light-sweep"></div>
            </div>
          </div>

          {/* Small Image 2 */}
          <div className="relative group overflow-hidden">
            <img src="https://samar-ruddy.vercel.app/Samar/pic1_2.jpg" alt="Project 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-lg">Project 3</span>
            </div>
            <div className="absolute inset-0">
              <div className="absolute w-full h-[70px] bg-white opacity-20 transform rotate-45 -translate-x-full translate-y-full group-hover:animate-light-sweep"></div>
            </div>
          </div>

          {/* Small Image 3 */}
          <div className="relative group overflow-hidden">
            <img src="https://samar-ruddy.vercel.app/Samar/pic1_2.jpg" alt="Project 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-lg">Project 4</span>
            </div>
            <div className="absolute inset-0">
              <div className="absolute w-full h-[70px] bg-white opacity-20 transform rotate-45 -translate-x-full translate-y-full group-hover:animate-light-sweep"></div>
            </div>
          </div>

          {/* Small Image 4 */}
          <div className="relative group overflow-hidden">
            <img src="https://samar-ruddy.vercel.app/Samar/pic1_2.jpg" alt="Project 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-lg">Project 5</span>
            </div>
            <div className="absolute inset-0">
              <div className="absolute w-full h-[70px] bg-white opacity-20 transform rotate-45 -translate-x-full translate-y-full group-hover:animate-light-sweep"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
