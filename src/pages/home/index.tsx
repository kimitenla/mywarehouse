import React, { useState } from "react";
import { message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

import Table from "../../components/Home/Table";
import Modal from "../../components/Home/Modal";
import { HomeActions } from "../../redux/reducers/home";
import Layout1 from "../layout";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [itemSeleted, setItemSeleted] = useState<any>({});
  const [isCreate, setIsCreate] = useState(true);

  const { data } = useAppSelector((state) => state.home);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(HomeActions.GET_LIST_REQUREST());
  }, []);
  //BEGIN MEETUP
  const onOpenCreate = () => {
    setIsCreate(true);
    onOpenModal();
    setTitleModal("Thêm cuộc họp");
  };
  const onOpenModal = () => setVisible(true);
  const onCloseModal = () => {
    // check neu value == true (nghia la dang la modal create) thi ko lam gi het, nguoc lai thi clear data detail di
    if (!isCreate) setItemSeleted({});
    setVisible(false);
  };
  const onOpenUpdate = (item: any) => {
    setIsCreate(false);
    setItemSeleted(item);
    onOpenModal();
    setTitleModal("Cập nhật");
  };

  const handleSubmit = (value: any) => {
    // h xu ly them 1 chut cho dep

    dispatch(
      HomeActions.CREATE_TODO_REQUREST(
        // cai dong o duoi goi la payload
        {
          data: value,
          cb: (res: any) => {
            // cho nay chung ta kieu set cai tham so co gia tri boolean == true thi chay khuc trong if (ngoai ra ta co the truyen bat cu thu gi vao func cb)
            if (res) {
              console.log(res, "res");
              onCloseModal();
              setTitleModal("");
              message.success("Thêm thành công");
            }
          },
        }
      )
    );
  };
  const handleUpdate = (values: any) => {
    dispatch(
      HomeActions.UPDATE_TODO_REQUREST({
        data: values,
        id: itemSeleted._id,
        cb: (res: any) => {
          if (res) {
            onCloseModal();
            setTitleModal("");
            message.success("Cập nhật thành công");
          }
        },
      })
    );
  };
  const DeleteHandle = (item: any) => {
    dispatch(
      HomeActions.DELETE_TODO_REQUREST({
        id: item._id,
        cb: (res: any) => {
          if (res) {
            message.success("Xoá thành công");
          }
        },
      })
    );
  };
  //END MEETUP
  console.log(itemSeleted, "itemSeleted");
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "manager") {
    return (
      <Layout1>
        <Button type="primary" size="large" onClick={onOpenCreate}>
          Tạo cuộc họp <PlusOutlined />
        </Button>

        <Table
          data={data}
          onOpenUpdate={onOpenUpdate}
          onDeleteHandle={DeleteHandle}
        />
        <Modal
          title={titleModal}
          visible={visible}
          onHide={onCloseModal}
          onSubmit={isCreate ? handleSubmit : handleUpdate}
          detailData={itemSeleted}
        />
      </Layout1>
    );
  } else {
    return (
      <Layout1>
        <Table
          data={data}
          onOpenUpdate={onOpenUpdate}
          onDeleteHandle={DeleteHandle}
        />
        <Modal
          title={titleModal}
          visible={visible}
          onHide={onCloseModal}
          onSubmit={isCreate ? handleSubmit : handleUpdate}
          detailData={itemSeleted}
        />
      </Layout1>
    );
  }
};

export default Home;
