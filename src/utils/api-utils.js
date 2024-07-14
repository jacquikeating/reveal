const API_URL = import.meta.env.VITE_API_URL;

// USERS -----------------------------------------------------------
export function getUsersListEndpoint() {
  return API_URL + "/users";
}

export function getSingleUserEndpoint(id) {
  return API_URL + "/users/" + id;
}

export const emptyUserData = {
  name: "Unknown Name",
  bio: "No bio available",
  cover_photo: "/src/assets/icons/arrow-right.svg",
};

// EVENTS ----------------------------------------------------------
export function getEventsListEndpoint() {
  return API_URL + "/events";
}

export function getSingleEventEndpoint(id) {
  return API_URL + "/events/" + id;
}

export const emptyEventData = {
  name: "Unknown Name",
  city: "Somewhere...",
  month: " ",
  day: " ",
  main_image:
    "https://reveal-images.s3.us-east-2.amazonaws.com/image-placeholder.png",
  description: "No description found",
  venue: "Unknown",
  doors_time: " ",
  start_time: " ",
  end_time: " ",
  producer: " ",
  ticket_prices: {
    advanceGA: 0,
  },
  performers: [],
  buy_tickets: " ",
};

// POSTS ----------------------------------------------------------
export function getPostsListEndpoint() {
  return API_URL + "/posts";
}

export function getFilteredPostsListEndpoint(id) {
  return API_URL + "/posts/by-user/" + id;
}

export function getSinglePostEndpoint(id) {
  return API_URL + "/posts/" + id;
}

export function postPostEndpoint() {
  return API_URL + "/posts/";
}

export const emptyPostsData = [
  {
    id: 1,
    username: "Scarlet Siren",
    avatar: "../src/assets/icons/avatar-placeholder.png",
    timestamp: new Date().toLocaleDateString("en-US"),
    content:
      "I'm the hottest post on this site! (Mostly because I'm the first post.)",
    likes: 0,
    comments: [],
  },
  {
    id: 2,
    username: "Test User",
    avatar: "../src/assets/icons/avatar-placeholder.png",
    timestamp: new Date().toLocaleDateString("en-US"),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eos inventore natus corrupti.",
    likes: 0,
    comments: [],
  },
];

// MISC
export function convertFormToJson(data) {
  const MAP_FORM_TO_JSON_BODY = {
    content: "content",
  };
  let toRet = {};
  for (let key of Object.keys(data)) {
    toRet[MAP_FORM_TO_JSON_BODY[key]] = data[key];
  }
  return toRet;
}
