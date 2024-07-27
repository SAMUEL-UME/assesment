Sure, here's a brief README documentation for your project:

---

# My Express & MongoDB API

This project is a basic API built with Express and MongoDB. It includes functionalities for user signup and login, managing posts and comments, and handling user interactions such as upvoting and downvoting posts. 

## Features

- **User Authentication**: Signup and login using JWT for authentication.
- **Post Management**: Create, edit, delete, and retrieve posts. Posts include an image, content, and a predefined category (liver, kidney, heart, blood, lung).
- **User Interactions**: Upvote, downvote posts, add comments, and reply to comments.
- **Sorting and Filtering**: View posts sorted by time or number of upvotes and filter posts by categories.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your MongoDB connection:
    - Ensure you have MongoDB installed and running.
    - Replace the connection string in `mongoose.connect` with your MongoDB URI.

4. Set up environment variables:
    - Create a `.env` file in the root of your project.
    - Add the following line to your `.env` file:
      ```plaintext
      JWT_SECRET=your_jwt_secret
      ```

5. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### User Authentication

#### Signup

- **URL**: `api/user`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "username": "example",
        "email": "example@example.com",
        "password": "yourpassword",
        "picture": "url_to_picture"
    }
    ```
- **Success Response**:
    - **Code**: `201`
    - **Content**: `User created successfully`


### Post Management

#### Create Post

- **URL**: `api/blog`
- **Method**: `POST`
- **Headers**: 
    ```plaintext
    Authorization: Bearer your_jwt_token
    ```
- **Body**:
    ```json
    {
        "image": "url_to_image",
        "content": "post content",
        "category": "liver",
        "userId": "user_id"
    }
    ```
- **Success Response**:
    - **Code**: `201`
    - **Content**: `{ "post": "post_object" }`

#### Edit Post

- **URL**: `api/blog/:id`
- **Method**: `PUT`
- **Headers**: 
    ```plaintext
    Authorization: Bearer your_jwt_token
    ```
- **Body**:
    ```json
    {
        "image": "url_to_image",
        "content": "updated post content",
        "category": "kidney"
    }
    ```
- **Success Response**:
    - **Code**: `200`
    - **Content**: `{ "post": "updated_post_object" }`

#### Delete Post

- **URL**: `api/blog/:id`
- **Method**: `DELETE`
- **Headers**: 
    ```plaintext
    Authorization: Bearer your_jwt_token
    ```
- **Success Response**:
    - **Code**: `200`
    - **Content**: `Post deleted`

#### Retrieve Posts

- **URL**: `api/blogs`
- **Method**: `GET`
- **Success Response**:
    - **Code**: `200`
    - **Content**: `[ { "post": "post_object" } ]`

### User Interactions

#### Upvote Post







### Sorting and Filtering

#### Sort Posts

- **URL**: `/posts/sort/:criteria`
- crite
- **Method**: `GET`
- **Success Response**:
    - **Code**: `200`
    - **Content**: `[ { "post": "sorted_post_object" } ]`

#### Filter Posts by Category

- **URL**: `/posts/category/:{searchKeywords, category, stardate, endate}`
- **Method**: `GET`
- **Success Response**:
    - **Code**: `200`
    - **Content**: `[ { "post": "filtered_post_object" } ]`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING](CONTRIBUTING.md) file for details on how to contribute.

---

This README provides a high-level overview of your project, instructions for setup, and descriptions of the main API endpoints. Adjust the content as necessary to match your project's specifics.
