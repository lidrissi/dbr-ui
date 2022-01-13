import Database from "./database"
import csvFile from "./csvFile"
import WebService from "./webservice"

class DatasourceManager {

    constructor(config) {
        if (['mysql', 'pgsql', 'mssql', 'mongo'].indexOf(config.type) > -1) {
            this.datasource = new Database(config)
        } else if ('url' == config.type) {
            this.datasource = new WebService(config)
        } else if ('csv_file' == config.type) {
            this.datasource = new csvFile(config)
        }
    }
    async fetchData() {
        return await this.datasource.fetchData()
    }
}

export const fetchDatasourceQuery = async (config) => {
    const manager = new DatasourceManager(config)
    const result = await manager.fetchData()

    return result
}