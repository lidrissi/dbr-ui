import React, { useState, useEffect, useContext } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  KmlLayer,
  useGoogleMap,
  useLoadScript,
} from '@react-google-maps/api'
import PropTypes from 'prop-types'
import mapWorker from './map.worker'
import WebWorker from './workerSetup'
import mapStyles from './mapStyles.json'
import { calculateMarkerBounds, calculatePolygonBounds } from '../../../helpers/map'
import PolygonWrapper from './components/PolygonWrapper'
import { getWidgetNodes } from '../../../api/node'
import useNodeNotification from '../Tree/useNodeNotification'
import { DbrContext } from '../../../services/context'

const defaultMapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  gestureHandling: 'auto',
  mapTypeId: 'satellite',
}

let listNode = {}
let Breadcrumb = []
let stratificationNodes = {}

const zoom = 5
const containerStyle = {
  height: 'calc(100% - 42px)',
  width: '100%',
  borderRadius: '0 0 0.4rem 0.4rem',
}

/**
 * calculate bounds for google map
 * @param {*} positions
 */
const calculateBounds = (positions) => {
  if (
    positions &&
    positions[0] &&
    positions[0].polygonCoordinates &&
    positions[0].polygonCoordinates.length > 0
  ) {
    return calculatePolygonBounds(positions)
  }
  return calculateMarkerBounds(positions)
}

const getListNodeToshow = (currentNodesIds) => {

  if (
    !currentNodesIds ||
    !currentNodesIds[0] ||
    !(currentNodesIds[0] in listNode)
  )
    return

  return currentNodesIds
    .map((nodeId) => listNode[nodeId])
    .flat()
    .reduce((acc, node) => {
      return acc.concat(node)
    }, [])
}

let map = null

const MapComponents = ({ handleMarkerClick, setBreadcrumb, getNodeAncestors, treeId }) => {
  map = useGoogleMap()
  const context = useContext(DbrContext)

  const nodes = context?.map[treeId]?.mapNodes || []
  const currentNodeId = context?.map[treeId]?.currentNodeId || null

  const [infoVisibility, setInfoVisibility] = useState({})

  useEffect(() => {
    if (map && nodes) {
      try {
        map.fitBounds(calculateBounds(nodes))
        if (nodes.length === 1 && nodes[0]?.kmzUrl) {
          map.setZoom(map.getZoom() - 3)
        }
      } catch (e) {
        mapContentKey = 'MAP_KEY_2'
        console.log("error", e);
      }

      setBreadcrumb(getNodeAncestors(currentNodeId))

    }
  }, [nodes]
  )
  const ShowKmlLayers = (node) => {
    const kmlLayer = (
      <KmlLayer
        url={node.kmzUrl}
        onClick={() => {
          handleMarkerClick(node)
        }}
        options={{ preserveViewport: true, suppressInfoWindows: true }}
      />
    )
    return kmlLayer
  }

  const ShowMarkers = (marker) => {
    return (
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.icon}
        onClick={() => {
          marker.setInfoVisibility({ [marker._id]: true })
          handleMarkerClick(marker)
        }}
      >
        {infoVisibility[marker._id] && <InfoWindow >
          <h6>
            {marker.name}
          </h6>
        </InfoWindow>}
      </Marker>
    )
  }

  const ShowPolygon = (marker) => (
    <PolygonWrapper node={marker} handleMarkerClick={handleMarkerClick} />
  )

  const Markers = React.useMemo(() => {
    return (
      <>
        {nodes &&
          nodes.map((marker) => {
            if (!marker) return null
            if (
              marker.polygonCoordinates &&
              marker.polygonCoordinates.length > 0
            ) {
              return <ShowPolygon key={marker._id} {...marker} />
            }
            if (marker.kmzUrl) {
              return <ShowKmlLayers key={marker._id} {...marker} />
            }
            return <ShowMarkers
              key={marker._id}
              {...marker}
              infoVisibility={infoVisibility}
              setInfoVisibility={setInfoVisibility}
            />
          })}
      </>
    )
  }, [nodes])

  return <>{Markers}</>
}

MapComponents.propTypes = {
  handleMarkerClick: PropTypes.func,
  nodes: PropTypes.array,
  saveCurrentMapNodes: PropTypes.func,
  setBreadcrumb: PropTypes.func,
}

const MapBreadcrumb = ({
  handleMarkerClick,
  showNewStratificationOnMap,
  rootNodesIds,
  breadcrumb,
}) => {
  useEffect(() => {
    showNewStratificationOnMap(rootNodesIds)
  }, [rootNodesIds])

  const onFirstBreadcrumbClick = React.useCallback(() => {
    showNewStratificationOnMap('root')
  }, [rootNodesIds])

  // breadcrumb
  Breadcrumb =
    breadcrumb &&
    breadcrumb.map((node, index) => {
      if (breadcrumb.length - 1 === index) {
        return (
          <li key={Math.random()} className="breadcrumb-item-map active">
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => {
                handleMarkerClick(node)
              }}
            >
              {node.name || 'Unknown'}
            </button>
          </li>
        )
      }
      return (
        <li key={Math.random()} className="breadcrumb-item-map">
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={() => {
              handleMarkerClick(node)
            }}
          >
            {node.name || 'Unknown'}
          </button>
        </li>
      )
    })

  return (
    <ol className="breadcrumb bread-map">
      <li className="bread-map-left-icon">
        <i className="simple-icon-map" />
      </li>
      <li className="breadcrumb-item-map-map">
        <button
          type="button"
          className="btn btn-sm btn-link"
          onClick={onFirstBreadcrumbClick}
        >
          Home
        </button>
      </li>
      {Breadcrumb}
    </ol>
  )
}

