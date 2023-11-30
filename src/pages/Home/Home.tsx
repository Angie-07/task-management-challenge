import styled, { css } from "styled-components";

const Home = () => {
  return (
    <StyledHome>
      <p>hola</p>
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.div`
  background-color: #2c2f33;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;
