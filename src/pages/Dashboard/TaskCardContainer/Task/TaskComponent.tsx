import moment from "moment";
import { Flex, Dropdown, MenuProps, Tag } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  PartitionOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Avatar from "../../../../shared/assets/avatar.jpg";
import { PointEstimate, Task, TaskTag } from "../../../../shared/schema/schema";

type TasksComponentProps = {
  task: Task;
};

const TaskComponent = ({ task }: TasksComponentProps) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Edit
        </a>
      ),
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Delete
        </a>
      ),
      icon: <DeleteOutlined />,
    },
  ];

  const points = (pointEstimate: PointEstimate) => {
    if (pointEstimate === "ZERO") return 0;
    if (pointEstimate === "ONE") return 1;
    if (pointEstimate === "TWO") return 2;
    if (pointEstimate === "FOUR") return 4;
    if (pointEstimate === "EIGHT") return 8;
    return "";
  };

  const date = (date: string) => {
    const momentString = moment(date);
    return momentString.format("D MMMM, YYYY");
  };

  const tags = (tag: TaskTag) => {
    
  };

  return (
    <StyledTask>
      <Flex className="flex">
        <h1 className="task-title">{task.name}</h1>
        <Dropdown menu={{ items }} placement="bottomRight" className="drop">
          {/* <Button> */}
          <EllipsisOutlined />
          {/* </Button> */}
        </Dropdown>
      </Flex>
      <Flex className="flex">
        <p>{points(task.pointEstimate)} Points</p>
        <div className="date">
          <ClockCircleOutlined />
          <p>{date(task.dueDate)}</p>
        </div>
      </Flex>
      <Flex className="flex-tag">{
        task.tags.map((item)=> [
        (item==="ANDROID") ? <Tag key="1" className="android">{item}</Tag> : null,
        (item==="IOS") ? <Tag key="2" className="ios">{item}</Tag> : null,
        (item==="NODE_JS") ? <Tag key="3" className="node">{item}</Tag> : null,
        (item==="RAILS") ? <Tag key="4" className="rails">{item}</Tag> : null,
        (item==="REACT") ? <Tag key="5" className="react">{item}</Tag> : null,
        ])
      }</Flex>
      <Flex className="flex">
        <div className="avatar">
          <img src={Avatar} alt="Avatar" />
        </div>
        <div className="comments">
          <LinkOutlined />
          <p>5</p>
          <PartitionOutlined />
          <p>3</p>
          <CommentOutlined />
        </div>
      </Flex>
    </StyledTask>
  );
};

export default TaskComponent;

const StyledTask = styled(Flex)`
  width: 348px;
  height: 208px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  gap: 16px;
  background: ${(props) => props.theme.colors.Neutral4};
  color: ${(props) => props.theme.colors.Neutral1};

  .flex {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: space-between;
    align-items: center;
  }

  .flex p,
  .flex-tag {
    margin: 0;
    font-size: ${(props) => props.theme.fonts.desktop.body.bold.M.fontSize};
    font-weight: ${(props) => props.theme.fonts.desktop.body.bold.M.fontWeight};
    font-family: ${(props) => props.theme.fonts.desktop.body.bold.M.fontFamily};
    letter-spacing: ${(props) =>
      props.theme.fonts.desktop.body.bold.M.letterSpacing};
    line-height: ${(props) => props.theme.fonts.desktop.body.bold.M.lineHeight};
  }
  .task-title {
    margin: 0;
    font-size: ${(props) => props.theme.fonts.desktop.body.bold.L.fontSize};
    font-weight: ${(props) => props.theme.fonts.desktop.body.bold.L.fontWeight};
    font-family: ${(props) => props.theme.fonts.desktop.body.bold.L.fontFamily};
    letter-spacing: ${(props) =>
      props.theme.fonts.desktop.body.bold.L.letterSpacing};
    line-height: ${(props) => props.theme.fonts.desktop.body.bold.L.lineHeight};
  }
  .flex-tag {
    width: 100%;
    justify-content: start;
    padding-left: 15px;
    padding-right: 15px;
  }
  .flex-tag .ios {
    color: ${(props) => props.theme.colors.Secondary4};
    border: none;
    background-color: #70b2521a;
  }
  .flex-tag .android {
    color: ${(props) => props.theme.colors.Tertiary4};
    border: none;
    background-color: #e5b4541a;
  }
  .flex-tag .node {
    color: #d808d8;
    border: none;
    background-color: #e554de3b;
  }
  .flex-tag .react {
    color: #0597c7;
    border: none;
    background-color: #56e7d44e;
  }
  .flex-tag .rails {
    color: #ad0c0c;
    border: none;
    background-color: #e5545461;
  }
  .date {
    background-color: #94979a1a;
    width: 175px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }
  .avatar img {
    width: 100%;
    border-radius: 15px;
  }
  .comments {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

`;
