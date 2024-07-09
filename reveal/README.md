# Reveal

## Overview & Problem

Reveal is a social media site built especially for local burlesque communities. Burlesque performers and event organizers rely on social media for promotion and engagement, but there are several problems with the existing mainstream platforms:

    1. Over-moderation: Users are often shadowbanned or suspended for posting risqué content, even when that content is not explicit and is within the platform's TOS.

    2. Fragmentation: Performers and organizers must use several different social media sites for promotion. This can be difficult to manage.

    3. Poor discoverability: Existing search functionalities are lacking, making it a challenge to find local events. Some communities have resorted to keeping a plain text Google Doc of all upcoming shows in their area. Not only must these lists be manually maintained, they are not visually appealing and do little to encourage ticket sales.

Reveal aims to address these pain points by providing a network specifically designed for the burlesque world.

## User Profile

Burlesque performers of all experience levels may be Reveal's most important users, but they will not be the only ones. Producers and venue owners will be able to use Reveal to recruit performers and promote their upcoming events. Burlesque fans can follow their favourite artists, revisit the best moments of shows they've been to with photo and video galleries, and discover enticing events to go to next. Finally, the "burlesque-curious" will find Reveal to be a repository of information and inspiration, as well as a natural medium to connect with local mentors and schools should they dream of getting on stage themselves!

## User Stories

- As a site visitor, I can see a list of all upcoming shows in my area, and click on one to view its full details, so that I can find events to go to.
- As a burlesque performer, I can promote myself and my upcoming shows via both my profile page and posts, so that I can grow my audience.
- As a burlesque fan, I can easily see all of my favourite performers' media on their profle page, so that I don't have to dig through YouTube, Instagram, or TikTok to search for them individually.
- As a producer or venue owner, I can organize and promote upcoming events to an interested target audience so that I can sell more tickets.

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

- HTML
- CSS
- Sass
- JavaScript
- React
- Axios
- MySQL
- Knex
- OAuth

### Sitemap

- See development/sitemap.png

### Mockups

- See development/mockups/

### Data

- See development/data-diagram.png

### Endpoints

- GET /users
- GET /users/:userId
- POST /users
- PUT /users/:userId
- DELETE /users/:userId

- GET /events
- GET /events/:eventId
- POST /events
- PUT /events/:eventId
- DELETE /events/:eventId

- GET /posts
- GET /posts/:postId
- POST /posts
- PUT /posts/:postId
- DELETE /posts/:postId

### Auth

- Facebook/Instagram OAuth

## Roadmap

Philosophy: Begin with barebones construction of all components and functionality. Refine in stages. Test and address bugs throughout. Alternate frontend and backend tasks.

Sprint 1

- Monday: Build skeleton React components with layout styling only, beginning with mobile and then adjusting for tablet and desktop sizes
- Tuesday: Review past projects and use as reference to begin building functionality
- Wednesday: Backend — integrate database and API
- Thursday: Aesthetic styling, first pass — base theme and typography for all components
- Friday: Complete backend-frontend integration and functionality
- Saturday: Aesthetic styling, second pass — refine design
- Sunday: Squash bugs and finalize deliverables

## Nice-to-Haves

- Venue/business pages
- Expanded scope: During early development, the content scope will be limited to Toronto only. This will later be expanded to all of Canada, then to an international audience.
- Integration with other social media APIs: for instance, "cloning" the user's own Instagram feed to Reveal, or offering a centralized "dashboard" to see data from or manage all of the user's social media profiles through Reveal
- Light theme: Reveal is prioritizing dark theme for a more comfortable user experience while actually at burlesque shows, but it would be great to offer a light option for users who prefer it
- Live chat/DMs
- Email auth option
- Expanded listings: in addition to events, provide directories for local burlesque organizations, teachers/schools, venues, or performers
- Improved security and privacy: Given the nature of the app, these are important considerations. While not strictly needed during the prototype stage (since no real user data is in play), strong security features will need to be in place before a public launch.
- Buy tickets directly through Reveal, rather than linking to external sites
- Calender view for events listings
- Images and videos in posts
- Upload videos
- Search
- Settings
- Block users
- Report posts
- Save events (Users can create a list of events they are interested in so that it's more convenient to check the details again later)
