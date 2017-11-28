
## FLIXY

## Table of Contents

- [Explanation of technologies used](#technologies-used)
- [Installaltion instructions](#installation-instructions)
- [Our approach](#our-approach)
- [Key](#key)
- [User story](#user-story)
- [Wireframes](#wire-frames)
- [ERDS](#ERDS)
- [Unsolved problems & hurdles](#unsolved-problems)
- [Style guide](#style-guide)


## **Explanation of technologies used:**

Flixy is a full CRUD web app that makes use of authentication, an external API, and a local database.<br>
<br>
**Frontend:** HTML, JSX, React <br>
We used html for the layout and JSX in order to insert javascript directly into it.<br>
<br>
**Backend:** Node.js, Express, Postgres<br>
We have a full CRUD express backend that uses a database built in Postgres. <br>
<br>
**OMDB API:** <br>
Our local movie information comes from the OMDB API. Our application queries this database and then posts this information to our local database depending on user interaction.
<br>

**Authentication:** <br>
Users have to log in to use Flixy, however, they can only edit/update/delete their own posts.

## **Installation instructions**
Yarn install all dependencies<br>
Yarn dev to start the express server<br>
Yarn start to begin the react client<br>
App requires an API key from OMDB API<br>

## **Our approach**
Our approach had two major phases: planning and building. The planning stage, while challenging at times, was crucial to our teams ability to work on separate features and merge them seamlessly.

Planning:<br>
Initially, we sought to find a common interest within the group. After agreeing that 'movies' would be the central theme, we began discussing our vision for the application. Though, our ideas varied, we realized that we all shared the same frustration - when deciding to watch a movie, instead of sitting down and hitting play, we end up scrolling through Netflix or IMDB for hours overwhelmed by the choices and underwhelmed by the reasons to choose one. We also realized that when we do sit down to watch a specific movie, it's almost always based on a friend's recommendation, which is where the idea for Flixy came from. We wanted to make a space for friends to recommend and discuss the movies they love and had recently seen. Once this was settled, we spent time narrowing down our user story and making our list of 'must haves' v. 'extras'. We also talked through our ERDS and outlined our component flow to ensure that we were all on the same page before beginning to build.

Building:<br>
We all wanted to have a hand in development, so we divided up the backend work. We also benefitted from a lot of peer-programming and screensharing in order to work through some of the tougher issues together.

## **KEY:** <br>
- **FLIXSTERS:** side nav with all users listed who have signed up. Each username links to the user's profile<br>
- **FLIXY FEED:** list of all movies in the Flixy database regardless of user<br>
- **ADD MOVIE:** the search bar in this component queries an external movie database. This information is then posted to the local database.<br>
- **USER FEED:** all movies added by that particular user<br>
- **FLIXTER PROFILE:** brings user to their profile<br>
- **LOGOUT:** logs user out and redirects them tothe Landing Page<br>

## **User story:**

**1) LANDING PAGE**<br>
-Upon arrival, the user can select one of two options: LOGIN or REGISTER. 
-Depending on which option they choose, a form will display prompting them to enter their credentials or register. 
-On submit the user is redirected to the homepage.

**2) HOME PAGE**<br>
-User logs in and sees a screen divided into three panels: FLIXSTERS, FLIXY FEED, and ADD MOVIE<br>
-The user can navigate to their own PROFILE, back to the FLIXY FEED, or LOGOUT from the navbar across the top of the screen<br>
-To the left, below FLIXTERS, the user will find a list of all other users. If the user clicks on one of those usernames, the center component re-renders and displays that user's activity (comments and posts)<br>
-In the center, the user will see the FLIXY FEED which lists all movies added by any using in ascending order by post time<br>
-To the right, the user sees the ADD MOVIE section. Here the user can search an external movie database for a movie, preview the movie information, and decide whether or not to add it to the general feed and to their profile<br>

**3) ANOTHER FLIXTER'S PROFILE (Not the user logged in someone else's profile)**<br>
-Has three views, FLIXSTERS, USER2 FEED and ADD MOVIE<br>
-User1 can view all the movies added by User2 in their UserFeed<br>
-User can click on movies in the user feed to either like or comment or read more<br>

**4) USER PROFILE (Logged in user's profile page)**<br>
-When a user clicks PROFILE, the center display component will re-render and display only that user's own activity (comments and posts).

**5) SINGLE VIEW**<br>
-At any point, the user can find out more information about a movie by clicking on it.
-When the user clicks on a movie, the center component will re-render and display a single view of the movie, more information, as well as all of the comments left by any user.
-In order to navigate out of the single view, the usercan click on FLIXYFEED, PROFILE, or any of the FLIXTERS usernames.

## **Wireframes**
OVERVIEW:
<br>
![imageDescrip](https://i.imgur.com/zWBdeXv.jpg)

LANDING PAGE:
<br>
![imageDescrip](https://i.imgur.com/LmdZURf.jpg)

REGISTER FORM:
<br>
![imageDescrip](https://i.imgur.com/xj0jgbX.jpg)

HOME PAGE:
<br>
![imageDescrip](https://i.imgur.com/wnXrjf1.jpg)

SINGLE MOVIE VIEW:
<br>
![imageDescrip](https://i.imgur.com/4j5iHpQ.jpg)

USER PROFILE:
<br>
![imageDescrip](https://i.imgur.com/0cEU8pn.jpg)

## **ERDS** 
![imageDescrip](https://i.imgur.com/AFXEuN3.jpg)

## **Unsolved problems & hurdles**
Originally, we intended to incorporate a 'like' or 'voting' system. If we were to continue working on this project, that would be our next step and our fourth table - 'favorites'. <br><br>
We would also like to to create some sort of system that deals with 'repeat movies'. For example, we considered warning the user if they're adding a movie that already exists in the database so that they could choose to 'add it anyway' or 'navigate to that film'. Another solution would be to just add an instance of the movie to their individual profile, rather than adding it to the database for a second time. In this case, we might also lift that movie to the top of the feed with a note about when it was originally posted.<br><br>
Another major change we would make, would be to turn Flixy into an app with multiple rooms so that groups of friends can be isolated from users they don't know, similar to a Slack workspace.

## **Style Guide**
- comments written before functions and begin with initials ex. //AF - send information to database
- database tables all lowercase
- neutral color scheme
- CSS attributes should not use uppercase letters
