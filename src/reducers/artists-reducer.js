const initialState = {
  artist: null,
  status: "loading",
  error: null,
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST": {
      return {
        ...state,
        artist: action.artist,
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}

export const getArtistArray = (state) => {
  return state.artists.artist;
};
