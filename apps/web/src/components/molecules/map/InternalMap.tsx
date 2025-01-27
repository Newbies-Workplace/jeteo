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
        className={"w-full h-56 rounded-2xl"}
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        zoom={20}
        zoomControl={false}
        scrollWheelZoom
      >
        <div onDoubleClick={() => setMapPopupOpen(false)} />

        <div className={"absolute top-2 left-2 z-[400] flex flex-row gap-2"}>
          <IconButton
            icon={ZoomIcon}
            primary
            size={"small"}
            onClick={() => setMapPopupOpen(!isMapPopupOpen)}
          />

          <IconButton
            icon={MapIcon}
            primary
            size={"small"}
            onClick={() => openGoogleMaps()}
          />
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
        className={"fixed z-[9999] inset-0 bg-black/60"}
        onClick={() => closeDialog()}
      />

      <MapContainer
        className={
          "w-full sm:w-4/5 h-full sm:h-[90%] rounded-[0] sm:rounded-2xl block z-[9999] m-auto fixed inset-0"
        }
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        zoom={20}
        zoomControl={false}
        scrollWheelZoom
      >
        <div className={"absolute top-2 left-2 z-[400] flex flex-row gap-2"}>
          <IconButton
            icon={CloseIcon}
            primary
            size={"small"}
            onClick={() => closeDialog()}
          />
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
