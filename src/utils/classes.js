class User {
  constructor(
    displayName,
    email,
    homeCity,
    avatar,
    coverPhoto,
    bio,
    events,
    gallery
  ) {
    this.displayName = displayName;
    this.email = email;
    this.homeCity = homeCity;
    this.avatar = avatar;
    this.coverPhoto = coverPhoto;
    this.bio = bio;
    this.events = events;
    this.gallery = gallery;
  }
}

const auroraGlitter2 = new User(
  "Aurora Glitter",
  "ag@gmail.com",
  "Toronto",
  "https://reveal-images.s3.us-east-2.amazonaws.com/auroraglitter-main.jpg",
  "https://reveal-images.s3.us-east-2.amazonaws.com/auroraglitter-main.jpg",
  "Aurora Glitter is a radiant performer whose acts are a celebration of all things sparkly and fabulous. With her shimmering costumes and dazzling stage presence, Aurora brings a touch of magic to every performance. She is known for her elaborate choreography and uplifting messages of self-love and acceptance.",
  [4, 5, 7, 9],
  ["https://reveal-images.s3.us-east-2.amazonaws.com/auroraglitter-main.jpg"]
);

const jasperJinx = new User(
  "Jasper Jinx",
  "jj@gmail.com",
  "Toronto",
  "https://reveal-images.s3.us-east-2.amazonaws.com/jasperjinx-main.jpg",
  "https://reveal-images.s3.us-east-2.amazonaws.com/jasperjinx-main.jpg",
  "Jasper Jinx is a boylesque performer known for his playful and energetic style. He incorporates elements of acrobatics and comedy into his acts, making every performance a dynamic and unforgettable experience. Jasper's infectious energy and charisma make him a standout on any stage.",
  [1, 3, 8],
  ["https://reveal-images.s3.us-east-2.amazonaws.com/jasperjinx-main.jpg"]
);
