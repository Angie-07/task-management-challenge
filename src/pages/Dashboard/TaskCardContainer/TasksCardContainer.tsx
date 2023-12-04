import styled from "styled-components";
import ListTasks from "./ListTasks";
import { useState } from "react";
import { Task, User } from "../../../shared/schema/schema";
import {
  GET_PROFILE,
  GET_TASKS,
  GET_USERS,
} from "../../../shared/services/queries";
import { useQuery } from "@apollo/client";

const TasksCardContainer = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [users, setUsers] = useState<Array<User>>([]);

  const { loading: tasksLoading, error: tasksError } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
    onCompleted: (data) => {
      setTasks(data.tasks ?? []);
    },
  });
  const { loading: usersLoading, error: usersError } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUsers(data.users ?? []);
    },
  });

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
  h1 {
    font-size: ${(props) => props.theme.fonts.desktop.body.bold.L.fontSize};
    font-weight: ${(props) => props.theme.fonts.desktop.body.bold.L.fontWeight};
    font-family: ${(props) => props.theme.fonts.desktop.body.bold.L.fontFamily};
    letter-spacing: ${(props) =>
      props.theme.fonts.desktop.body.bold.L.letterSpacing};
    line-height: ${(props) => props.theme.fonts.desktop.body.bold.L.lineHeight};
  }
`;
