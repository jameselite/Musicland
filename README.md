# MusicLand : a music sharing API written with Express JS .

![License](https://img.shields.io/badge/license-MIT-brightgreen)   ![License](https://img.shields.io/badge/Database-PostgreSQL-red)    ![License](https://img.shields.io/badge/Token-JWT-darkgreen)     ![License](https://img.shields.io/badge/Hashing-Bcrypt-brown)
<br>
![License](https://img.shields.io/badge/Framework-ExpressJS-blue)  ![License](https://img.shields.io/badge/ORM-Prisma-purple)          ![License](https://img.shields.io/badge/Package_Manager-NPM-orange)    ![License](https://img.shields.io/badge/slug-Slugify-cyan)

###### My first javascript API :))
<br>

***<h2>What this API do?</h2>***
* In simple words : You can share your music with others    :)

* You can view all of the shared musics or see the specific song with it URL.

* You can upload your song, You can see what you have uploaded and you can delete them or update them.

* You can add the songs into your playlist or remove them.

* Also you can write comment , delete your comments, and show your feelings with like !
<br>
<h2>Endpoints</h2>
<h4>Since this is a very small project, i just write the endpoints here:</h4>

```
POST /api/tracks: Create a new track (requires authentication and body validation).

GET /api/tracks: Retrieve a list of all tracks.

GET /api/tracks/:id: Retrieve details of a specific track by its ID.

PUT /api/tracks/update/:id: Update a specific track by its ID (requires authentication and body validation).

DELETE /api/tracks/delete/:id: Delete a specific track by its ID (requires authentication).

POST /api/tracks/mytracks: Retrieve a list of tracks created by the authenticated user (requires authentication).

POST /api/tracks/:id/toplaylist: Add a specific track to a playlist (requires authentication).

POST /api/tracks/myplaylist: Retrieve the playlist of the authenticated user (requires authentication).

POST /api/tracks/:id/playlistdel: Remove a specific track from a playlist (requires authentication).

POST /api/tracks/:id/like: Add a like to a specific track (requires authentication).

POST /api/tracks/:id/removelike: Remove a like from a specific track (requires authentication).

POST /api/tracks/:id/addcomment: Add a comment to a specific track (requires authentication).

POST /api/tracks/:trackid/deletecomment/:commentid: Delete a specific comment from a track (requires authentication).

POST /api/auth/register: Registers a new user by accepting user details and creating a new account.

POST /api/auth/login: Logs in an existing user by verifying credentials and issuing a token.

POST /api/auth/logout: Logs out the authenticated user, invalidating their session (requires authentication).

POST /api/auth/getnewtoken: Retrieves a new authentication token, typically used for refreshing sessions.

POST /api/auth/auth_status: Checks the authentication status of the user, confirming if they are logged in or not.

```
