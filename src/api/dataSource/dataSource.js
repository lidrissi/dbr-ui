import axios from "../axios";
import { BACKEND_API_RESOURCES, getApiUrl } from "../../constants/resources";

export const fetchDatasourceQuery = (datasource) => {
  delete datasource["queries"];
  delete datasource["owner"];
  delete datasource["share"];

  const options = {
    method: BACKEND_API_RESOURCES.datasource.fetchQuery.method,
    url: `${getApiUrl()}/${
      BACKEND_API_RESOURCES.datasource.fetchQuery.resource
    }`,
    params: datasource,
  };

  return axios(options)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
};
