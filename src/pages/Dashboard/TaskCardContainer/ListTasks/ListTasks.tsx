import styled from "styled-components";
import { Task } from "../../../../shared/schema/schema";
import TaskComponent from "../Task/TaskComponent";

type ListTasksProps = {
  title: string;
  listTasks: Array<Task>;
};

const ListTasks = ({ listTasks, title }: ListTasksProps) => {
  const tasks = listTasks.filter((item) => item.status === title);
  console.log(tasks);
  return (
    <StyledListTasks>
      <h1>{title}</h1>
      {tasks.map((task, key) => {
        return <TaskComponent key={key} task={task} />;
      })}
    </StyledListTasks>
  );
};

export default ListTasks;

const StyledListTasks = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
