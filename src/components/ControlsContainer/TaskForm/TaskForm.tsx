import { DatePicker, Select, Tag } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { PointEstimate, TaskTag, User } from "../../../shared/schema/schema";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import moment from "moment";
import dayjs from "dayjs";

type TaskFormProps = {
  users: User[];
};

const TaskForm = ({ users }: TaskFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const optionsUsers = users.map((user) => {
    return {
      value: user.id,
      label: user.fullName,
    };
  });

  const pointEstimateOptions = Object.entries(PointEstimate).map(
    ([key, value]) => ({
      value: value,
      label:
        key === "ZERO"
          ? "0 points"
          : key === "ONE"
          ? "1 point"
          : key === "TWO"
          ? "2 points"
          : key === "FOUR"
          ? "4 points"
          : key === "EIGHT"
          ? "8 points"
          : key + "points",
    })
  );

  type TaskTagKey = keyof typeof TaskTag;
  const taskTagOptions = Object.keys(TaskTag).map((key) => ({
    value: TaskTag[key as TaskTagKey],
    label: key,
  }));

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="warning"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <Controller
        control={control}
        rules={{ required: "This field is required" }}
        name="name"
        render={({ field: { onChange, value } }) => (
          <>
            <input
              style={{
                marginTop: 30,
                height: 25,
                backgroundColor: "#393d41",
                border: "none",
                outline: "none",
                color: "#ffff",
                fontSize: "16px",
              }}
              placeholder="Task title"
              onChange={onChange}
              value={value}
            />
            {!!errors.name && errors.name.message}
          </>
        )}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="pointEstimate"
          render={({ field: { onChange, value } }) => (
            <>
              <StyledSelect
                onChange={onChange}
                defaultValue="Estimate"
                value={value}
                suffixIcon=""
                options={pointEstimateOptions}
                dropdownStyle={{
                  background: "#393D41",
                  color: "#ffff",
                }}
              />
              {!!errors.pointEstimate && errors.pointEstimate.message}
            </>
          )}
        />
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="assigneeId"
          render={({ field: { onChange, value } }) => (
            <>
              <StyledSelect
                onChange={onChange}
                defaultValue="Assignee"
                value={value}
                suffixIcon=""
                style={{ width: "25%" }}
                options={optionsUsers}
                dropdownStyle={{
                  background: "#393D41",
                }}
              />
              {!!errors.assigneeId && errors.assigneeId.message}
            </>
          )}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <>
              <StyledSelect
                mode="multiple"
                suffixIcon=""
                placeholder="Label"
                tagRender={tagRender}
                value={value}
                options={taskTagOptions}
                onChange={onChange}
                style={{ overflowY: "auto", color: "#fff", }}
              />
              {!!errors.tags && errors.tags.message}
            </>
          )}
        />
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              style={{
                width: "25%",
                backgroundColor: "#94979a1a",
                border: "none",
                color: "red",
              }}
              onChange={onChange}
              placeholder="Due Date"
              value={value ? dayjs(value) : null}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TaskForm;

const StyledSelect = styled(Select)`
  width: 25%;
  height: 35px;
  background-color: #94979a1a !important;
  div {
    background-color: #94979a1a !important;
    border: none !important;
    color: ${(props) => props.theme.colors.Neutral1} !important;
  }
`;
