import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import EditProfile from "./pages/EditProfile";
import Submissions from "./pages/Submissions";
import SubmitSubmission from "./pages/SubmitSubmission";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import CreateContest from "./pages/CreateContest";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/archive" component={Archive} />
        <Route path="/submissions" component={Submissions} />
        <Route path="/submit" component={SubmitSubmission} />
        <Route path="/createcontest" component={CreateContest} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
