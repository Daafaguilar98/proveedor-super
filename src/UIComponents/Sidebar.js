import React, { useState, useEffect } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const { Sider } = Layout;

const Sidebar = ({}) => {
  const [sidebarList] = useState(["/", "categories", "products"]);
  const [currentItem, setCurrentItem] = useState(["/"]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCurrentItem(
      sidebarList.filter(item => window.location.pathname.includes(item))
    );
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">
        <img src={logo} />
      </div>
      <Menu
        theme="dark"
        defaultOpenKeys={currentItem}
        defaultSelectedKeys={currentItem}
        mode="inline"
      >
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="pie-chart" />
            <span>Inicio</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/categories">
          <Link to="/categories">
            <Icon type="file" />
            <span>Categorias</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/products">
          <Link to="/products">
            <Icon type="desktop" />
            <span>Productos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
