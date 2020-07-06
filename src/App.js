import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Post from "./components/Post";

const classes = {
  h2: "text-sm font-semibold",
  header:
    "bg-gray-300 text-gray-700 py-3 px-4 flex items-center justify-between",
  newPost:
    "bg-green-500 text-white rounded px-4 text-xs py-2 uppercase font-semibold tracking-wide",
  link: "text-blue-500 underline hover:text-blue-700"
};

function Empty() {
  return (
    <div className="text-center">
      {"No posts yet. "}
      <Link to="/new" className={classes.link}>
        Create one?
      </Link>
    </div>
  );
}

const GET_POSTS = gql`
  {
    posts {
      body
      createdAt
      id
      title
    }
  }
`;

function App() {
  const { loading, data, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: "network-only"
  });

  if (loading) return <div>Loading...</div>;
  console.log(data);
  //   const client = useApolloClient()

  //   client.query({
  //     query: gql`{
  //   posts {
  //     body
  //     createdAt
  //     id
  //     title
  //   }
  // }`
  //   }).then(data => {
  //     console.log(data)
  //   })

  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.h2}>All Posts</h2>
        <Link to="/new" className={classes.newPost}>
          New Post
        </Link>
      </header>
      {data.posts.length === 0 && <Empty />}
      {data.posts.map(post => (
        <Post key={post.id} post={post} refetch={refetch} />
      ))}
    </>
  );
}

export default App;