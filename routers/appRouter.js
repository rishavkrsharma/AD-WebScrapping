import express from "express";
import { facebook_ad } from "../controller/appController.js";

const router = express.Router();

router.route("/facebookad").get(facebook_ad);

export default router;
