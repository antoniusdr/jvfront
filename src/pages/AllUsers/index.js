import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { fetchAllUsers } from "../../store/allUsers/actions";
import { selectallUsers } from "../../store/allUsers/selectors";
import { deleteProfile, updateProfile } from "../../store/user/actions";

function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectallUsers);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  function giveAdmin(e) {
    dispatch(updateProfile({ isAdmin: true }));
  }

  function deleteUser(e) {
    dispatch(deleteProfile());
  }

  return (
    <>
      <h1>All users</h1>

      {allUsers?.map((user) => {
        return (
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Container>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
                <Button variant="primary" type="submit" onClick={giveAdmin}>
                  Give admin power
                </Button>{" "}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={deleteUser}
                  value={user.id}
                >
                  Delete user
                </Button>
              </Container>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default AllUsers;
