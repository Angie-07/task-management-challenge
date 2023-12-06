import { ConfigProvider, Menu } from "antd";
import styled from "styled-components";
import Logo from "../../shared/assets/logo.jpeg";
import { Link } from "react-router-dom";

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
        <Menu mode="inline">
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
  width: 232px;
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
`;
