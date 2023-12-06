"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, MarkerLayer } from "react-leaflet-marker";
import Image from "next/image";
import PinIcon from "@/assets/pin.svg";
import ZoomIcon from "@/assets/ZoomIn.svg";
import CloseIcon from "@/assets/close.svg";
import MapIcon from "@/assets/map.svg";
import "leaflet/dist/leaflet.css";
import styles from "./InternalMap.module.scss";
import { useScrollBlock } from "@/contexts/useScrollBlock";
import { IconButton } from "@/components/atoms/iconButton/IconButton";

export interface MapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [isMapPopupOpen, setMapPopupOpen] = useState<boolean>(false);

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`,
      "_blank"
    );
  };

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

        <div className={styles.zoomButton}>
          <IconButton
            icon={ZoomIcon}
            primary
            onClick={() => setMapPopupOpen(!isMapPopupOpen)}
          />
        </div>

        <div className={styles.googleMapButton}>
          <IconButton icon={MapIcon} primary onClick={() => openGoogleMaps()} />
        </div>

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
        <div className={styles.zoomButton}>
          <IconButton icon={CloseIcon} primary onClick={() => closeDialog()} />
        </div>

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
