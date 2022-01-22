import "./App.css";
import { ConfigProvider, Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const { Header, Sider, Content } = Layout;

ConfigProvider.config({
  prefixCls: "custom-template",
  iconPrefixCls: "custom-template-icon",
  theme: {
    primaryColor: "#1890FF",
    processingColor: "#1890FF",
    successColor: "#52C41A",
    errorColor: "#FF4D4F",
    warningColor: "#FAAD14",
    infoColor: "#1890FF",
  },
});

function App() {
  const [collapsed, setCollapsed] = useState(localStorage.getItem("collapsed") === "true");

  const menu = [
    { label: "Home", icon: <HomeOutlined />, url: "/home" },
    { label: "About", icon: <UserOutlined />, url: "/about" },
    { label: "Contact", icon: <PhoneOutlined />, url: "/contact" },
  ];

  const toggle = (collapsed: boolean) => {
    collapsed = !collapsed;
    setCollapsed(collapsed);
    localStorage.setItem("collapsed", `${collapsed}`);
  };

  return (
    <>
      <ConfigProvider prefixCls="custom-template">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider breakpoint="lg" trigger={null} collapsible collapsed={collapsed} style={{ position: "sticky", left: 0, top: 0, height: "100vh" }}>
            <div className="App logo">
              <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="Logo" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {menu.map((item, index) => (
                <Menu.Item key={index} icon={item.icon}>
                  <Link to={item.url}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout className="App site-layout">
            <Header className="App site-layout-background" style={{ padding: 0 }}>
              {collapsed ? <MenuUnfoldOutlined className="App trigger" onClick={() => toggle(collapsed)} /> : <MenuFoldOutlined className="App trigger" onClick={() => toggle(collapsed)} />}
            </Header>
            <Content className="App site-layout-background" style={{ padding: 24, margin: 24 }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
