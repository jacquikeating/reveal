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
