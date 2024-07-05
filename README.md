# Backend Assignment for SDE 1

### To run the project, use the following command: `node api_gateway`.

```
+-------------------+       +-------------------+       +-------------------+
|       User        |       |      Discuss      |       |      Follow       |
|-------------------|       |-------------------|       |-------------------|
| User_Id (PK)      |<------| Post_Id (PK)      |       | Follower_Id (PK)  |
| Email (Unique)    |       | User_Id (FK)------|------>| Followee_Id (PK)  |
| Mobile_No (Unique)|       | Text              |       |                   |
| Name              |       | Image_Link        |       |                   |
+-------------------+       | Tags              |       +-------------------+
                            | Created_On        |
                            | Likes_Count       |
                            | View_Count        |
                            +-------------------+
                                    |
                                    |
                                    v
                            +-------------------+
                            |      Comment      |
                            |-------------------|
                            | Comment_Id (PK)   |
                            | Post_Id (FK)------|
                            | Parent_Comment_Id |
                            | Comment           |
                            | Likes_Count       |
                            +-------------------+
                                    |
                                    |
                                    v
                            +-------------------+
                            |       Like        |
                            |-------------------|
                            | User_Id (PK, FK)  |
                            | Post_Id (PK, FK)  |
                            | Comment_Id (PK, FK)|
                            +-------------------+


```

## Expose Api for following things:

### User Management
1. **Create User**
   - **Endpoint**: `POST /api/users`
   - **Description**: Create a new user.
   - **Request Body**: `{ "Email": "user@example.com", "Mobile_No": "1234567890", "Name": "John Doe" }`
   - **Response**: `{ "User_Id": "user1234567890", "token": "jwt_token", "expiresIn": "1h" }`

2. **Update User**
   - **Endpoint**: `PUT /api/users/:id`
   - **Description**: Update user details.
   - **Path Parameters**: `id=user123`
   - **Request Body**: `{ "Email": "newemail@example.com", "Mobile_No": "0987654321", "Name": "John Smith" }`
   - **Response**: `{ "updated": 1 }`

3. **Delete User**
   - **Endpoint**: `DELETE /api/users/:id`
   - **Description**: Delete a user.
   - **Path Parameters**: `id=user123`
   - **Response**: `{ "deleted": 1 }`

4. **Show List of Users**
   - **Endpoint**: `GET /api/users`
   - **Description**: Get all users.
   - **Response**: `[ { "User_Id": "user123", "Email": "john@example.com", "Mobile_No": "1234567890", "Name": "John Doe" }, ... ]`

5. **Search User Based on Name**
   - **Endpoint**: `GET /api/users/search`
   - **Description**: Search for users by name.
   - **Query Parameters**: `name=John`
   - **Response**: `[ { "User_Id": "user123", "Email": "john@example.com", "Mobile_No": "1234567890", "Name": "John Doe" }, ... ]`

### Discussion Management
6. **Create Discussion**
   - **Endpoint**: `POST /api/discuss`
   - **Description**: Create a new discussion post.
   - **Request Body**: `{ "Text": "This is a post", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2" }`
   - **Response**: `{ "Post_Id": "post1234567890" }`

7. **Update Discussion**
   - **Endpoint**: `PUT /api/discuss/:id`
   - **Description**: Update a discussion post.
   - **Path Parameters**: `id=post123`
   - **Request Body**: `{ "Text": "Updated text", "Image_Link": "http://example.com/new_image.jpg", "Tags": "newtag1,newtag2" }`
   - **Response**: `{ "updated": 1 }`

8. **Delete Discussion**
   - **Endpoint**: `DELETE /api/discuss/:id`
   - **Description**: Delete a discussion post.
   - **Path Parameters**: `id=post123`
   - **Response**: `{ "deleted": 1 }`

9. **Get List of Discussions Based on Tags**
   - **Endpoint**: `GET /api/discuss/search`
   - **Description**: Search for posts by hashtags.
   - **Query Parameters**: `tags=tag1,tag2`
   - **Response**: `[ { "Post_Id": "post123", "User_Id": "user123", "Text": "This is a post", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2", "Created_On": "2024-07-05T01:43:12.994437Z", "Likes_Count": 10, "View_Count": 100 }, ... ]`

