import React, { FC } from "react";
import { Modal, Button, Form } from "antd";
import { message } from "antd";

import FormCreate from "./FormCreateUser";
import FormUpdate from "../User/FormUpdateUser";

interface IProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (values: any) => void;
  title: string;
  detailData: any;
}
const ModalComponent: FC<IProps> = ({
  visible,
  onHide,
  title,
  onSubmit,
  detailData,
}) => {
  const onFinish = (values: any) => {
    if (values.Phone_Number == undefined) {
      message.error("SĐT chỉ được nhập số, vui lòng nhập lại");
    } else {
      // console.log(values);
      onSubmit(values);
    }
  };

  const handleRenderContent = () => {
    if (detailData && Object.entries(detailData).length > 0)
      return <FormUpdate data={detailData} />;
    return <FormCreate />;
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onHide}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        {handleRenderContent()}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
