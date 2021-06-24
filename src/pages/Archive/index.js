import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../store/submissions/actions";
import { selectSubmissions } from "../../store/submissions/selectors";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";
import Dropdown from "react-bootstrap/Dropdown";
import { selectContests } from "../../store/contests/selectors";
import { fetchContests } from "../../store/contests/actions";

function Archive() {
  const dispatch = useDispatch();
  const allContests = useSelector(selectContests);
  const submissions = useSelector(selectSubmissions);
  const [selectedContest, setSelectedContest] = useState(0);

  useEffect(() => {
    dispatch(fetchSubmissions());
    dispatch(fetchContests());
  }, [dispatch]);

  const inactiveContests = allContests.filter(
    (contests) => contests.isActive === false
  );

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
          {inactiveContests.map((activeContest, key) => {
            return (
              <Dropdown.Item
                key={key}
                onClick={() => setSelectedContest(activeContest.id)}
              >
                {activeContest.contestName}
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
                activeContest={false}
                contestId={submission.contestId}
                trackScore={submission.trackScore}
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
                  activeContest={false}
                  contestId={submission.contestId}
                  trackScore={submission.trackScore}
                />
              );
            })}
    </div>
  );
}

export default Archive;
