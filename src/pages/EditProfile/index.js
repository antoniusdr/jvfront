import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { updateProfile } from "../../store/user/actions";

function EditProfile() {
  const userInfo = useSelector(selectUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discordName, setDiscordName] = useState("");
  const [editBattleContestant, setEditBattleContestant] = useState(
    userInfo.editBattleContestant
  );
  const [instagramHandle, setInstagramHandle] = useState("");
  const [twitchHandle, setTwitchHandle] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(userInfo.emailOptIn);
  const dispatch = useDispatch();

  function submitForm(e) {
    e.preventDefault();
    dispatch(
      updateProfile(
        firstName,
        lastName,
        email,
        discordName,
        editBattleContestant,
        instagramHandle,
        twitchHandle,
        emailOptIn
      )
    );
  }

  return (
    <div>
      <Form as={Col} md={{ span: 6, offset: 3 }}>
        <h1 className="mt-5 mb-5">Edit your profile information here</h1>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            placeholder={userInfo.firstName}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            placeholder={userInfo.lastName}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder={userInfo.email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Discord ID</Form.Label>
          <Form.Control
            value={discordName}
            onChange={(event) => setDiscordName(event.target.value)}
            type="text"
            placeholder={userInfo.discordName}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            value={instagramHandle}
            onChange={(event) => setInstagramHandle(event.target.value)}
            type="text"
            placeholder="@jarreauvandal"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Twitch</Form.Label>
          <Form.Control
            value={twitchHandle}
            onChange={(event) => setTwitchHandle(event.target.value)}
            type="text"
            placeholder="twitch.tv/jarreauvandal"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Edit Battle Contestant</Form.Label>
          <Form.Control
            value={editBattleContestant}
            onChange={(event) => setEditBattleContestant(event.target.checked)}
            type="checkbox"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Receive updates via email</Form.Label>
          <Form.Control
            value={emailOptIn}
            onChange={(event) => setEmailOptIn(event.target.checked)}
            type="checkbox"
            placeholder={userInfo.firstName}
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Submit changes
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditProfile;
