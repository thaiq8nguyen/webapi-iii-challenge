import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { Button, Header, Grid, Table } from "semantic-ui-react";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [isDeleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deletingUserID, setDeletingUserID] = useState(null);
  const [isEditUserOpen, setEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axios.get("/api/users");
        setUsers(users.data.users);
      } catch (errors) {
        console.log(errors);
      }
    };

    getUsers();
  }, []);

  const handleNewUser = user => {
    setUsers([...users, user]);
    setAddUserOpen(false);
  };
  const cancelAddingUser = () => {
    setAddUserOpen(false);
  };
  const handleEditingUser = user => {
    setEditingUser(user);
    setEditUserOpen(true);
  };
  const handleEditedUser = editedUser => {
    const newUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(newUsers);
    setEditUserOpen(false);
  };
  const cancelEditingUser = () => {
    setEditUserOpen(false);
  };

  const handleDeletingUser = userID => {
    setDeletingUserID(userID);
    setDeleteUserOpen(true);
  };
  const handleDeletedUser = userID => {
    const newUsers = users.filter(user => user.id !== userID);
    setUsers(newUsers);
    setDeleteUserOpen(false);
  };
  const cancelDeletingUser = () => {
    setDeleteUserOpen(false);
  };
  return (
    <>
      <Grid padded="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Users</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button color="green" onClick={() => setAddUserOpen(true)}>
              Add User
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users &&
                  users.length > 0 &&
                  users.map(user => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>
                        <Button
                          color="blue"
                          size="small"
                          onClick={() => handleEditingUser(user)}
                        >
                          Edit
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          size="small"
                          onClick={() => handleDeletingUser(user.id)}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        {/* <Button color="purple" size="small">
                          Blog Post
                        </Button> */}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <AddUser
        open={isAddUserOpen}
        handleNewUser={handleNewUser}
        handleCancel={cancelAddingUser}
      />
      {editingUser && (
        <EditUser
          open={isEditUserOpen}
          user={editingUser}
          handleEditedUser={handleEditedUser}
          handleCancel={cancelEditingUser}
        />
      )}
      <DeleteUser
        open={isDeleteUserOpen}
        userID={deletingUserID}
        handleDeletedUser={handleDeletedUser}
        cancelDeletingUser={cancelDeletingUser}
      />
    </>
  );
};

export default Users;
