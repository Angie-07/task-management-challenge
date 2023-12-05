import { useForm, Controller } from "react-hook-form";
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

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
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
    control,
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input placeholder="Task title" onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            name="pointEstimate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onChange={onChange}
                onBlur={onBlur}
                style={{ width: 120 }}
                options={[
                  { value: "disabled", label: "PointEstimate", disabled: true },
                  { value: 0, label: "1 Points" },
                  { value: 1, label: "2 Points" },
                  { value: 2, label: "4 Points" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="assigneeId"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onChange={onChange}
                onBlur={onBlur}
                style={{ width: 120 }}
                options={[
                  { value: "disabled", label: "assigneeId", disabled: true },
                  { value: 0, label: "Jerome Bell" },
                  { value: 1, label: "Robert Fox" },
                  { value: 2, label: "Marvin McKinney" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                style={{ width: 150 }}
                defaultValue="Label"
                suffixIcon=""
                onChange={onChange}
              >
                <Option value="option1">
                  <Checkbox value="option1" >Option 1</Checkbox>
                </Option>
                <Option value="option2">
                  <Checkbox value="option2">Option 2</Checkbox>
                </Option>
                <Option value
                ="option3">
                  <Checkbox value="option3">Option 3</Checkbox>
                </Option>
              </Select>
            )}
          />
          <Controller
            control={control}
            name="assigneeId"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker onChange={onChange} />
            )}
          />
          
          {/* <div className="form-group">
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
          </div> */}
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
