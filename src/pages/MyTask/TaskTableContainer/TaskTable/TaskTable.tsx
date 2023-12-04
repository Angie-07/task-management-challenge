import { useState } from "react";
import styled from "styled-components";
import { Task, User } from "../../../../shared/schema/schema";
import { GET_PROFILE, GET_TASKS, GET_USERS } from "../../../../shared/services/queries";
import { useQuery } from "@apollo/client";

const TaskTable = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  // const [profile, setProfile] = useState<Array<Profile>>([]);

  const { loading: tasksLoading, error: tasksError } = useQuery(GET_TASKS, {
    variables:{
      input:{},
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
  // const {loading:profileLoading, error:profileError} = useQuery(GET_PROFILE,{
  //   onCompleted: (data) => {
  //     setProfile(data.profile ?? []);
  //   },
  // })

  return (
    <StyledTaskTable>
      <thead>
        <tr>
          <th>#Task name</th>
          <th>Task tags</th>
          <th>Estimate</th>
          <th>Task Assign Name</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {!!usersLoading && (
          <tr><td>Cargando</td></tr>
        )}
        {!!usersError &&(
          <tr><td>Error</td></tr>
        )}
        {!usersLoading && !usersError&&(
          <tr>{users.map(({id, fullName})=>{
            return(
              <td key={id}>{fullName}</td>
            )
          })}</tr>
        )}  
      </tbody>
    </StyledTaskTable>
  );
};

export default TaskTable;

const StyledTaskTable = styled.table`
  width: 80%;
  border: 1px white solid;
  color: ${(props) => props.theme.colors.Neutral1};
`;