MapBreadcrumb.propTypes = {
  breadcrumb: PropTypes.array,
  handleMarkerClick: PropTypes.func,
  rootNodesIds: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  showNewStratificationOnMap: PropTypes.func,
}

function MapHOC({ children, treeId, ...props }) {
  const { setMapData } = useContext(DbrContext)

  const getNodeAncestorsRecursive = (node, list) => {
    if (!node) return
    if (stratificationNodes[node.parent]) {
      getNodeAncestorsRecursive(stratificationNodes[node.parent], list)
    }
    list.push(node)
  }

  const getNodeAncestors = (nodeId) => {
    const bcrumb = []
    getNodeAncestorsRecursive(stratificationNodes[nodeId], bcrumb)
    return bcrumb
  }

  /**
   * update Markers & trigger breadcrumb
   * @param {*} currentNodeId
   */
  const updateMapMarkers = (currentNodesIds) => {
    const flatenListNode = getListNodeToshow(currentNodesIds) || [
      stratificationNodes?.[currentNodesIds],
    ]
    if (!flatenListNode || !flatenListNode[0]) return
    if (currentNodesIds) {
      setMapData(treeId, {
        currentNodeId: currentNodesIds.length == 1 ? currentNodesIds[0] : 'root',
        nodes: flatenListNode,
        mapNodes: flatenListNode
      })
      props.setBreadcrumb(getNodeAncestors(currentNodesIds[0]))
    }
  }

  const showNewStratificationOnMap = (nodeIds) => {
    updateMapMarkers([].concat(nodeIds))
  }

  /**
   * handle marker click
   */
  const handleMarkerClick = (marker) => {
    if (marker && marker._id && marker.lat && marker.lng) {
      showNewStratificationOnMap(marker._id)
    }
  }
  return React.Children.map(children, (child) => {
    const childProps = {
      ...child.props,
      handleMarkerClick,
      showNewStratificationOnMap,
      getNodeAncestors,
      setBreadcrumb: props.setBreadcrumb
    }
    if (React.isValidElement(child)) {
      return React.cloneElement(child, childProps)
    }
    return child
  })
}

const MAP_KEY = 'AIzaSyCzNqa1T_iZxs-eNClr8wyDIYzu3cdQs4Y'
let mapContentKey = 'MAP_KEY_1'

// eslint-disable-next-line no-shadow
function MapContent({
  widget
}) {
  useNodeNotification({ widgetId: widget._id, treeId: widget.tree._id })

  const [mapWorkerInstance] = useState(() => new WebWorker(mapWorker))
  const { setMapData, ...other } = useContext(DbrContext)

  console.log("====== other", other);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  })
  const [center] = useState(() => ({
    lat: 33.58831,
    lng: -7.61138,
  }))
  const [rootNodesIds, setRootNodesIds] = useState()
  const [breadcrumb, dispatchBreadcrumb] = React.useReducer(
    (state, action) => action,
    [],
  )

  const setInitialScope = (stratificationTree) => {
    mapWorkerInstance.postMessage({
      action: 'getNodesWithoutParent',
      stratificationTree,
    })
    mapWorkerInstance.onmessage = (e) => {
      const { action, nodesWithoutParent } = e.data

      if (action === 'getNodesWithoutParent') {
        const InitialRootNodesIds = nodesWithoutParent[0]
          ? nodesWithoutParent
          : stratificationTree &&
          stratificationTree[0] &&
          stratificationTree[0]._id
        setRootNodesIds(InitialRootNodesIds)
      }
    }
  }

  const handleListStratification = (selfParentTree) => {
    if (!selfParentTree || !Array.isArray(selfParentTree)) {
      return
    }
    listNode = {}
    stratificationNodes = {}
    selfParentTree.forEach((node) => {
      const parentId = node.parent || 'root'

      if (!listNode[parentId]) {
        listNode[parentId] = []
      }
      if (!node.location) {
        return
      }
      const lat = node.location.coordinates[1]
      const lng = node.location.coordinates[0]
      // save node by id
      stratificationNodes[node._id] = { ...node, lat, lng }

      listNode[parentId].push({ ...node, lat, lng })
    })
    setInitialScope(selfParentTree)
  }

  useEffect(() => {
    getWidgetNodes(widget.tree._id).then((data) => {
      handleListStratification(data)
      const nodesData = data.map(node => {
        if (!node.location) {
          return node
        }
        return ({
          ...node,
          lng: node.location.coordinates[0],
          lat: node.location.coordinates[1]
        })
      })
      console.log('========= nodesData', nodesData);

      setMapData(widget.tree._id, { "fati": "mmmmmm" })
    })
  }, [])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return (
    <div style={{ height: '100%' }}>
      <MapHOC setBreadcrumb={dispatchBreadcrumb} treeId={widget.tree._id}>
        <MapBreadcrumb rootNodesIds={rootNodesIds} breadcrumb={breadcrumb} />
      </MapHOC>
      {isLoaded ? (
        <GoogleMap
          id="startification-map"
          key={mapContentKey}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={defaultMapOptions}
        >
          <MapHOC setBreadcrumb={dispatchBreadcrumb} treeId={widget.tree._id}>
            <MapComponents treeId={widget.tree._id} />
          </MapHOC>
        </GoogleMap>
      ) : (
        <div className="loading" />
      )}
    </div>
  )
}

export default MapContent
