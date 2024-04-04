import {
  Image,
  ImageField,
  RichText,
  RichTextField,
  Link,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import styles from './styles.module.scss';
import CN from 'vgw/_shared/utils/classNames';

type ComponentProps = {
  fields: {
    text: RichTextField;
    gameimage1: ImageField;
    gametext1: RichTextField;
    gameimage2: ImageField;
    gametext2: RichTextField;
    gameimage3: ImageField;
    gametext3: RichTextField;
    gameimage4: ImageField;
    gametext4: RichTextField;
    gameimage5: ImageField;
    gametext5: RichTextField;
    gameimage6: ImageField;
    gametext6: RichTextField;
    text1: RichTextField;
    image1: ImageField;
    link1: LinkField;
    link2: LinkField;
    link3: LinkField;
    link4: LinkField;
    link5: LinkField;
    link6: LinkField;
  };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { fields } = props;

  return (
    <div className={styles.wrapper}>
      <div className="rich-text">
        <RichText field={fields.text} />
      </div>
      <div className={styles.gameWrapper}>
        <Link field={props.fields.link1} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage1} className={styles.imageimage} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext1} />
            </div>
          </div>
        </Link>
        <Link field={props.fields.link2} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage2} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext2} />
            </div>
          </div>
        </Link>
        <Link field={props.fields.link3} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage3} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext3} />
            </div>
          </div>
        </Link>
        <Link field={props.fields.link4} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage4} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext4} />
            </div>
          </div>
        </Link>
        <Link field={props.fields.link5} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage5} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext5} />
            </div>
          </div>
        </Link>
        <Link field={props.fields.link6} className={styles.link}>
          <div className={styles.game}>
            <div className={styles.image}>
              <Image field={fields.gameimage6} />
            </div>
            <div className={CN('rich-text', styles.gametext)}>
              <RichText field={fields.gametext6} />
            </div>
          </div>
        </Link>
      </div>
      <div className={CN('rich-text', styles.text)}>
        <RichText field={fields.text1} />
      </div>
      <div>
        <Image field={fields.image1} />
      </div>
    </div>
  );
};
