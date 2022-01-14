
export const isSystemWidget = (widgetType) => ['Tree', 'DataGrid', 'Map', 'Image', 'Text'].indexOf(widgetType) > -1

export const SYSTEM_WIDGETS = {
    Tree: {
        _id: "Tree",
        name: "Tree",
        type: 'Tree',
        status: "publish",
        icon: '',
    },
    DataGrid: {
        _id: "DataGrid",
        name: "Data grid",
        type: 'DataGrid',
        status: "publish",
        icon: '',
        params: []
    },
    Map: {
        _id: "Map",
        name: "Map",
        type: 'Map',
        status: "publish",
        icon: '',
    }
}

export const getWidgetIcon = (widget) => {
    if (widget.stWidget.type == 'Image') {
        const extension = widget.name.slice(widget.name.lastIndexOf("."))
        return `${process.env.REACT_APP_S3_URL}${widget._id}${extension}`
    }
    return widget.stWidget?.icon || SYSTEM_WIDGETS[widget?.stWidget?.type]?.icon
}