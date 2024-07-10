# Reveal

## Overview & Problem

Reveal is a social media site built especially for local burlesque communities. Burlesque performers and event organizers rely on social media for promotion and engagement, but there are several problems with the existing mainstream platforms:

**1. Over-moderation:** Users are often shadowbanned or suspended for posting risqué content, even when that content is not explicit and is within the platform's TOS.

**2. Fragmentation:** Performers and organizers must use several different social media sites for promotion. This can be difficult to manage.

**3. Poor discoverability:** Existing search functionalities are lacking, making it a challenge to find local events. Some communities have resorted to keeping a plain text Google Doc of all upcoming shows in their area. Not only must these lists be manually maintained, they are not visually appealing and do little to encourage ticket sales.

Reveal aims to address these pain points by providing a network specifically designed for the burlesque world.

## User Profile

Burlesque performers of all experience levels may be Reveal's most important users, but they will not be the only ones. Producers and venue owners will be able to use Reveal to recruit performers and promote their upcoming events. Burlesque fans can follow their favourite artists, revisit the best moments of shows they've been to with photo and video galleries, and discover enticing events to go to next. Finally, the "burlesque-curious" will find Reveal to be a repository of information and inspiration, as well as a natural medium to connect with local mentors and schools should they dream of getting on stage themselves!

### User Stories

- _As a site visitor, I can see a list of all upcoming shows in my area, and click on one to view its full details, so that I can find events to go to._
- _As a burlesque performer, I can promote myself and my upcoming shows via both my profile page and posts, so that I can grow my audience._
- _As a burlesque fan, I can easily see all of my favourite performers' media on their profle page, so that I don't have to dig through YouTube, Instagram, or TikTok to search for them individually._
- _As a producer or venue owner, I can organize and promote upcoming events to an interested target audience so that I can sell more tickets._

## Features

- robust user profile pages
- followers
- text posts (similar to tweets, with higher character limit)
- like, comment on, and share posts
- newsfeed
- photo & video albums
- detailed event pages
- event listings

## Implementation

### Tech Stack

<p align="left"> 
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>

</p>

### Sitemap

![sitemap](./development/sitemap.png)

### Mockups

- See https://github.com/jacquikeating/reveal/tree/develop/development/mockups

### Data

![data diagram](./development/data-diagram.png)

### Endpoints

**GET /users** - Fetch the list of all users, with limited data

```
[{
    "id": 1,
    "name": "John Doe",
    "avatar": "/path/image.png"
}]

```

**GET /users/:userId** - Fetch detailed data for a specific user

```
{
    "id": 1,
    "name": "John Doe",
    "avatar": "/path/image.png",
    "cover_photo": "/path/bigger-image.png",
    "bio": "Lorem ipsum dolor sit amet...",
    "events": [{
        "id": 1,
        "name": "Some Event",
        "main_image": "/path/event-image.png",
        "date": "1 January 2025"
    }],
    "gallery": [{
        "id": 1,
        "image": "/path/image.png",
        "caption": "Lorem ipsum dolor sit amet..."
    }],
    "posts": [{
        "id": 1,
        "user_id": 1,
        "avatar": "/path/image.png",
        "content": "Lorem ipsum dolor sit amet...",
        "timestamp": 12345678901234567,
        "hashtags": ["hashtag1", "hashtag2"],
        "likes": 0,
        "comments": [{
            "id": 1,
            "user_id": 1,
            "content": "Lorem ipsum dolor sit amet...",
            "timestamp": 12345678901234567,
            "likes": 0
        }]
    }]
}
```

**POST /users** - Create a new user

```
{
    "id": 1,
    "name": "John Doe",
    "email": "johns-email@email.com",
    "home_city": "City",
    "password": "password",
    "avatar": "/path/image.png",
    "cover_photo": "/path/bigger-image.png",
    "bio": "Lorem ipsum dolor sit amet...",
    "events": [],
    "gallery": [],
    "posts": []
}
```

**PUT /users/:userId** - Edit a specific user's data

```
{
    "id": 1,
    "name": "John Doe",
    "avatar": "/path/image.png",
    "cover_photo": "/path/bigger-image.png",
    "bio": "Lorem ipsum dolor sit amet...",
    "events": [{
        "id": 1,
        "name": "Some Event",
        "main_image": "/path/event-image.png",
        "date": "1 January 2025"
        }],
    "gallery": [{
        "id": 1,
        "image": "/path/image.png",
        "caption": "Lorem ipsum dolor sit amet..."
        }],
    "posts": [{
        "id": 1,
        "user_id": 1,
        "avatar": "/path/image.png",
        "content": "Lorem ipsum dolor sit amet...",
        "timestamp": 12345678901234567,
        "hashtags": ["hashtag1", "hashtag2"],
        "likes": 0,
        "comments": [{
            "id": 1,
            "user_id": 1,
            "content": "Lorem ipsum dolor sit amet...",
            "timestamp": 12345678901234567,
            "likes": 0
        }]
    }]
}
```

**DELETE /users/:userId** - Delete a specific user

