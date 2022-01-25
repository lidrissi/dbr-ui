import { Datasource } from "./datasource";
import axios from "axios";

export default class WebService extends Datasource {
  async testConnection() {
    var xhr = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");
    xhr.open("HEAD", this.config.host || "", false);
    try {
      await xhr.send();
      return {
        status:
          (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304
            ? "success"
            : "error",
      };
    } catch (e) {
      return { status: "success" };
    }
  }

  fetchData() {
    let url =
      this.config.host.replace(/\/$/, "") +
      "/" +
      this.config.query.value.replace(/^\//, "").replace(/\/$/, "");
    const { urlParams, paramsValue } = this.config.query;

    if (urlParams?.length > 0 && paramsValue) {
      let isFirstParam = !url.includes("?");
      url = urlParams.reduce((acc, param) => {
        if (paramsValue.hasOwnProperty(param)) {
          acc += `${isFirstParam ? "?" : "&"}${param}=${paramsValue[param]}`;
          isFirstParam = false;
        }
        return acc;
      }, url);
    }

    console.log("url ==>", url);
    const options = {
      method: "GET",
      data: {},
      url,
    };
    if (this.config.headers?.length > 0) {
      try {
        const headers = JSON.parse(this.config.headers);
        options["headers"] = headers;
      } catch (error) {
        console.error(error);
      }
    }
    return axios(options)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          status: "error",
          message: err.toString(),
        };
      });
  }
}
