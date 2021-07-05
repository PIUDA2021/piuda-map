import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const mapApi = axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_CLOUD_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_CLOUD_CLIENT_SECRET,
  },
});

exports.handler = async function (event, context) {
  const { data } = await mapApi.get("/map-geocode/v2/geocode", {
    params: {
      query: "홍대입구역",
      coordinate: "127.1054328,37.3595963",
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};
