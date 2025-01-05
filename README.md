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
/api/tracks/create         // Creates a new track (requires authentication and body validation),
                           body: title, description, music url.

/api/tracks                // Outputs the list of all tracks.

/api/tracks/:id            // Outputs the details of a specific track by its ID.

/api/tracks/update/:id     // Updates a specific track by its ID (requires authentication and body validation).

/api/tracks/delete/:id     // Deletes a specific track by its ID (requires authentication).

/api/tracks/mytracks       // Outputs the list of tracks created by the authenticated user (requires authentication).

/api/tracks/:id/toplaylist // Adds a specific track to a playlist (requires authentication).

/api/tracks/myplaylist     // Outputs the playlist of the authenticated user (requires authentication).

/api/tracks/:id/playlistdel// Removes a specific track from a playlist (requires authentication).

/api/tracks/:id/like       // Adds a like to a specific track (requires authentication).

/api/tracks/:id/removelike // Removes a like from a specific track (requires authentication).

/api/tracks/:id/addcomment  // Adds a comment to a specific track (requires authentication).

/api/tracks/:trackid/deletecomment/:commentid // Deletes a specific comment from a track (requires authentication).

```