10. **Get List of Discussions Based on Text**
    - **Endpoint**: `GET /api/discuss/searchByText`
    - **Description**: Search for posts by text content.
    - **Query Parameters**: `text=example`
    - **Response**: `[ { "Post_Id": "post123", "User_Id": "user123", "Text": "This is a post containing example", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2", "Created_On": "2024-07-05T01:43:12.994437Z", "Likes_Count": 10, "View_Count": 100 }, ... ]`

## Required Functionalities

### 1. User can login/signup
- **Signup**: `POST /api/path/users`
  - **Description**: Create a new user.
  - **Request Body**: `{ "Email": "user@example.com", "Mobile_No": "1234567890", "Name": "John Doe" }`
  - **Response**: `{ "User_Id": "user1234567890", "token": "jwt_token", "expiresIn": "1h" }`

- **Login**: `POST /api/path/users/token`
  - **Description**: Get a token for an existing user.
  - **Request Body**: `{ "User_Id": "user1234567890", "Email": "user@example.com", "Mobile_No": "1234567890" }`
  - **Response**: `{ "token": "jwt_token", "expiresIn": "1h" }`

### 2. User can search for another users
- **Search Users**: `GET /api/path/users/search`
  - **Description**: Search for users by name.
  - **Query Parameters**: `name=John`
  - **Response**: `[ { "User_Id": "user123", "Email": "john@example.com", "Mobile_No": "1234567890", "Name": "John Doe" }, ... ]`

### 3. User can follow another users
- **Follow User**: `POST /api/path/follow`
  - **Description**: Follow another user.
  - **Request Body**: `{ "followeeId": "user123" }`
  - **Response**: `{ "message": "Followed successfully" }`

- **Unfollow User**: `POST /api/path/follow/unfollow`
  - **Description**: Unfollow another user.
  - **Request Body**: `{ "followeeId": "user123" }`
  - **Response**: `{ "message": "Unfollowed successfully" }`

### 4. User can post (only text or Image + Text)
- **Create Post**: `POST /api/path/discuss`
  - **Description**: Create a new post.
  - **Request Body**: `{ "Text": "This is a post", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2" }`
  - **Response**: `{ "Post_Id": "post1234567890" }`

### 5. Other users can comment or like on the post
- **Comment on Post**: `POST /api/path/comments`
  - **Description**: Add a comment to a post.
  - **Request Body**: `{ "Post_Id": "post123", "Parent_Comment_Id": null, "Comment": "This is a comment" }`
  - **Response**: `{ "Comment_Id": "comment1234567890" }`

- **Like Post**: `POST /api/path/like`
  - **Description**: Like a post.
  - **Request Body**: `{ "Post_Id": "post123" }`
  - **Response**: `{ "message": "Liked successfully" }`

### 6. Users can like a comment or reply on the comment
- **Like Comment**: `POST /api/path/like`
  - **Description**: Like a comment.
  - **Request Body**: `{ "Comment_Id": "comment123" }`
  - **Response**: `{ "message": "Liked successfully" }`

- **Reply to Comment**: `POST /api/path/comments`
  - **Description**: Add a reply to a comment.
  - **Request Body**: `{ "Post_Id": "post123", "Parent_Comment_Id": "comment123", "Comment": "This is a reply" }`
  - **Response**: `{ "Comment_Id": "comment1234567891" }`

### 7. Users can delete or modify post after posting
- **Delete Post**: `DELETE /api/path/discuss/:id`
  - **Description**: Delete a post.
  - **Path Parameters**: `id=post123`
  - **Response**: `{ "deleted": 1 }`

- **Update Post**: `PUT /api/path/discuss/:id`
  - **Description**: Update a post.
  - **Path Parameters**: `id=post123`
  - **Request Body**: `{ "Text": "Updated text", "Image_Link": "http://example.com/new_image.jpg", "Tags": "newtag1,newtag2" }`
  - **Response**: `{ "updated": 1 }`

### 8. Users can delete or modify comments
- **Delete Comment**: `DELETE /api/path/comments/:id`
  - **Description**: Delete a comment.
  - **Path Parameters**: `id=comment123`
  - **Response**: `{ "deleted": 1 }`

- **Update Comment**: `PUT /api/path/comments/:id`
  - **Description**: Update a comment.
  - **Path Parameters**: `id=comment123`
  - **Request Body**: `{ "Comment": "Updated comment" }`
  - **Response**: `{ "updated": 1 }`

