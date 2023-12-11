import Button from "@/components/atoms/button/Button";
import styles from "./CropImageDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";

interface CropImageProps {
  title: string;
  dismissText: string;
  confirmText: string;
  imgSrc?: any;
}

export const CropImageDialog: React.FC<CropImageProps> = ({
  title,
  dismissText,
  confirmText,
  imgSrc,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Text variant="headS" bold className={styles.title}>
          {title}
        </Text>

        <div className={styles.buttons}>
          <Button className={styles.dismiss}>
            <Text variant="bodyL" className={styles.dismisstext}>
              {dismissText}
            </Text>
          </Button>
          <Button className={styles.confirm}>
            <Text variant="bodyL" className={styles.confirmtext}>
              {confirmText}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
