import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { fetchAllUsers } from "../../store/allUsers/actions";
import { selectallUsers } from "../../store/allUsers/selectors";

function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectallUsers);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  function giveAdmin(e) {
    dispatch();
  }

  function deleteUser(e) {
    dispatch();
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
                {/* <Form>
                  <Form.Group>
                    <Form.Label>Give admin</Form.Label>
                    <Form.Control
                      type="checkbox"
                      value={isAdmin}
                      onChange={(e) => {
                        setIsAdmin(e.target.checked);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form> */}
                <Button variant="primary" type="submit" onClick={giveAdmin}>
                  Give admin power
                </Button>
                <Button variant="primary" type="submit" onClick={deleteUser}>
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
