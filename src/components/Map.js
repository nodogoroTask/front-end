import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../store/location-slice";
import useGeolocation from "react-hook-geolocation";

const MapComponent = () => {
  const { token } = useSelector((state) => state.auth);
  const { locations, locationsGroups } = useSelector((state) => state.location);
  const geolocation = useGeolocation();

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [locations]);

  useEffect(() => {
    dispatch(getLocations(token));
  }, [dispatch, token]);

  if (!locations || !locations.length || !geolocation) return <>LOADING</>;
  return (
    <MapContainer
      center={[geolocation.latitude, geolocation.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%", marginBottom: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Array.from(locationsGroups)?.map(([key, value], index) => {
        let coordinate = key.split("-");
        return (
          <Marker position={[coordinate[0], coordinate[1]]} key={index}>
            <Popup>
              <div
                id="style-4"
                className="scrollbar"
                style={{
                  maxHeight: "250px",
                  overflowY: "auto",
                  paddingRight: 8,
                }}
              >
                {value.map((location, index) => (
                  <div
                    key={index}
                    style={{ borderBottom: "1px solid", padding: "6px 0" }}
                  >
                    temperature: {location.temp}°C
                    <br />
                    symptoms: {location.symptoms}
                    <br />
                    user: {location.user}
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
