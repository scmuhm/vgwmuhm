import {
  Text,
  TextField,
  RichTextField,
  RichText,
  LinkField,
  ImageField,
  Image,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Heading } from 'vgw/_shared/components/Typography';
import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type GameFeatureTilesProps = {
  fields: {
    heading: TextField;
    [key: string]: TextField | RichTextField | LinkField | ImageField;
  };
};

export const Default = (props: GameFeatureTilesProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  const generateTile = (tileNumber: number) => {
    const tileText = fields[`GameTile${tileNumber}Text`] as RichTextField;
    const tileUrl = fields[`GameTile${tileNumber}Url`] as LinkField;
    const tileIcon1 = fields[`GameTile${tileNumber}Icon1`] as ImageField;
    const tileIcon2 = fields[`GameTile${tileNumber}Icon2`] as ImageField;
    const tileIcon3 = fields[`GameTile${tileNumber}Icon3`] as ImageField;
    const tileIcon4 = fields[`GameTile${tileNumber}Icon4`] as ImageField;
    const tileCallout = fields[`GameTile${tileNumber}Callout`] as RichTextField;
    const tileImage = fields[`GameTile${tileNumber}Image`] as ImageField;

    return (
      <Link className={styles.tileLink} field={tileUrl}>
        <div className={styles.tile}>
          <div className={styles.tileContent}>
            {tileText.value && (
              <div className={styles.textContent}>
                <RichText field={tileText} />
              </div>
            )}
            <div className={styles.iconContent}>
              {tileIcon1.value && (
                <div className={styles.tileIcons}>
                  <Image field={tileIcon1} className={styles.tileIcon} />
                  {tileIcon2.value && <Image field={tileIcon2} className={styles.tileIcon} />}
                  {tileIcon3.value && <Image field={tileIcon3} className={styles.tileIcon} />}
                  {tileIcon4.value && <Image field={tileIcon4} className={styles.tileIcon} />}
                </div>
              )}
              {tileCallout.value && (
                <div className={styles.tileCallout}>
                  <RichText field={tileCallout} />
                </div>
              )}
            </div>
          </div>
          {tileImage.value && <Image field={tileImage} className={styles.tileImage} />}
        </div>
      </Link>
    );
  };

  const tileCount = 3; // This can be adjusted according to number of desired tiles

  return (
    <div className={`${CN('component')} ${styles.wrapper}`}>
      <div className={styles.container}>
        {fields.heading.value && (
          <Heading level={2} className={styles.heading}>
            <Text field={fields.heading} />
          </Heading>
        )}

        <div className={styles.tilesWrapper}>
          {Array.from({ length: tileCount }, (_, index) => index + 1).map((tileNumber) => (
            <div key={tileNumber} className={styles.tilesWrapper}>
              {generateTile(tileNumber)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
