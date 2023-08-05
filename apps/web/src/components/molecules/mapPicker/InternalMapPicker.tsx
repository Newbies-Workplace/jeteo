"use client";

import React from "react";
import styles from "./InternalMapPicker.module.scss";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import PinIcon from "@/assets/pin.svg";
import { MarkerLayer, Marker } from "react-leaflet-marker";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  value?: LatLngLiteral;
  onChange: (value: LatLngLiteral) => void;
}

const InternalMapPicker: React.FC<MapPickerProps> = ({ value, onChange }) => {
  return (
    <div className={styles.mapDiv}>
      <MapContainer
        style={{ height: 300, borderRadius: 16 }}
        center={
          value ?? {
            lat: 51.08549,
            lng: 17.0104,
          }
        }
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapMarker onChange={onChange} value={value} />
      </MapContainer>
    </div>
  );
};

interface MapMarkerProps {
  value?: LatLngLiteral;
  onChange: (value: LatLngLiteral) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ value, onChange }) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });

  if (!value) {
    return null;
  }

  return (
    <MarkerLayer>
      <Marker position={value} size={[64, 64]} placement={"top"}>
        <Image src={PinIcon} alt={"pin"} />
      </Marker>
    </MarkerLayer>
  );
};

export default InternalMapPicker;
