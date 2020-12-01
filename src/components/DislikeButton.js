import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DislikeButton({ user, post: { id, dislikeCount, dislikes } }) {
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (
      user &&
      dislikes.find((dislike) => dislike.username === user.username)
    ) {
      setDisliked(true);
    } else setDisliked(false);
  }, [user, dislikes]);

  const [dislikePost] = useMutation(DISLIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const dislikeButton = user ? (
    disliked ? (
      <Button color="red">
        <Icon name="heart outline" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart outline" />
    </Button>
  );

  return (
    <MyPopup content={disliked ? 'Undisliked' : 'Dislike'}>
      <Button
        as="div"
        labelPosition="right"
        onClick={user ? dislikePost : undefined}
      >
        {dislikeButton}
        <Label basic color="red" pointing="left">
          {dislikeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

const DISLIKE_POST_MUTATION = gql`
  mutation dislikePost($postId: ID!) {
    dislikePost(postId: $postId) {
      id
      dislikes {
        id
        username
      }
      dislikeCount
    }
  }
`;

export default DislikeButton;
