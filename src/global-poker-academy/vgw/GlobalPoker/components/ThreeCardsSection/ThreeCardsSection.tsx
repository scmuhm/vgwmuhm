import {
  Image,
  ImageField,
  TextField,
  Text,
  ComponentParams,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import SpadeBlack from 'vgw/GlobalPoker/assets/images/spade-black.svg';

import CN from 'vgw/_shared/utils/classNames';
import { Body } from 'vgw/_shared/components/Typography';

import styles from './styles.module.scss';

type ThreeCardsSectionProps = {
  fields: {
    text: RichTextField;
    text1: RichTextField;
    author1: TextField;
    avatar1: ImageField;
    text2: RichTextField;
    author2: TextField;
    avatar2: ImageField;
    text3: RichTextField;
    author3: TextField;
    avatar3: ImageField;
  };
  params: ComponentParams;
};

export const Default = (props: ThreeCardsSectionProps): JSX.Element => {
  const { fields, params = {} } = props;

  if (!fields) return <></>;

  return (
    <div
      className={CN('component', styles.section, params.Styles?.trimEnd())}
      style={
        {
          '--spade-icon': `url(${SpadeBlack.src})`,
        } as React.CSSProperties
      }
    >
      <div className={styles.container}>
        <div className={styles.mainText}>
          <RichText field={fields.text} />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.column}>
            <div className={styles.card}>
              <div className={styles.inner}>
                <div className={styles.text}>
                  <RichText field={fields.text1} />
                </div>

                <div className={styles.author}>
                  <Image field={fields.avatar1} />
                  <Body size={3}>
                    <Text field={fields.author1} />
                  </Body>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.card}>
              <div className={styles.inner}>
                <div className={styles.text}>
                  <RichText field={fields.text2} />
                </div>

                <div className={styles.author}>
                  <Image field={fields.avatar2} />
                  <Body size={3}>
                    <Text field={fields.author2} />
                  </Body>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.card}>
              <div className={styles.inner}>
                <div className={styles.text}>
                  <RichText field={fields.text3} />
                </div>

                <div className={styles.author}>
                  <Image field={fields.avatar3} />
                  <Body size={3}>
                    <Text field={fields.author3} />
                  </Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
