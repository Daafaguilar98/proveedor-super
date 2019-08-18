import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo">
          <img src={logo} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Inicio</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/categories">
              <Icon type="file" />
              <span>Categorias</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/products">
              <Icon type="desktop" />
              <span>Productos</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
