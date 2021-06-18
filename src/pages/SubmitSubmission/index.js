import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";
import { selectUser } from "../../store/user/selectors";

function SubmitSubmission() {
  const LoggedIn = useSelector(selectUser);
  const dispatch = useDispatch();
  const [soundcloudSubmission, setSoundcloudSubmission] = useState(
    "https://soundcloud.com/danpiamuzik/ariana-grande-3435-citypop-ver"
  );
  const [songDescription, setSongDescription] = useState(
    "The one and only winner for the edit battle (optional)"
  );
  const [descriptionLength, setDescriptionLength] = useState(
    songDescription.length
  );

  function submitForm(e) {
    e.preventDefault();
  }
  return (
    <div>
      <Jumbotron>
        <h1>Participate in the Vandalized Edit Battle!</h1>
      </Jumbotron>
      {LoggedIn.id ? (
        <Form as={Col} md={{ span: 6, offset: 3 }}>
          <h1 className="mt-5 mb-5">Send your edit thruuu!</h1>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group>
            <Form.Label>Song description</Form.Label>
            <Form.Control
              value={songDescription}
              onChange={(event) => {
                setSongDescription(event.target.value);
                setDescriptionLength(event.target.value.length);
              }}
              type="text"
              placeholder="The one and only winner for the edit battle (optional)"
              maxLength="140"
            />
            <p>{descriptionLength} / 140</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Soundcloud URL</Form.Label>
            <Form.Control
              value={soundcloudSubmission}
              onChange={(event) => setSoundcloudSubmission(event.target.value)}
              type="text"
              placeholder="https://soundcloud.com/danpiamuzik/ariana-grande-3435-citypop-ver"
              required
            />
          </Form.Group>
          <SoundCloudPlayer soundcloudUrl={soundcloudSubmission} />
          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit edit
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <h3 className="NotLoggedIn">Please Log In/Sign Up to participate!</h3>
      )}
    </div>
  );
}

export default SubmitSubmission;
