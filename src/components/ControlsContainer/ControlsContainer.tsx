import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  AppstoreOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  DatePickerProps,
  Flex,
  Modal,
  Select,
} from "antd";
import { useState } from "react";
import styled from "styled-components";
import {
  PointEstimate,
  Task,
  TaskTag,
  User,
  UserType,
  Status,
  CreateTaskInput,
} from "../../shared/schema/schema";

const { Option } = Select;

const ControlsContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { register, handleSubmit, errors } = useForm();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: CreateTaskInput) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <StyledControlsContainer>
      {/* <ConfigProvider
        theme={{
          token: {
            colorBorderBg:"#da584b",
            colorText: "#da584b",
            colorBgTextActive:"#da584b"
          },
        }}
      > */}
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
        // okText="Create"
        // onOk={handleOk}
        onCancel={handleCancel}
        // okButtonProps={{ style: { backgroundColor: "#da584b" } }}
        // cancelButtonProps={{
        //   style: { border: "none", backgroundColor: "#393d41", color: "#ffff" },
        // }}
        styles={{
          content: { backgroundColor: "#393d41" },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="form-group">
            <input
              type="text"
              {...register("pointEstimate")}
              className={`form-control ${
                errors.pointEstimate ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.pointEstimate?.message}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              {...register("assigneeId")}
              className={`form-control ${
                errors.assigneeId ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.assigneeId?.message}</div>
          </div>

          <div className="form-group">
            <input
              type="password"
              {...register("tags")}
              className={`form-control ${errors.tags ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.tags?.message}</div>
          </div>

          <div className="form-group">
            <input
              type="password"
              {...register("dueDate")}
              className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.dueDate?.message}</div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </Modal>
      {/* </ConfigProvider> */}
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

  .modal {
    div {
      background-color: ${(props) => props.theme.colors.Primary4};
    }
  }
  .wrapperStyle {
    width: 60px;
  }
`;