### 9. Users can see view count of a post
- **Get Post**: `GET /api/path/discuss/:id`
  - **Description**: Get a post by ID and increment view count.
  - **Path Parameters**: `id=post123`
  - **Response**: `{ "Post_Id": "post123", "User_Id": "user123", "Text": "This is a post", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2", "Created_On": "2024-07-05T01:43:12.994437Z", "Likes_Count": 10, "View_Count": 101 }`

### 10. Users can search for any posts using the hashtags
- **Search Posts by Hashtags**: `GET /api/path/discuss/search`
  - **Description**: Search for posts by hashtags.
  - **Query Parameters**: `tags=tag1,tag2`
  - **Response**: `[ { "Post_Id": "post123", "User_Id": "user123", "Text": "This is a post", "Image_Link": "http://example.com/image.jpg", "Tags": "tag1,tag2", "Created_On": "2024-07-05T01:43:12.994437Z", "Likes_Count": 10, "View_Count": 100 }, ... ]`


## API Documentation

### User Service

**Base URL**: `/api/users`

#### Endpoints

1. **Create User**
   - **Method**: `POST`
   - **URL**: `/api/users`
   - **Request Body**:
     ```json
     {
       "Email": "user@example.com",
       "Mobile_No": "1234567890",
       "Name": "John Doe"
     }
     ```
   - **Response**:
     ```json
     {
       "User_Id": "user1623456789012",
       "token": "jwt_token",
       "expiresIn": "1h"
     }
     ```

2. **Update User**
   - **Method**: `PUT`
   - **URL**: `/api/users/:id`
   - **Request Body**:
     ```json
     {
       "Email": "newemail@example.com",
       "Mobile_No": "0987654321",
       "Name": "Jane Doe"
     }
     ```
   - **Response**:
     ```json
     {
       "updated": 1
     }
     ```

3. **Delete User**
   - **Method**: `DELETE`
   - **URL**: `/api/users/:id`
   - **Response**:
     ```json
     {
       "deleted": 1
     }
     ```

4. **Get All Users**
   - **Method**: `GET`
   - **URL**: `/api/users`
   - **Response**:
     ```json
     [
       {
         "User_Id": "user1623456789012",
         "Email": "user@example.com",
         "Mobile_No": "1234567890",
         "Name": "John Doe"
       },
       ...
     ]
     ```

5. **Search Users by Name**
   - **Method**: `GET`
   - **URL**: `/api/users/search`
   - **Query Parameters**:
     - `name`: The name to search for.
   - **Response**:
     ```json
     [
       {
         "User_Id": "user1623456789012",
         "Email": "user@example.com",
         "Mobile_No": "1234567890",
         "Name": "John Doe"
       },
       ...
     ]
     ```

### Discussion Service

**Base URL**: `/api/discussions`

#### Endpoints

1. **Create Discussion**
   - **Method**: `POST`
   - **URL**: `/api/discussions`
   - **Request Body**:
     ```json
     {
       "Text": "Discussion text",
       "Image_Link": "http://example.com/image.jpg",
       "Tags": "tag1,tag2"
     }
     ```
   - **Response**:
     ```json
     {
       "Post_Id": "post1623456789012"
     }
     ```

2. **Update Discussion**
   - **Method**: `PUT`
   - **URL**: `/api/discussions/:id`
   - **Request Body**:
     ```json
     {
       "Text": "Updated discussion text",
       "Image_Link": "http://example.com/newimage.jpg",
       "Tags": "tag1,tag3"
     }
     ```
   - **Response**:
     ```json
     {
       "updated": 1
     }
     ```

3. **Delete Discussion**
   - **Method**: `DELETE`
   - **URL**: `/api/discussions/:id`
   - **Response**:
     ```json
     {
       "deleted": 1
     }
     ```

4. **Get Discussions by Tags**
   - **Method**: `GET`
   - **URL**: `/api/discussions/tags`
   - **Query Parameters**:
     - `tags`: Comma-separated list of tags.
   - **Response**:
     ```json
     [
       {
         "Post_Id": "post1623456789012",
         "User_Id": "user1623456789012",
         "Text": "Discussion text",
         "Image_Link": "http://example.com/image.jpg",
         "Tags": "tag1,tag2",
         "Created_On": "2023-07-05T01:53:26.360Z",
         "Likes_Count": 0,
         "View_Count": 1
       },
       ...
     ]
     ```

