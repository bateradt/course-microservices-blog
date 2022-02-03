const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    //filtra o comentario se tiver a palavra orange ele será rejeitado senão aprovado
    const status = content.includes("orange") ? "rejected" : "aproved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.status(200).send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
