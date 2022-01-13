import { Datasource, getDatasourceFilePath } from "./datasource";
import { HyperFormula } from 'hyperformula';

export default class csvFile extends Datasource {

    csvTojson = (str) => {
        const delimiter = this.config.fieldSeparator
        const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');
        if (titles?.length < 2 || rows?.length < 2) {
            throw new Error('invalid file')
        }
        return rows.map(row => {
            const values = row.split(delimiter);
            return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {})
        });
    };

    getFilePathResponse = async () => {
        const path = getDatasourceFilePath(this.config)
        const request = new XMLHttpRequest();
        await request.open("GET", path, false);
        request.send();

        return request.response
    }

    async fetchData() {
        let csvData = []
        try {
            const fileResponse = await this.getFilePathResponse()
            // Retrived data from csv file content
            csvData = this.csvTojson(fileResponse);
            if (this.config.query) {
                const data = csvData.map(item => [...Object.values(item), this.config.query.value])
                const hfInstance = HyperFormula.buildFromArray(data, {
                    licenseKey: 'gpl-v3',
                });

                const lastColumnIndex = csvData?.length > 0 ? Object.keys(csvData[0]).length : 0
                csvData.forEach((item, index) => {
                    item[this.config.query.name] = hfInstance.getCellValue({
                        col: lastColumnIndex,
                        row: index,
                        sheet: 0
                    });
                });
            }
        } catch (error) {
            console.error(error)
        }

        return csvData
    }
}