import Button from "@/components/atoms/button/Button";
import styles from "./CropImageDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import React, { useRef, useState } from "react";
import { canvasPreview } from "@/components/molecules/cropImageDialog/canvasPreview";

export type CropImageProps = {
  title: string;
  dismissText: string;
  confirmText: string;
  dismissAction: () => void;
  confirmAction: (croppedImage: File) => void;
  imgSrc: string;
  aspectRatio?: number;
};

export const CropImageDialog: React.FC<CropImageProps> = ({
  title,
  dismissText,
  confirmText,
  confirmAction,
  dismissAction,
  imgSrc,
  aspectRatio,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<PixelCrop>({
    unit: "px",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const handleConfirm = async () => {
    confirmAction(await getCroppedImg(imgSrc, crop));
  };

  const getCroppedImg = async (
    imageSrc: string,
    crop: PixelCrop
  ): Promise<File> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");

        canvasPreview(imgRef.current, canvas, crop, 1, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
          }

          const file = new File([blob], "croppedImage", { type: blob.type });

          resolve(file);
        }, "image/jpeg");
      };
    });

  return (
    <div className={styles.backdrop} onClick={dismissAction}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <Text variant="headS" bold className={styles.title}>
          {title}
        </Text>
        <ReactCrop
          crop={crop}
          className={styles.image}
          onChange={(c) => setCrop(c)}
          ruleOfThirds={true}
          aspect={aspectRatio}
        >
          <img src={imgSrc} ref={imgRef} alt="obraz" />
        </ReactCrop>
        <div className={styles.buttons}>
          <Button className={styles.dismiss} onClick={dismissAction}>
            <Text variant="bodyL" className={styles.dismisstext}>
              {dismissText}
            </Text>
          </Button>
          <Button className={styles.confirm} onClick={handleConfirm}>
            <Text variant="bodyL" className={styles.confirmtext}>
              {confirmText}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
