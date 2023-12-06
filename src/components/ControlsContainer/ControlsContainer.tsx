import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  AppstoreOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Flex, Modal, Select, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import {
  PointEstimate,
  TaskTag,
  User,
  Status,
  CreateTaskInput,
} from "../../shared/schema/schema";
import { ADD_TASK } from "../../shared/services/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS, GET_USERS } from "../../shared/services/queries";

const ControlsContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validationSchema: Yup.ObjectSchema<CreateTaskInput> =
    Yup.object().shape({
      assigneeId: Yup.string(),
      dueDate: Yup.string().required(),
      name: Yup.string().required(),
      pointEstimate: Yup.string()
        .oneOf(Object.values(PointEstimate))
        .required(),
      status: Yup.string().oneOf(Object.values(Status)).required(),
      tags: Yup.array()
        .of(Yup.string().required().oneOf(Object.values(TaskTag)))
        .required(),
    });

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

  const {
    control,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    addTask({ variables: { input: { ...getValues(), status: Status.TODO } } });
  };

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUsers(data.users ?? []);
    },
  });

  const handleSave = () => {
    try {
      onSubmit();
      reset();
      handleCancel();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("name", {
        type: "manual",
        message: "Error personalizado para el campo name",
      });
    }
  };

  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {
          input: {},
        },
      },
    ],
  });
  if (loading) return <div>Submitting...</div>;
  if (error) return <div>`Submission error! ${error.message}`</div>;

  return (
    <StyledControlsContainer>
      <Flex gap="small" wrap="wrap">
        <Button className="btn-control">
          <MenuOutlined />
        </Button>
        <Button className="btn-control">
          <AppstoreOutlined />
        </Button>
      </Flex>
      <Button onClick={showModal} className="add-btn">
        <PlusOutlined />
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        styles={{
          content: { backgroundColor: "#393d41" },
        }}
        footer={[
          <Button
            style={{
              backgroundColor: "#393d41",
              border: "none",
              color: "#ffff",
            }}
            key="cancel"
            className="btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: "#da584b",
              border: "none",
              color: "#ffff",
            }}
            key="create"
            type="primary"
            onClick={handleSave}
          >
            Create
          </Button>,
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Controller
            control={control}
            rules={{ required: "This field is required" }}
            name="name"
            render={({ field: { onChange } }) => (
              <>
                <input
                  style={{
                    marginTop: 30,
                    height: 25,
                    backgroundColor: "#393d41",
                    border: "none",
                    outline: "none",
                    color: "#ffff",
                    fontSize:'16px'
                  }}
                  placeholder="Task title"
                  onChange={onChange}
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
              render={({ field: { onChange } }) => (
                <>
                  <StyledSelect
                    onChange={onChange}
                    defaultValue="Estimate"
                    suffixIcon=""
                    options={pointEstimateOptions}
                    dropdownStyle={{
                      background: "#393D41",
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
              render={({ field: { onChange, onBlur } }) => (
                <>
                  <StyledSelect
                    onChange={onChange}
                    defaultValue="Assignee"
                    suffixIcon=""
                    onBlur={onBlur}
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
                    style={{overflowY: 'auto'}}
                  />
                  {!!errors.tags && errors.tags.message}
                </>
              )}
            />
            <Controller
              control={control}
              name="dueDate"
              render={({ field: { onChange } }) => (
                <DatePicker
                  style={{
                    width: "25%",
                    backgroundColor: "#94979a1a",
                    border: "none",
                    color:'red'
                  }}
                  onChange={onChange}
                  placeholder="Due Date"
                />
              )}
            />
          </div>
        </div>
      </Modal>
    </StyledControlsContainer>
  );
};

export default ControlsContainer;

const StyledControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  Button {
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.Neutral1};
  }
  .btn-control:focus {
    border: 1px solid ${(props) => props.theme.colors.Primary4};
    color: ${(props) => props.theme.colors.Primary4};
  }
  .add-btn {
    background-color: ${(props) => props.theme.colors.Primary4};
    color: ${(props) => props.theme.colors.Neutral1};
  }
`;

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
