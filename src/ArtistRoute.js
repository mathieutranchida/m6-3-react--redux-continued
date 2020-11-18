import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import fetchArtistProfile from "./helpers/api-helpers";

import { getArtistArray } from "./reducers/artists-reducer";

import { requestArtist, receiveArtist, receiveArtistError } from "./actions";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const artistId = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        console.log(data);
        dispatch(receiveArtist(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveArtistError());
      });
  }, [accessToken]);

  const artist = useSelector(getArtistArray);

  return (
    <>
      {artist ? (
        <Wrapper>
          <Header>
            <Avatar src={artist.images[1].url} alt="Hello" />
            <Name>{artist.name}</Name>
            <FollowersWrapper>
              {artist.followers.total >= 1000000 && (
                <FollowersCount>
                  {Math.round(artist.followers.total / 1000000)}M
                </FollowersCount>
              )}
              {artist.followers.total < 1000000 && (
                <FollowersCount>
                  {Math.round(artist.followers.total / 1000)}K
                </FollowersCount>
              )}
              <Followers>followers</Followers>
            </FollowersWrapper>
          </Header>
          <TagsWrapper>
            <TagsTitle>tags</TagsTitle>
            <TagDiv>
              {artist.genres
                .map((tag, key) => {
                  return <Tag>{tag}</Tag>;
                })
                .slice(0, 2)}
            </TagDiv>
          </TagsWrapper>
        </Wrapper>
      ) : undefined}
    </>
  );
};

const Wrapper = styled.div`
  height: 812px;
  width: 375px;
  background-color: #0b0f14;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 59px;
`;

const Avatar = styled.img`
  border-radius: 100%;
  height: 175px;
  width: 175px;
`;

const Name = styled.div`
  color: white;
  font-weight: 700;
  font-size: 48px;
  position: absolute;
  top: 173px;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const FollowersWrapper = styled.div`
  display: flex;
  font-weight: 600;
  position: absolute;
  top: 257px;
`;

const FollowersCount = styled.div`
  color: #ff4fd8;
  padding-right: 8px;
`;

const Followers = styled.div`
  color: white;
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TagsTitle = styled.div`
  position: absolute;
  top: 478px;
  color: white;
  font-weight: 600;
  font-size: 21px;
`;

const TagDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Tag = styled.div`
  padding: 8px 20px;
  color: white;
  background-color: rgba(75, 75, 75, 0.4);
  position: relative;
  top: 295px;
  font-size: 11px;
  margin: 0px 8px;
`;

export default ArtistRoute;
