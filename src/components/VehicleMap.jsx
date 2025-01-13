import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const VehicleMap = ({ data }) => {
  return (
    <MapContainer center={[47.610365, -122.30839]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((item, index) => {
        const coords = item['Vehicle Location'].replace('POINT (', '').replace(')', '').split(' ');
        const lat = parseFloat(coords[1]);
        const lng = parseFloat(coords[0]);
        return (
          <Marker key={index} position={[lat, lng]} icon={new L.Icon.Default()}>
            <Popup>{`${item.Make} ${item.Model} (${item['Electric Range']} miles)`}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default VehicleMap;