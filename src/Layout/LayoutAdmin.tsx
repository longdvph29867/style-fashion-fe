import User from "../components/User/User";
import Search from "../components/Admin/AdminMenu/Search/Search";
import AdminMenu from "../components/Admin/AdminMenu/AdminMenu";
import { localUserService } from "../services/localService";
import { Outlet } from "react-router-dom";
import { Button, Drawer, DrawerProps, Layout, RadioChangeEvent } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

function LayoutAdmin() {
  // if (localUserService.get()?.role !== "admin") {
  //   window.location.href = "/";
  // }
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  return (
    // <div className="flex min-h-screen w-full bg-bg admin-menu">
    //   <AdminMenu />

    //   <div className="flex-grow px-4 flex flex-col">
    //     <nav className="flex items-center justify-between py-2">
    //       <h6 className="font-bold capitalize text-primary">Style Fashion. admin</h6>
    //       <div className="flex items-center sm:flex-row flex-col-reverse">
    //         <Search className="border rounded-lg" />
    //         <User />
    //       </div>
    //     </nav>
    //     <div className="flex-grow relative flex flex-col min-w-0 mb-6 bg-white shadow-sm rounded-2xl">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

    <Layout className="flex min-h-screen w-full admin-menu">
      <Sider className={`${collapsed ? 'block' : 'hidden'} ${!collapsed && 'lg:block hidden'} min-w-[255px]  transition-all duration-300 ease-in-out`}
        style={{
          backgroundColor: 'white',
          transform: collapsed ? 'translateX(0)' : 'translateX(-100%)',
          opacity: collapsed ? 1 : 0,
        }}>
        <AdminMenu collapsed={collapsed} />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: 'white' }}>Header</Header>
        <Content >
          <div className="btn-collaspsed-menu">
            <Button className="block lg:hidden " type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
              {!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          Content
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
