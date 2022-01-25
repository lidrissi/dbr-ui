import { fetchDatasourceQuery } from "../../api/dataSource";
import { Datasource } from "./datasource";

export default class Database extends Datasource {
  multiReplace = (str, regex, replaces) => {
    return str.replace(regex, function (x) {
      const param = x.replace(":", "");
      return Object.keys(replaces).includes(param)
        ? `"${replaces[param]}"`
        : "''";
    });
  };

  async fetchData() {
    const { urlParams, paramsValue } = this.config.query;
    let query = { ...this.config.query };
    if (urlParams?.length > 0) {
      query.value = this.multiReplace(
        query.value,
        new RegExp(urlParams.map((i) => `:${i}`).join("|"), "g"),
        paramsValue || {}
      );
    }
    return await fetchDatasourceQuery({ ...this.config, query });
  }
}
