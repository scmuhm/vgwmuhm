import {
  Image,
  ImageField,
  Text,
  TextField,
  RichText,
  RichTextField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import { Heading } from 'vgw/_shared/components/Typography';

import styles from './styles.module.scss';

type ColumnNumberedContentProps = {
  fields: {
    Image1: ImageField;
    Heading1: TextField;
    Text1: RichTextField;
    Image2: ImageField;
    Heading2: TextField;
    Text2: RichTextField;
  };
  params: ComponentParams;
  reverse?: boolean;
};

export const Default = (props: ColumnNumberedContentProps): JSX.Element => {
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
      <ol className={styles.wrapper}>
        <li className={styles.column}>
          <div className={styles.inner}>
            <Heading className={styles.number} component="span" level={3}>
              1.
            </Heading>

            <div className={styles.content}>
              <Heading className={styles.heading} level={3}>
                <Text field={fields.Heading1} />
              </Heading>
              <div className="rich-text">
                <RichText field={fields.Text1} />
              </div>
            </div>
          </div>

          <div className={styles.image}>
            <Image field={fields.Image1} />
          </div>
        </li>

        <li className={styles.column}>
          <div className={styles.inner}>
            <Heading className={styles.number} component="span" level={3}>
              2.
            </Heading>

            <div className={styles.content}>
              <Heading className={styles.heading} level={3}>
                <Text field={fields.Heading2} />
              </Heading>
              <div className="rich-text">
                <RichText field={fields.Text2} />
              </div>
            </div>
          </div>

          <div className={styles.image}>
            <Image field={fields.Image2} />
          </div>
        </li>
      </ol>
    </div>
  );
};

export const ColumnNumberedContentImageRight = (props: ColumnNumberedContentProps): JSX.Element => {
  return <Default {...props} reverse />;
};
