import User from "../components/User/User";
import Search from "../components/Admin/AdminMenu/Search/Search";
import AdminMenu from "../components/Admin/AdminMenu/AdminMenu";
import { localUserService } from "../services/localService";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Button, Drawer, DrawerProps, Layout, RadioChangeEvent } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

function LayoutAdmin() {
  // if (localUserService.get()?.role !== "admin") {
  //   window.location.href = "/";
  // }
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const { userRole }: any = useContext(AuthContext);

  const toggleCollapsed = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };
  useEffect(() => {
    // responsive
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    userRole === "admin" || userRole === "staff" ? (
      <Layout className="flex min-h-screen w-full admin-menu">
        <Sider
          className={` min-w-[255px] border-r border-gray-200`}
          style={{
            backgroundColor: 'white',
          }}
          collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        >
          <AdminMenu collapsed={collapsed} />
        </Sider>

        <Layout>
          <Header className="flex items-center justify-end sm:flex-row flex-col-reverse h-20"
            style={{ backgroundColor: 'white' }}>
            {/* <div>
              <Search className="border rounded-lg " />
            </div> */}
            <User />
          </Header>
          <Content style={{
            backgroundColor: 'white',
          }}>
            <div className="btn-collaspsed-menu pt-2">
              <Button className="block lg:hidden bg-white" type="primary" onClick={() => setCollapsed(prev => !prev)} style={{ marginBottom: 16 }}>
                {!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </div>
            <div className="px-8">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    ) : (<NotFoundPage />)
  );
}

// return (




//   <Layout className="flex min-h-screen w-full admin-menu">
//     <Sider
//       className={` min-w-[255px] border-r border-gray-200`}
//       style={{
//         backgroundColor: 'white',
//       }}
//       collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
//     >
//       <AdminMenu collapsed={collapsed} />
//     </Sider>

//     <Layout>
//       <Header className="flex items-center justify-between sm:flex-row flex-col-reverse h-20"
//         style={{ backgroundColor: 'white' }}>
//         <div>
//           <Search className="border rounded-lg " />
//         </div>
//         <User />
//       </Header>
//       <Content style={{
//         backgroundColor: 'white',
//       }}>
//         <div className="btn-collaspsed-menu pt-2">
//           <Button className="block lg:hidden bg-white" type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
//             {!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           </Button>
//         </div>
//         <div className="py-4 px-8">

//           <Outlet />
//         </div>
//       </Content>
//       {/* <Footer>Footer</Footer> */}
//     </Layout>
//   </Layout>

//   // <div className="flex min-h-screen w-full bg-bg admin-menu">
//   //   <AdminMenu />

//   //   <div className="flex-grow px-4 flex flex-col">
//   //     <nav className="flex items-center justify-between py-2">
//   //       <h6 className="font-bold capitalize text-primary">Style Fashion. admin</h6>
//   //       <div className="flex items-center sm:flex-row flex-col-reverse">
//   //         <Search className="border rounded-lg" />
//   //         <User />
//   //       </div>
//   //     </nav>
//   //     <div className="flex-grow relative flex flex-col min-w-0 mb-6 bg-white shadow-sm rounded-2xl">
//   //       <Outlet />
//   //     </div>
//   //   </div>
//   // </div>
// );
// }

export default LayoutAdmin;
