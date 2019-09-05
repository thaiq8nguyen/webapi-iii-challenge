import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
const UserForm = ({
  values,
  handleChange,
  handleSubmit,
  header,
  open,
  isLoading,
  handleCancel
}) => {
  return (
    <>
      <Modal open={open} size="small">
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={values.name}
            />
            <Form.Button loading={isLoading} type="submit">
              Submit
            </Form.Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCancel}>Close</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UserForm;
