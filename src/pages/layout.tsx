import { Layout, Menu } from "antd";

import { Link, useHistory } from "react-router-dom";
import "./layout.css";

const { Header, Content } = Layout;

const Layout1 = (props: any) => {
  let history = useHistory();
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/user">Thông Tin Tài Khoản</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/calendar">Lịch Tháng</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/meetupOnce">Lịch ngày</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/room">Phòng</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <span
                onClick={() => {
                  localStorage.clear();
                  history.push("/login");
                }}
              >
                Đăng xuất
              </span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64, height: "100%" }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <main>{props.children}</main>
          </div>
        </Content>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/calendar">Lịch Tháng</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/meetupOnce">Lịch ngày</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <span
                onClick={() => {
                  localStorage.clear();
                  history.push("/login");
                }}
              >
                Đăng xuất
              </span>
            </Menu.Item>
          </Menu>
        </Header>

        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64, height: "100%" }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <main>{props.children}</main>
          </div>
        </Content>
      </Layout>
    );
  }
};

export default Layout1;