5. **Get Discussions by Text**
   - **Method**: `GET`
   - **URL**: `/api/discussions/search`
   - **Query Parameters**:
     - `text`: The text to search for.
   - **Response**:
     ```json
     [
       {
         "Post_Id": "post1623456789012",
         "User_Id": "user1623456789012",
         "Text": "Discussion text",
         "Image_Link": "http://example.com/image.jpg",
         "Tags": "tag1,tag2",
         "Created_On": "2023-07-05T01:53:26.360Z",
         "Likes_Count": 0,
         "View_Count": 1
       },
       ...
     ]
     ```

### Follow Service

**Base URL**: `/api/follow`

#### Endpoints

1. **Follow User**
   - **Method**: `POST`
   - **URL**: `/api/follow`
   - **Request Body**:
     ```json
     {
       "followeeId": "user1623456789012"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Followed successfully"
     }
     ```

2. **Unfollow User**
   - **Method**: `DELETE`
   - **URL**: `/api/follow/:id`
   - **Response**:
     ```json
     {
       "message": "Unfollowed successfully"
     }
     ```

3. **Get Followers**
   - **Method**: `GET`
   - **URL**: `/api/follow/followers/:id`
   - **Response**:
     ```json
     [
       {
         "User_Id": "user1623456789012",
         "Email": "user@example.com",
         "Mobile_No": "1234567890",
         "Name": "John Doe"
       },
       ...
     ]
     ```

4. **Get Followees**
   - **Method**: `GET`
   - **URL**: `/api/follow/followees/:id`
   - **Response**:
     ```json
     [
       {
         "User_Id": "user1623456789012",
         "Email": "user@example.com",
         "Mobile_No": "1234567890",
         "Name": "John Doe"
       },
       ...
     ]
     ```

### Like Service

**Base URL**: `/api/like`

#### Endpoints

1. **Like Post**
   - **Method**: `POST`
   - **URL**: `/api/like/discuss/:id/like`
   - **Response**:
     ```json
     {
       "liked": 1
     }
     ```

2. **Unlike Post**
   - **Method**: `POST`
   - **URL**: `/api/like/discuss/:id/unlike`
   - **Response**:
     ```json
     {
       "unliked": 1
     }
     ```

3. **Like Comment**
   - **Method**: `POST`
   - **URL**: `/api/like/comments/:id/like`
   - **Response**:
     ```json
     {
       "liked": 1
     }
     ```

4. **Unlike Comment**
   - **Method**: `POST`
   - **URL**: `/api/like/comments/:id/unlike`
   - **Response**:
     ```json
     {
       "unliked": 1
     }
     ```

### Comment Service

**Base URL**: `/api/comments`

#### Endpoints

1. **Create Comment**
   - **Method**: `POST`
   - **URL**: `/api/comments`
   - **Request Body**:
     ```json
     {
       "Post_Id": "post1623456789012",
       "Parent_Comment_Id": null,
       "Comment": "This is a comment"
     }
     ```
   - **Response**:
     ```json
     {
       "Comment_Id": "comment1623456789012"
     }
     ```

2. **Update Comment**
   - **Method**: `PUT`
   - **URL**: `/api/comments/:id`
   - **Request Body**:
     ```json
     {
       "Comment": "Updated comment"
     }
     ```
   - **Response**:
     ```json
     {
       "updated": 1
     }
     ```

3. **Delete Comment**
   - **Method**: `DELETE`
   - **URL**: `/api/comments/:id`
   - **Response**:
     ```json
     {
       "deleted": 1
     }
     ```

4. **Get Comment by ID**
   - **Method**: `GET`
   - **URL**: `/api/comments/:id`
   - **Response**:
     ```json
     {
       "Comment_Id": "comment1623456789012",
       "Post_Id": "post1623456789012",
       "Parent_Comment_Id": null,
       "Comment": "This is a comment",
       "Likes_Count": 0
     }
     ```

