import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "../../GlobalStyles";
import { useDispatch } from "react-redux";

import ArtistRoute from "../../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "3nFkdlSjzX9mRTtwJOzDYB";

// add redirect
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Route exact path="/artists/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
