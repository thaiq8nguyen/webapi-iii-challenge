import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import UserForm from "./UserForm";

const AddUser = ({ open, handleNewUser, handleCancel }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          setLoading(true);
          axios
            .post("/api/users", values)
            .then(response => {
              handleNewUser(response.data.user);
              actions.resetForm();
            })
            .catch(errors => {
              console.log(errors);
            })
            .then(() => {
              setLoading(false);
            });
        }}
        render={props => (
          <UserForm
            {...props}
            header={"Add User"}
            isLoading={isLoading}
            open={open}
            header={"Edit User"}
            handleCancel={handleCancel}
          />
        )}
      />
    </>
  );
};

export default AddUser;
