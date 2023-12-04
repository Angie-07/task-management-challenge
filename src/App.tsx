import "./App.css";
import styled from "styled-components";
import Theme from "./styles/Theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./shared/api/apolloClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import MyTask from "./pages/MyTask";

function App() {
  return (
    <Theme>
      <StyledApp>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/my-task" element={<MyTask/>} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/error-page" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </StyledApp>
    </Theme>
  );
}

export default App;

const StyledApp = styled.div`
  /* background-color: ${(props) => props.theme.colors.Neutral5}; */
`;