```
{
   "id": 1,
   "name": "John Doe",
   "avatar": "/path/image.png",
   "cover_photo": "/path/bigger-image.png",
   "bio": "Lorem ipsum dolor sit amet...",
   "events": [{
       "id": 1,
       "name": "Some Event",
       "main_image": "/path/event-image.png",
       "date": "1 January 2025"
   }],
   "gallery": [{
       "id": 1,
       "image": "/path/image.png",
       "caption": "Lorem ipsum dolor sit amet..."
   }],
   "posts": [{
       "id": 1,
       "user_id": 1,
       "avatar": "/path/image.png",
       "content": "Lorem ipsum dolor sit amet...",
       "timestamp": 12345678901234567,
       "likes": 0,
       "comments": [{
           "id": 1,
           "user_id": 1,
           "content": "Lorem ipsum dolor sit amet...",
           "timestamp": 12345678901234567,
           "hashtags": ["hashtag1", "hashtag2"],
           "likes": 0
       }]
   }]
}
```

**GET /events** - Fetch the list of all events, with limited data

```
[{
    "id": 1,
    "name": "Some Event",
    "main_image": "/path/image.png",
    "date": "1 January 2025"
}]
```

**GET /events/:eventId** - Fetch detailed data for a specific event

```
{
   "id": 1,
   "name": "Some Event",
   "main_image": "/path/image.png",
   "date": "1 January 2025",
   "doors_time": "7:00 PM",
   "start_time": "8:00 PM",
   "end_time": "11:00 PM",
   "city": "City",
   "venue": "Imaginary Place",
   "venue_address": "123 Fake Street",
   "ticket_prices": {
       "general": 25.00,
       "vip": 50.00,
       "table": 120.00
   },
   "producer": "Jane Doe",
   "performers": [
       {
           "id": 1,
           "name": "John Doe",
           "avatar: "/path/image.png"
       },
   ],
   "gallery": [
       {"id": 1,
       "image": "/path/image.png"
   }],
   "posts": [{
       "id": 1,
       "user_id": 1,
       "avatar": "/path/image.png",
       "content": "Lorem ipsum dolor sit amet...",
       "timestamp": 12345678901234567,
       "hashtags": ["hashtag1", "hashtag2"],
       "likes": 0,
       "comments": [{
           "id": 1,
           "user_id": 1,
           "content": "Lorem ipsum dolor sit amet...",
           "timestamp": 12345678901234567,
           "likes": 0
       }]
   }]
}
```

**POST /events** - Add a new event

```
{
   "id": 1,
   "name": "Some Event",
   "main_image": "/path/image.png",
   "date": "1 January 2025",
   "doors_time": "7:00 PM",
   "start_time": "8:00 PM",
   "end_time": "11:00 PM",
   "city": "City",
   "venue": "Imaginary Place",
   "venue_address": "123 Fake Street",
   "ticket_prices": {
       "general": 25.00,
       "vip": 50.00,
       "table": 120.00
   },
   "producer": "Jane Doe",
   "performers": [
       {
       "id": 1,
       "name": "John Doe",
       "avatar: "/path/image.png"
       }],
   "gallery": [
       {"id": 1,
       "image": "/path/image.png"
       }],
   "posts": [{
       "id": 1,
       "user_id": 1,
       "avatar": "/path/image.png",
       "content": "Lorem ipsum dolor sit amet...",
       "timestamp": 12345678901234567,
       "hashtags": ["hashtag1", "hashtag2"],
       "likes": 0,
       "comments": [{
           "id": 1,
           "user_id": 1,
           "content": "Lorem ipsum dolor sit amet...",
           "timestamp": 12345678901234567,
           "likes": 0
       }]
   }]
}
```

**PUT /events/:eventId** - Edit a specific event's data

```
{
    "id": 1,
    "name": "Some Event",
    "main_image": "/path/image.png",
    "date": "1 January 2025",
    "doors_time": "7:00 PM",
    "start_time": "8:00 PM",
    "end_time": "11:00 PM",
    "city": "City",
    "venue": "Imaginary Place",
    "venue_address": "123 Fake Street",
    "ticket_prices": {
        "general": 25.00,
        "vip": 50.00,
        "table": 120.00
        },
    "producer": "Jane Doe",
    "performers": [
        {
        "id": 1,
        "name": "John Doe",
        "avatar: "/path/image.png"
        }],
    "gallery": [
        {"id": 1,
        "image": "/path/image.png"
        }],
    "posts": [{
        "id": 1,
        "user_id": 1,
        "avatar": "/path/image.png",
        "content": "Lorem ipsum dolor sit amet...",
        "timestamp": 12345678901234567,
        "hashtags": ["hashtag1", "hashtag2"],
        "likes": 0,
        "comments": [{
            "id": 1,
            "user_id": 1,
            "content": "Lorem ipsum dolor sit amet...",
            "timestamp": 12345678901234567,
            "likes": 0
        }]
    }]
}
```

**DELETE /events/:eventId** - Delete a specific event

