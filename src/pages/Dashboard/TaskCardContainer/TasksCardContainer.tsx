import styled from "styled-components";
import ListTasks from "./ListTasks";
import {
  GET_TASKS,
} from "../../../shared/services/queries";
import { useQuery } from "@apollo/client";

const TasksCardContainer = () => {
  const {
    loading: tasksLoading,
    error: tasksError,
    data,
  } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  });

  const tasks = data?.tasks ?? [];

  return (
    <StyledTaskCardContainer>
      <ListTasks title="TODO" listTasks={tasks} />
      <ListTasks title="BACKLOG" listTasks={tasks} />
      <ListTasks title="CANCELLED" listTasks={tasks} />
      <ListTasks title="IN_PROGRESS" listTasks={tasks} />
      <ListTasks title="DONE" listTasks={tasks} />
    </StyledTaskCardContainer>
  );
};

export default TasksCardContainer;
const StyledTaskCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 15px;
  color: ${(props) => props.theme.colors.Neutral1};
  overflow-x: auto;
  h1 {
    font-size: ${(props) => props.theme.fonts.desktop.body.bold.L.fontSize};
    font-weight: ${(props) => props.theme.fonts.desktop.body.bold.L.fontWeight};
    font-family: ${(props) => props.theme.fonts.desktop.body.bold.L.fontFamily};
    letter-spacing: ${(props) =>
      props.theme.fonts.desktop.body.bold.L.letterSpacing};
    line-height: ${(props) => props.theme.fonts.desktop.body.bold.L.lineHeight};
  }
`;
