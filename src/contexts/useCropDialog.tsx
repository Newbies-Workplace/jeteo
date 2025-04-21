import {
  CropImageDialog,
  CropImageProps,
} from "@/components/molecules/cropImageDialog/CropImageDialog";
import React, { useState } from "react";
import { Portal } from "@/components/molecules/portal/Portal";

type CropOptions = Omit<CropImageProps, "imgSrc">;

export const useCropDialog = (
  options: CropOptions
): {
  CropDialog: React.FC;
  openCropDialog: (imageSrc: string) => void;
  closeCropDialog: () => void;
} => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openCropDialog = (src: string) => {
    setImageSrc(src);
  };

  const CropDialog: React.FC = () => {
    if (!imageSrc) {
      return null;
    }

    return (
      <Portal>
        <CropImageDialog
          {...options}
          imgSrc={imageSrc}
          confirmAction={(file) => {
            setImageSrc(null);
            options.confirmAction(file);
          }}
          dismissAction={() => {
            setImageSrc(null);
          }}
        />
      </Portal>
    );
  };

  return {
    CropDialog,
    openCropDialog,
    closeCropDialog: () => setImageSrc(null),
  };
};