```
{
   "id": 1,
   "name": "Some Event",
   "main_image": "/path/image.png",
   "date": "1 January 2025",
   "doors_time": "7:00 PM",
   "start_time": "8:00 PM",
   "end_time": "11:00 PM",
   "city": "City",
   "venue": "Imaginary Place",
   "venue_address": "123 Fake Street",
   "ticket_prices": {
   "general": 25.00,
   "vip": 50.00,
   "table": 120.00
   },
   "producer": "Jane Doe",
   "performers": [
       {
       "id": 1,
       "name": "John Doe",
       "avatar: "/path/image.png"
       }],
   "gallery": [
       {"id": 1,
       "image": "/path/image.png"
       }],
   "posts": [{
       "id": 1,
       "user_id": 1,
       "avatar": "/path/image.png",
       "content": "Lorem ipsum dolor sit amet...",
       "likes": 0
       }],
       "comments": [{
           "id": 1,
           "user_id": 1,
           "content": "Lorem ipsum dolor sit amet...",
           "timestamp": 12345678901234567,
           "hashtags": ["hashtag1", "hashtag2"],
           "likes": 0,
       }]
   }]
}
```

**GET /posts** - Fetch the list of all posts, with limited data

```
[{
    "id": 1,
    "user_id": 1,
    "content": "Lorem ipsum dolor sit amet...",
    "timestamp": 12345678901234567,
    "hashtags": ["hashtag1", "hashtag2"],
    "likes": 0
}]
```

**GET /posts/:postId** - Fetch full data for a specific post

```
{
    "id": 1,
    "user_id": 1,
    "content": "Lorem ipsum dolor sit amet...",
    "timestamp": 12345678901234567,
    "hashtags": ["hashtag1", "hashtag2"],
    "likes": 0,
    "comments": [{
        "id": 1,
        "user_id": 1,
        "content": "Lorem ipsum dolor sit amet...",
        "likes": 0
    }]
}
```

**POST /posts** - Make a new post

```
{
    "id": 1,
    "user_id": 1,
    "content": "Lorem ipsum dolor sit amet...",
    "timestamp": 12345678901234567,
    "hashtags": ["hashtag1", "hashtag2"],
    "likes": 0,
    "comments": []
}
```

**PUT /posts/:postId** - Edit a specific post

```
{
    "id": 1,
    "user_id": 1,
    "content": "Lorem ipsum dolor sit amet...",
    "timestamp": 12345678901234567,
    "hashtags": ["hashtag1", "hashtag2"],
    "likes": 0,
    "comments": [{
        "id": 1,
        "user_id": 1,
        "content": "Lorem ipsum dolor sit amet...",
        "likes": 0
    }]
}
```

**DELETE /posts/:postId** - Delete a specific post

```
{
    "id": 1,
    "user_id": 1,
    "content": "Lorem ipsum dolor sit amet...",
    "timestamp": 12345678901234567,
    "hashtags": ["hashtag1", "hashtag2"],
    "likes": 0,
    "comments": [{
        "id": 1,
        "user_id": 1,
        "content": "Lorem ipsum dolor sit amet...",
        "likes": 0
    }]
}
```

### Auth

- Facebook/Instagram OAuth

## Roadmap

_Philosophy: Begin with barebones construction of all components and functionality. Refine in stages. Test and address bugs throughout. Alternate frontend and backend tasks._

### Sprint 1

- Monday: Build skeleton React components with layout styling only, beginning with mobile and then adjusting for tablet and desktop sizes
- Tuesday: Review past projects and use as reference to begin building functionality
- Wednesday: Backend — integrate database and API
- Thursday: Aesthetic styling, first pass — base theme and typography for all components
- Friday: Complete backend-frontend integration and functionality
- Saturday: Aesthetic styling, second pass — refine design
- Sunday: Squash bugs and finalize deliverables

### Sprint 2

- Deploy prototype version
- Improve upon existing pages and features
- Begin implementing high priority nice-to-have features

## Nice-to-Haves

### High Priority

- Upload videos to profiles and event pages
- Images and videos in posts
- Calender view for events listings
- Venue/business pages
- Search feature
- Light theme: Reveal is prioritizing dark theme for a more comfortable user experience while actually at burlesque shows. Later on, it will also offer a light option for users who prefer it.
- Expanded listings: In addition to events, provide directories for local burlesque organizations, teachers/schools, venues, or performers.
- Save events: Users can create a list of events they are interested in so that it's more convenient to check the details again later.

### Lower Priority

- Report posts
- Live chat/DMs
- Email auth option
- Block users
- Settings page
- Buy tickets directly through Reveal, rather than linking to external sites
- Expanded scope: During early development, the content scope will be limited to Toronto only. This will later be expanded to all of Canada, then to an international audience.
- Integration with other social media APIs: For instance, "cloning" the user's own Instagram feed to Reveal, or offering a centralized "dashboard" to see data from or manage all of the user's social media profiles through Reveal.
- Improved security and privacy: Given the nature of the app, these are important considerations. While not strictly needed during the prototype stage (since no real user data is in play), strong security features will need to be in place before a public launch.
