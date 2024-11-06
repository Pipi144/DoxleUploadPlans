import axios from "axios";

const local: boolean = false;

export const planBaseAddress: string = local
  ? "http://127.0.0.1:8000/"
  : "https://bewbvrirsd5asw73g3mgt3q2b40ivicg.lambda-url.ap-southeast-2.on.aws";

export const baseAddress: string =
  local && !window.location.host.includes("doxle")
    ? "http://127.0.0.1:8000/"
    : "https://oafehfyjjnq3frcri2xzkp7qqu0virph.lambda-url.ap-southeast-2.on.aws/";
export const DrawAPI = axios.create({
  baseURL: baseAddress,
  withCredentials: false,
});
