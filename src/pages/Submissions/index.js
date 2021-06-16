import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../store/submissions/actions";
import { selectSubmissions } from "../../store/submissions/selectors";
import SoundCloudPlayer from "../../components/SoundCloudPlayer";

function Submissions() {
  const dispatch = useDispatch();
  const submissions = useSelector(selectSubmissions);

  useEffect(() => {
    dispatch(fetchSubmissions());
  }, [dispatch]);
  console.log(submissions);
  return (
    <div>
      {submissions.map((submission) => {
        return <SoundCloudPlayer soundcloudUrl={submission.soundcloudUrl} />;
      })}
    </div>
  );
}

export default Submissions;
