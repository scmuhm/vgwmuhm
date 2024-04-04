import {
  ComponentParams,
  Text,
  TextField,
  Image,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import { Body } from 'vgw/_shared/components/Typography';
import styles from './styles.module.scss';

type WinnerTileProps = {
  fields: {
    text: TextField;
    text1: TextField;
    text2: TextField;
    image1: ImageField;
    image2: ImageField;
  };
  params: ComponentParams;
  reverse?: boolean;
};

export const Default = (props: WinnerTileProps): JSX.Element => {
  const { fields } = props;
  if (!fields) return <></>;

  return (
    <div
      className={CN(
        'component',
        styles.container,
        props.params?.Styles?.trimEnd(),
        props.reverse && styles.reverse
      )}
    >
      <div className={CN(styles.wrapper, props.params?.Champion && styles.showTrophy)}>
        <div className={styles.textcontent}>
          <Body size={2} className={styles.username}>
            <Text field={fields.text} />
          </Body>
          <Body size={3} className={styles.coins}>
            <Text field={fields.text1} />
          </Body>
          <Body
            size={2}
            className={CN(styles.text, props.params?.scWinner ? styles.scWinner : styles.gcWinner)}
          >
            <Text field={fields.text2} />
          </Body>
        </div>
        <div className={styles.tournamentImage}>
          <Image field={fields.image1} />
        </div>
        <div className={styles.championBadge}>
          <Image field={fields.image2} />
        </div>
      </div>
    </div>
  );
};
