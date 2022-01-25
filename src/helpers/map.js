const calculateMarkerBounds = (positions) => {
  if (!positions || !positions[0]) return undefined;
  const bounds = new window.google.maps.LatLngBounds();
  for (let i = 0; i < positions.length; i++) {
    const latLng = new window.google.maps.LatLng(
      positions[i].lat,
      positions[i].lng
    );
    bounds.extend(latLng);
  }
  return bounds;
};

const calculatePolygonBounds = (listNode) => {
  if (!listNode) return undefined;
  const bounds = new window.google.maps.LatLngBounds();
  listNode.forEach(({ polygonCoordinates }) => {
    for (let i = 0; i < polygonCoordinates.length; i++) {
      const latLng = new window.google.maps.LatLng(
        polygonCoordinates[i].lat || polygonCoordinates[i][1],
        polygonCoordinates[i].lng || polygonCoordinates[i][0]
      );
      bounds.extend(latLng);
    }
  });
  return bounds;
};

export { calculateMarkerBounds, calculatePolygonBounds };
