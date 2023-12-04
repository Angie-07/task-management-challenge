import { ConfigProvider, Menu } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import Logo from "../../shared/assets/logo.jpeg";
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem("DASHBOARD", "1","/dashboard", <AppstoreOutlined />),
//   getItem("MY TASK", "2","/my-task", <MenuOutlined />),
// ];

function Sidebar() {
  return (
    <StyledSidebar>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorBgContainer: "#2c2d33",
              itemColor: "#ffff",
              itemSelectedColor: "#e42828",
              itemSelectedBg: "rgba(255, 0, 0, 0.11)",
              itemHoverColor: "#e42828",
            },
          },
        }}
      >
        <div className="img-container">
          <img src={Logo} alt="Ícono de Ravn" />
        </div>
        {/* <Menu mode="inline" defaultSelectedKeys={["1"]} items={items}>
          <Menu.Item key="1"/>
        </Menu> */}
        <Menu mode="inline"  >
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/my-task">My Task</Link>
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    </StyledSidebar>
  );
}

export default Sidebar;

const StyledSidebar = styled.div`
  width: 16%;
  height: calc(100vh - 40px);
  background-color: ${(props) => props.theme.colors.Neutral4};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 20px;
  border-radius: 10px;

  .img-container {
    margin-top: 10px;
  }
  /* .menu{
    background-color: #2c2d33;
    :active{
      background-color: #e42828;
    }
  } */
`;
