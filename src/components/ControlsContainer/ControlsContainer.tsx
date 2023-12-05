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
  Calendar,
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
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));
  // const { register, handleSubmit, errors } = useForm();

  
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    console.log(`valor ${value}`);
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
              placeholder="Task title"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="form-group">
            <Select
              {...register("pointEstimate")}
              className={`form-control ${
                errors.pointEstimate ? "is-invalid" : ""
              }`}
              style={{ width: 150 }}
              defaultValue="Label"
              suffixIcon=""
              onChange={handleChange}
            >
              {/* <Checkbox.Group value={selectedItems} onChange={handleCheckboxChange}> */}
              <Option value="option1">
                <Checkbox value="option1">Option 1</Checkbox>
              </Option>
              <Option value="option2">
                <Checkbox value="option2">Option 2</Checkbox>
              </Option>
              <Option value="option3">
                <Checkbox value="option3">Option 3</Checkbox>
              </Option>
              {/* </Checkbox.Group> */}
            </Select>
            <div className="invalid-feedback">
              {errors.pointEstimate?.message}
            </div>
          </div>

          <div className="form-group">
            <Select
              {...register("assigneeId")}
              className={`form-control ${
                errors.assigneeId ? "is-invalid" : ""
              }`}
              defaultValue="Assignee"
              suffixIcon=""
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "disabled", label: "Assignee", disabled: true },
                { value: 0, label: "Jerome Bell" },
                { value: 1, label: "Robert Fox" },
                { value: 2, label: "Marvin McKinney" },
              ]}
            />
            <div className="invalid-feedback">{errors.assigneeId?.message}</div>
          </div>

          <div className="form-group">
            <input
              type="text"
              {...register("tags")}
              className={`form-control ${errors.tags ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.tags?.message}</div>
          </div>

          <div className="form-group">
            <Select
              {...register("dueDate")}
              className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
              defaultValue="Due Date"
              suffixIcon=""
              style={{ width: 180 }}
              onChange={handleChange}
              // options={[
              //   { value: "disabled", label: "Assignee", disabled: true },
              //   { value: 0, label: "Jerome Bell" },
              //   { value: 1, label: "Robert Fox" },
              //   { value: 2, label: "Marvin McKinney" },
              // ]}
            >
              <Option className="wrapperStyle" value="option1">
                {/* <div className="wrapperStyle"> */}
                <Calendar
                  fullscreen={false}
                  value={value}
                  onSelect={onSelect}
                  onPanelChange={onPanelChange}
                />
                {/* </div> */}
              </Option>
            </Select>

            <div className="invalid-feedback">{errors.dueDate?.message}</div>
          </div>
          {/* <div className="form-group">
            <input
              type="text"
              {...register("assigneeId")}
              className={`form-control ${
                errors.assigneeId ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.assigneeId?.message}</div>
          </div> */}

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
