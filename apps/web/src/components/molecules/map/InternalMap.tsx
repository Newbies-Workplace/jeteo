"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, MarkerLayer } from "react-leaflet-marker";
import Image from "next/image";
import PinIcon from "@/assets/pin.svg";
import ZoomIcon from "@/assets/zoom.svg";
import CloseIcon from "@/assets/close-black.svg";
import "leaflet/dist/leaflet.css";
import styles from "./InternalMap.module.scss";
import { useScrollBlock } from "@/contexts/useScrollBlock";

export interface MapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [isMapPopupOpen, setMapPopupOpen] = useState<boolean>(false);

  return (
    <>
      <MapContainer
        className={styles.map}
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        zoom={20}
        zoomControl={false}
        scrollWheelZoom
      >
        <div
          className={styles.mapContainerOverlay}
          onDoubleClick={() => setMapPopupOpen(false)}
        />

        <button
          className={styles.zoomButton}
          onClick={() => setMapPopupOpen(!isMapPopupOpen)}
        >
          <Image src={ZoomIcon} width={16} height={16} alt={"pin"} />
        </button>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerLayer>
          <Marker
            position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            }}
            size={[64, 64]}
            placement={"top"}
          >
            <Image src={PinIcon} width={64} height={64} alt={"pin"} />
          </Marker>
        </MarkerLayer>
      </MapContainer>

      {isMapPopupOpen && (
        <LocationDialog
          closeDialog={() => setMapPopupOpen(false)}
          coordinates={coordinates}
        />
      )}
    </>
  );
};

interface LocationDialogProps {
  closeDialog: () => void;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  closeDialog,
  coordinates,
}) => {
  useScrollBlock();

  return (
    <>
      <div
        className={styles.mapBigDisplayOverlay}
        onClick={() => closeDialog()}
      />

      <MapContainer
        className={styles.mapBigDisplay}
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        zoom={20}
        zoomControl={false}
        scrollWheelZoom
      >
        <button className={styles.zoomButton} onClick={() => closeDialog()}>
          <Image src={CloseIcon} width={16} height={16} alt={"close"} />
        </button>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerLayer>
          <Marker
            position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            }}
            size={[64, 64]}
            placement={"top"}
          >
            <Image src={PinIcon} width={64} height={64} alt={"pin"} />
          </Marker>
        </MarkerLayer>
      </MapContainer>
    </>
  );
};

export default Map;