5. **Get All Comments for Post**
   - **Method**: `GET`
   - **URL**: `/api/comments`
   - **Query Parameters**:
     - `postId`: The ID of the post.
   - **Response**:
     ```json
     [
       {
         "Comment_Id": "comment1623456789012",
         "Post_Id": "post1623456789012",
         "Parent_Comment_Id": null,
         "Comment": "This is a comment",
         "Likes_Count": 0
       },
       ...
     ]
     ```

### API Gateway

**Base URL**: `/api`

#### Endpoints

1. **User Service Proxy**
   - **URL**: `/api/users`
   - **Target**: `http://localhost:3001`

2. **Discussion Service Proxy**
   - **URL**: `/api/discussions`
   - **Target**: `http://localhost:3002`

3. **Follow Service Proxy**
   - **URL**: `/api/follow`
   - **Target**: `http://localhost:3003`

4. **Like Service Proxy**
   - **URL**: `/api/like`
   - **Target**: `http://localhost:3004`

5. **Comment Service Proxy**
   - **URL**: `/api/comments`
   - **Target**: `http://localhost:3005`


## 

```
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Client Apps    | <---> |    API Gateway    | <---> |  Microservices    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
                                 |       |       |             |
                                 |       |       |             |
                                 v       v       v             v
                         +-------+-------+-------+-------------+-------+
                         |       |       |       |             |       |
                         |  User |  Discussion |  Follow |  Like |  Comment |
                         | Service |  Service |  Service |  Service |  Service |
                         +-------+-------+-------+-------------+-------+

```




## Database Schema (Sqlite3)

#### User Table
```cql
CREATE TABLE IF NOT EXISTS User (
    User_Id UUID PRIMARY KEY,
    Email TEXT,
    Mobile_No TEXT,
    Name TEXT
);
```

#### Discuss Table
```cql
CREATE TABLE IF NOT EXISTS Discuss (
    Post_Id UUID PRIMARY KEY,
    User_Id UUID,
    Text TEXT,
    Image_Link TEXT,
    Tags SET<TEXT>,
    Created_On TIMESTAMP,
    Likes_Count INT,
    View_Count INT,
    FOREIGN KEY (User_Id) REFERENCES User(User_Id)
);
```

#### Follow Table
```cql
CREATE TABLE IF NOT EXISTS Follow (
    Follower_Id UUID,
    Followee_Id UUID,
    PRIMARY KEY (Follower_Id, Followee_Id),
    FOREIGN KEY (Follower_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Followee_Id) REFERENCES User(User_Id)
);
```

#### Comment Table
```cql
CREATE TABLE IF NOT EXISTS Comment (
    Comment_Id UUID PRIMARY KEY,
    Post_Id UUID,
    Parent_Comment_Id UUID,
    Comment TEXT,
    Likes_Count INT,
    FOREIGN KEY (Post_Id) REFERENCES Discuss(Post_Id),
    FOREIGN KEY (Parent_Comment_Id) REFERENCES Comment(Comment_Id)
);
```

#### Like Table
```cql
CREATE TABLE IF NOT EXISTS Like (
    User_Id UUID,
    Post_Id UUID,
    Comment_Id UUID,
    PRIMARY KEY (User_Id, Post_Id, Comment_Id),
    FOREIGN KEY (User_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Post_Id) REFERENCES Discuss(Post_Id),
    FOREIGN KEY (Comment_Id) REFERENCES Comment(Comment_Id)
);
```

### Relationships

1. **User and Discuss**: One-to-Many
   - A user can create multiple discussions.
   - `User_Id` in `Discuss` table references `User_Id` in `User` table.

2. **User and Follow**: Many-to-Many
   - A user can follow multiple users and be followed by multiple users.
   - `Follower_Id` and `Followee_Id` in `Follow` table reference `User_Id` in `User` table.

3. **Discuss and Comment**: One-to-Many
   - A discussion can have multiple comments.
   - `Post_Id` in `Comment` table references `Post_Id` in `Discuss` table.

4. **Comment and Comment**: One-to-Many (Self-referencing)
   - A comment can have multiple replies (comments).
   - `Parent_Comment_Id` in `Comment` table references `Comment_Id` in the same table.

5. **User and Like**: Many-to-Many
   - A user can like multiple posts and comments.
   - `User_Id` in `Like` table references `User_Id` in `User` table.
   - `Post_Id` in `Like` table references `Post_Id` in `Discuss` table.
   - `Comment_Id` in `Like` table references `Comment_Id` in `Comment` table.

\