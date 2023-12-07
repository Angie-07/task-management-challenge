import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  AppstoreOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";
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
import TaskForm from "./TaskForm";

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

  const createUseFormContext = useForm<CreateTaskInput>({
    resolver: yupResolver(validationSchema),
  });

  const { setError, getValues, reset } = createUseFormContext;

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
  if (error) return <div>Submission error! ${error.message}</div>;

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
        <FormProvider {...createUseFormContext}>
          <TaskForm users={users} />
        </FormProvider>
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
