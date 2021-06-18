import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../store/submissions/actions";
import { selectSubmissions } from "../../store/submissions/selectors";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";
import Dropdown from "react-bootstrap/Dropdown";
import { selectContests } from "../../store/contests/selectors";

function Submissions() {
  const dispatch = useDispatch();
  const allContests = useSelector(selectContests);
  const submissions = useSelector(selectSubmissions);
  const [selectedContest, setSelectedContest] = useState(0);

  useEffect(() => {
    dispatch(fetchSubmissions());
  }, [dispatch]);

  const activeContests = allContests.filter(
    (contests) => contests.isActive === true
  );

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Contest
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>All</Dropdown.Item>
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
      {submissions
        .filter((contestSelected) => contestSelected.id === selectedContest)
        .map((submission) => {
          return <SoundCloudPlayer soundcloudUrl={submission.soundcloudUrl} />;
        })}
    </div>
  );
}

export default Submissions;
