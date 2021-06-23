import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { postContest } from "../../store/contests/actions";

function CreateContest() {
  const [contestName, setNameContest] = useState("");
  const [nameLength, setNameLength] = useState(contestName.length);
  const [description, setDescription] = useState("");
  const [contestLength, setContestLength] = useState(description.length);
  const [imgUrl, setImgUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  function submitForm(e) {
    e.preventDefault();
    dispatch(postContest(contestName, description, imgUrl, isActive));
  }

  return (
    <Form as={Col} md={{ span: 6, offset: 3 }}>
      <Form.Group>
        <Form.Label>Enter Name Contest</Form.Label>
        <Form.Control
          value={contestName}
          type="text"
          placeholder="Vandalized edit"
          maxLength="140"
          onChange={(e) => {
            setNameContest(e.target.value);
            setNameLength(e.target.value.length);
          }}
        />
        <p>{nameLength} / 140 </p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Contest description</Form.Label>
        <Form.Control
          value={description}
          type="text"
          placeholder="Vandalized new edition of the edit battle!"
          maxLength="140"
          onChange={(e) => {
            setDescription(e.target.value);
            setContestLength(e.target.value.length);
          }}
        />
        <p>{contestLength} / 140</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Active contest?</Form.Label>
        <Form.Control
          value={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
          type="checkbox"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image url</Form.Label>
        <Form.Control
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          type="text"
          placeholder="Insert picture Url here!"
        />
        {imgUrl ? (
          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={imgUrl} alt="preview" thumbnail />
          </Col>
        ) : null}
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit New Contest
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CreateContest;
