import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContests } from "../../store/contests/actions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);
  return <div></div>;
}

export default Home;
