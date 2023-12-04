import styled from "styled-components";
import MainContainer from "../../components/MainContainer";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <StyledHome>
      <Sidebar />
      <MainContainer />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.div`
  background-color:${(props)=>props.theme.colors.Neutral5};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;
