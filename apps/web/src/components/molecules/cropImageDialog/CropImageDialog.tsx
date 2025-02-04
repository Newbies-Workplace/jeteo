import Button from "@/components/atoms/button/Button";
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

        // @ts-ignore
        canvasPreview(imgRef.current, canvas, crop, 1, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
          }

          // @ts-ignore
          const file = new File([blob], "croppedImage", { type: blob.type });

          resolve(file);
        }, "image/jpeg");
      };
    });

  return (
    <div
      className="fixed inset-0 z-10 flex items-end sm:items-center justify-center bg-black/50"
      onClick={dismissAction}
    >
      <div
        className="flex flex-col items-center gap-2.5 p-4 max-h-[90%] sm:max-w-[90%] bg-white rounded-lg max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Text variant="headS" bold className="self-stretch">
          {title}
        </Text>
        <ReactCrop
          crop={crop}
          className="w-full h-full rounded-lg bg-gray-200 overflow-auto"
          onChange={(c) => setCrop(c)}
          ruleOfThirds={true}
          aspect={aspectRatio}
        >
          <img
            src={imgSrc}
            ref={imgRef}
            alt="obraz"
            className="w-full h-full object-contain"
          />
        </ReactCrop>
        <div className="flex justify-center items-start gap-2.5 self-stretch">
          <Button
            className="flex min-w-[100px] gap-2.5"
            onClick={dismissAction}
          >
            {dismissText}
          </Button>
          <Button
            primary
            className="flex min-w-[100px] gap-2.5 flex-1"
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
