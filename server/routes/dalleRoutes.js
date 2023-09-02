import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// How do we create a test route in order to see if this is working?
router.route("/").get((req, res) => {
  res.send("Hello from DALL-E 2.0");
});

// How do we call the OpenAi API
router.route("/").post(async (req, res) => {
  try {
    // How do we contact the front end to get the prompt?
    const { prompt } = req.body;
    // How would we generate the image?
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(aiResponse);
    const image = aiResponse.data.data[0].b64_json;
    // How do we send it to the front end?
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
