import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import SearchTask from "../../components/SearchTask";
import ControlsContainer from "../../components/ControlsContainer";
import TasksCardContainer from "./TaskCardContainer";

const Dashboard = () => {
  return (
    <StyledDashboard>
      <Sidebar />
      <div className="container">
        <SearchTask />
        <ControlsContainer />
        <TasksCardContainer />
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  background-color: ${(props) => props.theme.colors.Neutral5};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  .container {
    height: calc(100vh - 40px);
    width: calc(100% - 272px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
