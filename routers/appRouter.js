import express from "express";
import { facebook_ad, facebook_ad_API } from "../controller/appController.js";

const router = express.Router();

router.route("/facebookad").get(facebook_ad);
router.route("/facebookadapi").get(facebook_ad_API);

export default router;
