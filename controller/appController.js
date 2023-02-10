import fetch from "node-fetch";
import request from "request";
import { MongoClient } from "mongodb";
import pkg from "facebook-node-sdk";

const { Facebook } = pkg;

export const facebook_ad = async (req, res) => {
  try {
    const uri = "mongodb://localhost:27017/FbAdManager";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    const collection = client.db("FbAdManager").collection("devices");

    const response = await fetch(
      "https://www.facebook.com/ads/library/async/search_ads/?session_id=f687feea-792c-443f-8eb3-06d5de400caa&count=30&active_status=all&ad_type=all&countries[0]=ALL&view_all_page_id=9465008123&media_type=all&search_type=page",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-fb-lsd": "BJbXkQDECWtl-zP0n0_k3I",
          cookie:
            "sb=jaxrY1qWZzMEf-Bwn1qLRDFL; datr=jaxrY1XRNFSF7kclZEZOwPAw; c_user=100037156908960; dpr=1.25; usida=eyJ2ZXIiOjEsImlkIjoiQXJwc3o5dDFwYmJ4YzAiLCJ0aW1lIjoxNjc1OTMwODAzfQ%3D%3D; xs=22%3APJF4tdI3n7lUVg%3A2%3A1668000913%3A-1%3A4198%3A%3AAcVHXnNISSgh3Lc7TQxrfOnW_2BpbK91YTFeXznIkYM; fr=00uA8K2LomZ3meO2L.AWXCMZWUO9sjCmymQEHaCcaabkY.Bj5QMm.Iu.AAA.0.0.Bj5QMm.AWW2FrSWjZI; wd=728x150",
          Referer:
            "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=9465008123&search_type=page&media_type=all",
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: "__user=100037156908960&__a=1&__dyn=7xe6Eiw_K9zo5ObwKBAobVo6C2i5U4e1FxebzEdF8aUuxa1ZzEeU9E3-xS6Ehwem0nCqbwgE3awbG78b87C1xwEwgolzU1vrzoaEd86a0Rk2C0iK1Axi2a48Pw9OU6-3e4Ueo2sxOu2S2W2K7o725U4q0N8G2q0gq2S3qazo11E2XU4K2e1FwLwmEco98d8&__csr=&__req=1&__hs=19397.BP%3ADEFAULT.2.0.0.0.0&dpr=1.5&__ccg=MODERATE&__rev=1006936858&__s=ozd4d8%3Awxfeiu%3Asx4czy&__hsi=7198172004983596740&__comet_req=0&fb_dtsg=NAcOpuiQo7sLP4z2t0A-qhR8n6XFd8F2Qhc9dgxZZqMME-IeiCc7ccA%3A22%3A1668000913&jazoest=25342&lsd=BJbXkQDECWtl-zP0n0_k3I&__aaid=720089555469494&__spin_r=1006936858&__spin_b=trunk&__spin_t=1675955021&__jssesw=1",
        method: "POST",
      }
    ).then((res) => res.text());
    const strippedResponse = response.replace("for (;;);", "");
    const parsedResponse = JSON.parse(strippedResponse);

    request(
      "http://localhost:4000/api/v1/facebookad",
      function (error, response, body) {
        const jsonData = JSON.parse(body);
        collection.insertOne(jsonData, function (err, res) {
          console.log("Data saved to MongoDB");
          client.close();
        });
      }
    );

    res.send(parsedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const facebook_ad_API = async (req, res) => {
  try {
    const options = {
      url: "https://graph.facebook.com/v16.0/ads_archive?search_terms='california'&ad_type=POLITICAL_AND_ISSUE_ADS&ad_reached_countries=['US']&access_token=EAAT9Ns5wYtABAHn4i9VsVx8ZC5qLXoFqlO4mJW3R3d4kKxh2sqa9wyykKm2pD1XFVckugaSZAVnc0RLgBFXAZB90hOZBA3eAP0BBM1fMu9XG1hPL3Pw2w6zIKKYuh5ZApiw02ZCdNelkC4ZB5oFFKr23mAyBZCoHm2kfszSrRWgszRzimS0ZAhZC8x1QghK2rLYDEZD",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    request(options, function (error, response, body) {
      const data = JSON.parse(body);
      console.log("yes");
      console.log(data);
      res.send(data);
      z;
    });
  } catch (error) {}
};
