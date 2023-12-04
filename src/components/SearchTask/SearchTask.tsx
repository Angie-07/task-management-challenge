import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Input, Space, Image } from "antd";
import styled from "styled-components";

const SearchTask = () => {
  return (
    <StyledSearch
      size="large"
      type="text"
      placeholder="Search"
      prefix={<SearchOutlined style={{ fontSize: "16px" }} />}
      suffix={
        <Space style={{ gap: "20px" }}>
          <BellOutlined style={{ fontSize: "16px" }} />
          <Image
            width={23}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
        </Space>
      }
    />
  );
};

export default SearchTask;

const StyledSearch = styled(Input)`
  background-color: #2e2f33;
  display: flex;
  gap: 10px;
  border: none;
  color: #7d7e81;
  height: 45px;
  font-size: 13px;
  input {
    background-color: #2e2f33;
    color: #ffff;
  }
  ::placeholder {
    color: #7d7e81;
  }
`;
