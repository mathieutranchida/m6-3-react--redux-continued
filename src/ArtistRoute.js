import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import fetchArtistProfile from "./helpers/api-helpers";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);

  const artistId = useParams();

  fetchArtistProfile(accessToken, artistId);

  // render here
};

export default ArtistRoute;
