export class Datasource {
  constructor(config) {
    this.config = config;
  }

  fetchData() {}
}

export const getDatasourceFilePath = (datasource) => {
  const fileName = datasource.host;
  const extension = fileName.slice(fileName.lastIndexOf("."));
  const domain =
    datasource.storage == "s3"
      ? process.env.REACT_APP_S3_URL
      : process.env.REACT_APP_API_HOST + "/";

  return `${domain}${datasource._id}${extension}`;
};
