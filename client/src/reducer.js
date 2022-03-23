import { defaultVolume } from "./contants/controller";

export const SET_TOKEN = "SET_TOKEN";
export const SET_CURRENT = "SET_CURRENT";
export const SET_USER = "SET_USER";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_PLAYER = "SET_PLAYER";
export const SET_VOLUME = "SET_VOLUME";
export const SET_DURATION = "SET_DURATION";
export const SET_CURRENTTIME = "SET_CURRENTTIME";

export const initState = {
  isLoggedin: false,
  token: "",
  current: "",
  user: {},
  player: {
    playing: false,
    audioElement: null,
    duration: 0,
    currentTime: 0,
    volume: defaultVolume,
    track: {},
    id: 0,
  },
  // player: {
  //   playing: false,
  //   volume: 0,
  //   audioElement: null,
  //   track: {
  //     album: {
  //       album_type: "album",
  //       artists: [
  //         {
  //           external_urls: {
  //             spotify: "https://open.spotify.com/artist/1kjO72M26jZkv0aaGxJaov",
  //           },
  //           href: "https://api.spotify.com/v1/artists/1kjO72M26jZkv0aaGxJaov",
  //           id: "1kjO72M26jZkv0aaGxJaov",
  //           name: "Eric Benét",
  //           type: "artist",
  //           uri: "spotify:artist:1kjO72M26jZkv0aaGxJaov",
  //         },
  //       ],
  //       available_markets: [
  //       ],
  //       external_urls: {
  //         spotify: "https://open.spotify.com/album/0HgmysKc552d8G01TdbUa3",
  //       },
  //       href: "https://api.spotify.com/v1/albums/0HgmysKc552d8G01TdbUa3",
  //       id: "0HgmysKc552d8G01TdbUa3",
  //       images: [
  //         {
  //           height: 640,
  //           url: "https://i.scdn.co/image/ab67616d0000b2732445966c36f0249d1d437c61",
  //           width: 640,
  //         },
  //         {
  //           height: 300,
  //           url: "https://i.scdn.co/image/ab67616d00001e022445966c36f0249d1d437c61",
  //           width: 300,
  //         },
  //         {
  //           height: 64,
  //           url: "https://i.scdn.co/image/ab67616d000048512445966c36f0249d1d437c61",
  //           width: 64,
  //         },
  //       ],
  //       name: "True to Myself",
  //       release_date: "1996-09-24",
  //       release_date_precision: "day",
  //       total_tracks: 13,
  //       type: "album",
  //       uri: "spotify:album:0HgmysKc552d8G01TdbUa3",
  //     },
  //     artists: [
  //       {
  //         external_urls: {
  //           spotify: "https://open.spotify.com/artist/1kjO72M26jZkv0aaGxJaov",
  //         },
  //         href: "https://api.spotify.com/v1/artists/1kjO72M26jZkv0aaGxJaov",
  //         id: "1kjO72M26jZkv0aaGxJaov",
  //         name: "Eric Benét",
  //         type: "artist",
  //         uri: "spotify:artist:1kjO72M26jZkv0aaGxJaov",
  //       },
  //     ],
  //     available_markets: [
  //     ],
  //     disc_number: 1,
  //     duration_ms: 286973,
  //     episode: false,
  //     explicit: false,
  //     external_ids: {
  //       isrc: "USWB19600318",
  //     },
  //     external_urls: {
  //       spotify: "https://open.spotify.com/track/13fIg7eB5MP9slSQayHhjH",
  //     },
  //     href: "https://api.spotify.com/v1/tracks/13fIg7eB5MP9slSQayHhjH",
  //     id: "13fIg7eB5MP9slSQayHhjH",
  //     is_local: false,
  //     name: "Let's Stay Together - Midnight Mix",
  //     popularity: 47,
  //     preview_url:
  //       "https://p.scdn.co/mp3-preview/1f020d4c67e9b4637457be31b9bc755a75013f39?cid=c7e41fa4b13f45f997f04804cc8a8711",
  //     track: true,
  //     track_number: 4,
  //     type: "track",
  //     uri: "spotify:track:13fIg7eB5MP9slSQayHhjH",
  //   },
  //   id: 1,
  // },
  playlist: { loading: true, name: "", cover: null, tracks: [] },
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      if (action.token) {
        return { ...state, isLoggedin: true, token: action.token };
      } else {
        return { ...state, isLoggedin: false, token: action.token };
      }
    case SET_CURRENT:
      return { ...state, current: action.key };
    case SET_USER:
      return { ...state, user: action.user };
    case SET_PLAYER:
      return { ...state, player: { ...state.player, ...action.player } };
    case SET_PLAYLIST:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
      };
    case SET_VOLUME:
      return { ...state, player: { ...state.player, volume: action.volume } };
    case SET_DURATION:
      return {
        ...state,
        player: { ...state.player, duration: action.duration },
      };
    case SET_CURRENTTIME:
      return {
        ...state,
        player: {
          ...state.player,
          audioElement: {
            ...state.player.audioElement,
            currentTime: action.currentTime,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
