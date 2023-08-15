import dynamic from "next/dynamic";

export const MapPicker = dynamic(() => import('./InternalMapPicker'), {
  ssr: false,
});
