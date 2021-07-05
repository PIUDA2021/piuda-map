import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const mapApi = axios.create({
  baseURL: "https://openapi.naver.com",
  headers: {
    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_APP_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_APP_CLIENT_SECRET,
  },
});

exports.handler = async function (event, context) {
  const { query } = event.queryStringParameters;
  if (!query) {
    return {
      statusCode: 400,
      body: {
        status: "bad requests",
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }
  try {
    const { data } = await mapApi.get("/v1/search/local.json", {
      params: {
        query: query,
        display: "10",
        start: "2",
        sort: "random",
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        status: "ERROR",
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }
};
