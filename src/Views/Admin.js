import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Products from "./Products.js"
import Categories from "./Categories.js"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Sidebar from "../UIComponents/Sidebar.js"
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

class Admin extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar/>
          <Layout>
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Productos</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path="/products" component={Products}></Route>
                <Route path="/categories" component={Categories}></Route>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              El Proveedor ©2019 Created by Newman Technology
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Admin;
