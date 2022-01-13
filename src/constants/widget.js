
export const WIDGET_STATUSES = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Unpublished', value: 'UNPUBLISHED' },
    { label: 'Published', value: 'PUBLISHED' },
]

export const CHART_TYPES = [
    {
        label: 'Pie Chart',
        value: 'PieChart',
        icon: 'assets/img/charts/pie.png'
    },
    {
        label: 'XY Chart',
        value: 'XYChart',
        icon: 'assets/img/charts/xy.png'
    },
    {
        label: 'Map',
        value: 'am4maps.MapChart',
        icon: 'assets/img/charts/map.png'
    },
    {
        label: 'Radar Chart',
        value: 'RadarChart',
        icon: 'assets/img/charts/radar.png'
    },
    {
        label: 'Treemap Chart',
        value: 'TreeMap',
        icon: 'assets/img/charts/treeMap.png'
    },
    {
        label: 'Sankey Diagram',
        value: 'SankeyDiagram',
        icon: 'assets/img/charts/sankey.png'
    },
    {
        label: 'Gauge Chart',
        value: 'GaugeChart',
        icon: 'assets/img/charts/gauge.png'
    },
    {
        label: 'Chord Diagram',
        value: 'ChordDiagram',
        icon: 'assets/img/charts/chord.png'
    },
    {
        label: 'Sliced(Funnel, Pyramid, Pictorial)',
        value: 'SlicedChart',
        icon: 'assets/img/charts/funnel.png'
    },
    {
        label: 'Sunburst Diagram',
        value: 'am4plugins_sunburst.Sunburst',
        icon: 'assets/img/charts/sunburst.png'
    },
    {
        label: 'WordCloud',
        value: 'am4plugins_wordCloud.WordCloud',
        icon: 'assets/img/charts/wordCloud.png'
    },
    {
        label: 'Force Directed Tree',
        value: 'am4plugins_forceDirected.ForceDirectedTree',
        icon: 'assets/img/charts/forceDirectedTree.png'
    },
    {
        label: 'TimeLine / Curve Chart',
        value: 'am4plugins_timeline.CurveChart',
        icon: 'assets/img/charts/timeLine.png'
    },
    {
        label: 'Venn Diagram',
        value: 'am4plugins_venn.VennDiagram)',
        icon: 'assets/img/charts/venn.png'
    },
]

export const WIDGET_CATEGORIES = [
    {
        label: 'Fancy Data-Viz',
        value: 'fancy_data_viz'
    },
    {
        label: 'Chart Types',
        value: 'chart_types'
    },
    {
        label: 'Column & Bar',
        value: 'column_bar'
    },
    {
        label: 'Line & Area',
        value: 'line_area'
    },
    {
        label: 'Pie & Donut',
        value: 'pie_donut'
    },
    {
        label: 'XY & Bubble',
        value: 'xy_bubble'
    },
    {
        label: 'Maps',
        value: 'maps'
    },
    {
        label: 'Candlestick & OHLC',
        value: 'candlestick_ohlc'
    },
    {
        label: 'Stock',
        value: 'stock'
    },
    {
        label: 'TimeLine',
        value: 'timeLine'
    },
    {
        label: 'Pictorial',
        value: 'pictorial'
    },
    {
        label: 'Gauges',
        value: 'gauges'
    },
    {
        label: 'Radar & Polar',
        value: 'radar_polar'
    },
    {
        label: 'Treemap',
        value: 'treemap'
    },
    {
        label: 'Flow Diagram',
        value: 'flow_diagram'
    },
    {
        label: 'Funnel & Pyramid',
        value: 'funnel_pyramid'
    },
    {
        label: 'Miscellaneous',
        value: 'miscellaneous'
    }
]

export const isSystemWidget = (widgetType) => ['Tree', 'DataGrid', 'Map', 'Image', 'Text'].indexOf(widgetType) > -1

export const SYSTEM_WIDGETS = {
    Tree: {
        _id: "Tree",
        name: "Tree",
        type: 'Tree',
        status: "publish",
        icon: require("assets/images/dbr/tree.png"),
    },
    DataGrid: {
        _id: "DataGrid",
        name: "Data grid",
        type: 'DataGrid',
        status: "publish",
        icon: require("assets/images/dbr/grid.png"),
        params: []
    },
    Map: {
        _id: "Map",
        name: "Map",
        type: 'Map',
        status: "publish",
        icon: require("assets/images/dbr/map.png"),
    }
}

export const getWidgetIcon = (widget) => {
    if (widget.stWidget.type == 'Image') {
        const extension = widget.name.slice(widget.name.lastIndexOf("."))
        return `${process.env.REACT_APP_S3_URL}${widget._id}${extension}`
    }
    return widget.stWidget?.icon || SYSTEM_WIDGETS[widget?.stWidget?.type]?.icon
}