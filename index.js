const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const transcription = req.body.transcription || "";

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const merlinRes = await axios.post(
      "https://agents.smythos.com/api/v1/agent/cm8dgabrtksagbkeh48r86khd/skill/merlin_voice",
      {
        input: transcription,
      }
    );

    res.json({
      response: merlinRes.data.response || "I received no reply from Merlin."
    });

  } catch (error) {
    console.error("Error talking to Merlin:", error.message);
    res.json({
      response: "There was an error contacting Merlin."
    });
  }
});

app.listen(port, () => {
  console.log(`Merlin proxy listening on port ${port}`);
});
