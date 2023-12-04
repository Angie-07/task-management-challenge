import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  AppstoreOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Calendar, Checkbox, Flex, Modal, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";
const { Option } = Select;

const ControlsContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  //
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
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
        okText="Create"
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#da584b" } }}
        cancelButtonProps={{
          style: { border: "none", backgroundColor: "#393d41", color: "#ffff" },
        }}
        styles={{
          content: { backgroundColor: "#393d41" },
        }}
      >
        <input type="text" placeholder="Task title" />
        <Flex>
          <Select
            defaultValue="Estimate"
            suffixIcon=""
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "disabled", label: "Estimate", disabled: true },
              { value: 0, label: "0 Points" },
              { value: 1, label: "1 Points" },
              { value: 2, label: "2 Points" },
              { value: 2, label: "4 Points" },
              { value: 2, label: "8 Points" },
            ]}
          />
          <Select
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

          <Select
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

          <Select
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
            <Option  className="wrapperStyle" value="option1">
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
        </Flex>
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
  .wrapperStyle{
    width: 60px;
  }
`;
