export const DATASOURCE_TYPES = [
    {
        label: 'database',
        options: [
            { label: 'MySQL', value: 'mysql' },
            { label: 'PostgreSQL', value: 'pgsql' },
            { label: 'Microsoft SQL Server', value: 'mssql' },
            { label: 'MongoDB', value: 'mongo' },
        ]
    },
    {
        label: 'api',
        options: [
            { label: 'Web service', value: 'url' }
        ]
    },
    {
        label: 'static data',
        options: [
            { label: 'CSV file', value: 'csv_file' },
        ]
    },
]

export const isDatabaseDatasource = (type) => ['mysql', 'pgsql', 'mssql', 'mongo'].indexOf(type) > 0

export const noQueryDatasource = (type) => type === 'csv_file'