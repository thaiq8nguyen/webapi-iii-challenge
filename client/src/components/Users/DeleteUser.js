import React from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";
const DeleteUser = ({
  open,
  userID,
  handleDeletedUser,
  cancelDeletingUser
}) => {
  const deleteUser = () => {
    axios
      .delete(`/api/users/${userID}`)
      .then(response => {
        if (!response.data.error) {
          handleDeletedUser(userID);
        }
      })
      .catch(errors => {
        console.log(errors);
      });
  };
  return (
    <>
      <Modal open={open} size="small">
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Content>Are you sure you want to delete the user?</Modal.Content>
        <Modal.Actions>
          <Button onClick={cancelDeletingUser}>No</Button>
          <Button onClick={deleteUser} primary>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteUser;
