import Button from "@/components/atoms/button/Button";
import styles from "./CropImageDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { useState } from "react";

interface CropImageProps {
  title: string;
  dismissText: string;
  confirmText: string;
  dismissAction: () => void;
  confirmAction: (crop: Crop) => void;
  imgSrc: any;
  aspectRatio?: any;
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
    unit: "px",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  function handleConfirm() {
    confirmAction(crop);
  }

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
