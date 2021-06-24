import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const DELETE_USER = "DELETE_USER";

export const fetchAllUsers = (users) => ({
  type: FETCH_ALL_USERS,
  payload: users,
});

export const profileUpdated = (profile) => ({
  type: PROFILE_UPDATED,
  payload: profile,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const updateProfile = (
  firstName,
  lastName,
  email,
  discordName,
  editBattleContestant,
  instagramHandle,
  twitchHandle,
  emailOptIn,
  isAdmin
) => {
  return async (dispatch, getState) => {
    const { id } = selectUser(getState());
    const res = await axios.patch(`${apiUrl}/user/${id}`, {
      firstName,
      lastName,
      email,
      discordName,
      editBattleContestant,
      instagramHandle,
      twitchHandle,
      emailOptIn,
      isAdmin,
    });
    dispatch(profileUpdated(res.data));
    dispatch(
      showMessageWithTimeout("success", true, "Profile successfully updated!")
    );
  };
};

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (
  firstName,
  lastName,
  email,
  password,
  discordName,
  editBattleContestant,
  isAdmin
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        email,
        password,
        discordName,
        editBattleContestant,
        isAdmin,
      });

      dispatch(loginSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Welcome to the Vandal Gang!")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteProfile = () => {
  return async (dispatch, getState) => {
    try {
      const profileToDelete = await axios.delete(`${apiUrl}/user/:id/delete`);
      dispatch(deleteProfile(profileToDelete));
      dispatch(
        showMessageWithTimeout("success", false, "profile deleted", 1500)
      );
    } catch (error) {
      return console.log(error);
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
