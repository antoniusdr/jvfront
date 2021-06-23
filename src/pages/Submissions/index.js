import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../store/submissions/actions";
import { selectSubmissions } from "../../store/submissions/selectors";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";
import Dropdown from "react-bootstrap/Dropdown";

import { selectContests } from "../../store/contests/selectors";
import { fetchContests } from "../../store/contests/actions";

function Submissions() {
  const dispatch = useDispatch();
  const allContests = useSelector(selectContests);
  const submissions = useSelector(selectSubmissions);
  const [selectedContest, setSelectedContest] = useState(0);

  useEffect(() => {
    dispatch(fetchSubmissions());
    dispatch(fetchContests());
  }, [dispatch]);

  const activeContests = allContests.filter((contests) => contests.isActive);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Contest
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedContest(0)}>
            All
          </Dropdown.Item>
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

      {selectedContest === 0
        ? submissions.map((submission, key) => {
            return (
              <SoundCloudPlayer
                key={key}
                nickname={submission.nickname}
                soundcloudUrl={submission.soundcloudUrl}
                songDescription={submission.songDescription}
                userId={submission.userId}
                submissionId={submission.id}
                activeContest={true}
                contestId={submission.contestId}
              />
            );
          })
        : submissions
            .filter(
              (contestSelected) => contestSelected.contestId === selectedContest
            )
            .map((submission, key) => {
              return (
                <SoundCloudPlayer
                  key={key}
                  nickname={submission.nickname}
                  soundcloudUrl={submission.soundcloudUrl}
                  songDescription={submission.songDescription}
                  userId={submission.userId}
                  submissionId={submission.id}
                  activeContest={true}
                />
              );
            })}
    </div>
  );
}

export default Submissions;
