const express = require("express");
const Post = require("../../data/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  Post.find(query)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  Post.findPostComments(req.params.id)
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  newComment = {
    ...req.body,
    post_id: req.params.id,
  };

  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }

  Post.insertComment(newComment)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then((post) => {
      if (post > 0) {
        res.status(200).json({
          message: `The post with ID ${req.params.id} has been removed`,
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  Post.update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
