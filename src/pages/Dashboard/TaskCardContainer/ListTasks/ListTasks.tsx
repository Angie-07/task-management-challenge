import { Task } from "../../../../shared/schema/schema";
import TaskComponent from "../Task/TaskComponent";

type ListTasksProps = {
  title: string;
  listTasks: Array<Task>;
};

const ListTasks = ({ listTasks, title }: ListTasksProps) => {
  const tasks = listTasks.filter((item) => item.status === title);
    console.log(tasks)
  return (
    <div>
      <h1>{title}</h1>
      {tasks.map((task, key) => {
        return <TaskComponent key={key} task={task} />;
      })}
    </div>
  );
};

export default ListTasks;
