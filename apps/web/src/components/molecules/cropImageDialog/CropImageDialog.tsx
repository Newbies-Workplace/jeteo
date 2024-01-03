import Button from "@/components/atoms/button/Button";
import styles from "./CropImageDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import React, { useState } from "react";

interface CropImageProps {
  title: string;
  dismissText: string;
  confirmText: string;
  dismissAction: () => void;
  confirmAction: (croppedImage: Blob) => void;
  imgSrc: any; // todo change
  aspectRatio?: any; // todo change
}

export const CropImageDialog: React.FC<CropImageProps> = ({
  title,
  dismissText,
  confirmText,
  confirmAction,
  dismissAction,
  imgSrc,
  aspectRatio,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const handleConfirm = async () => {
    confirmAction(await getCroppedImg(imgSrc, crop));
  };

  const getCroppedImg = async (imageSrc: string, crop: Crop): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            //reject new Error('Canvas is empty');
            console.error("Canvas is empty");
            return;
          }
          resolve(blob);
        }, "image/jpeg");
      };
    });

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Text variant="headS" bold className={styles.title}>
          {title}
        </Text>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={aspectRatio}
        >
          <img src={imgSrc} alt="obraz" />
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
