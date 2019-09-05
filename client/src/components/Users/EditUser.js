import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import UserForm from "./UserForm";

const EditUser = ({ open, user, handleEditedUser, handleCancel }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={{ name: user.name }}
      onSubmit={(values, actions) => {
        setLoading(true);
        axios
          .put(`/api/users/${user.id}`, values)
          .then(response => {
            handleEditedUser(response.data.user);
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
          handleCancel={handleCancel}
        />
      )}
    />
  );
};

export default EditUser;
