import { Layout, Menu } from 'antd';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import Kitchen from '../kitchen'
import Restaurant from '../restaurant'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function Dashboard() {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

 
    return (
      <Layout>
        <Sider trigger={null} collapsible>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to='/dashboard/kitchen'>
                Кухня
              </Link>            
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to='/dashboard/restaurant'>
              Рестораны
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            <Route exact path='/dashboard/kitchen' component={Kitchen}/>
            <Route exact path='/dashboard/restaurant' component={Restaurant}/>
          </Content>
        </Layout>
      </Layout>
    )
  
}

export default Dashboard;