import styled from "styled-components";
import ControlsContainer from "../ControlsContainer";
import TasksContainer from "../../pages/Dashboard/TaskCardContainer";

const MainContainer = () => {
  return (
    <StyledMainContainer>
      {/* <SearchTask /> */}
      <ControlsContainer />
      <TasksContainer />
    </StyledMainContainer>
  );
};

export default MainContainer;

const StyledMainContainer = styled.div`
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;
