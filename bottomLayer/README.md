# Backend for Layers
Endpoints:

Here are various endpoints that should be made.

Deal with images:
upload images
Delete images

Users:
Create a new User
Delete a user
Update a User
Fetch a user by userID

Outfit:
Create an outfit
Delete an outfit
Update an outfit
Retrieve an outfit (by OID)
Retrieve all outfits (by UID, EID)

Clothing Item:
Create a clothing item
Delete a clothing item
Update a clothing item
Retrieve a clothing item (by CIID)
Retrieve all clothing items (by UID, OID)

POST /api/auth/login: Authenticate and log in a user.
POST /api/auth/logout: Log out the currently authenticated user.
POST /api/users/:id/follow: Follow a user.
POST /api/users/:id/unfollow: Unfollow a user.

GET /api/search/users: Search for users by username or name.
GET /api/posts/feed: Get a feed of posts from followed users.

<!-- Notifications:
Create Notification
Delete Notification(Cancel a message, or delete an image)
Update Notification(Can’t see why, but maybe)
Trigger notifications
Retry All Failed Notifications
Retrieve all notifications (by recipients — UID) -->

<!-- Posts:
Create a post
Delete a post
Update a post
Retrieve a post (by PID)
Retrieve all posts(by UID, EID, OID/CIID — maybe) -->

<!-- Comment:
Create a comment
Update a comment
Delete a comment
Retrieve a comment (by CID)
Retrieve all comments (by PID, UID — maybe) -->

I forgot are we implementing a chat function if we are:
GET /api/conversations: Get a list of conversations for the authenticated user.
GET /api/conversations/:id: Get messages for a specific conversation.
POST /api/conversations/:id/messages: Send a message to a specific conversation.
         
This is more for the future:
GET /api/explore: Get recommended posts or users for the user.

Updating an item includes updating like count

Might need a new system for likes so they aren’t updated 24/7

New Table for Notification failures (Keeps track of all delivered/processed notifications)

Might be better to use a different database than a relational databases, just by the volume of notifications