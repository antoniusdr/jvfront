import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";
import { selectUser } from "../../store/user/selectors";
import { selectContests } from "../../store/contests/selectors";
import { fetchContests } from "../../store/contests/actions";
import { postSubmission } from "../../store/submissions/actions";

function SubmitSubmission() {
  const LoggedIn = useSelector(selectUser);
  const allContests = useSelector(selectContests);
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
  const [selectedContest, setSelectedContest] = useState(0);

  const activeContests = allContests.filter(
    (contests) => contests.isActive === true
  );

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  function submitForm(e) {
    dispatch(
      postSubmission(selectedContest, soundcloudSubmission, songDescription)
    );
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
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              placeholder="Select contest"
            >
              Select Contest
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {activeContests.map((activeContest, key) => {
                return (
                  <Dropdown.Item
                    key={key}
                    onClick={() => setSelectedContest(activeContest.id)}
                  >
                    {activeContest.description}
                  </Dropdown.Item>
                );
              })}
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
