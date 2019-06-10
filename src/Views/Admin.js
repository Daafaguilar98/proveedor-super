import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Sidebar from "../UIComponents/Sidebar.js"
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
class Admin extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar/>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            El Proveedor ©2019 Created by Newman Technology
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
