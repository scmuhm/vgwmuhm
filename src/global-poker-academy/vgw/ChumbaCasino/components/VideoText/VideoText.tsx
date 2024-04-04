import { ComponentParams, RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { VideoBlockComponent } from '../VideoBlock/VideoBlock';
import styles from './styles.module.scss';

type VideoTextProps = {
  fields: {
    Text: RichTextField;
  };
  params: ComponentParams;
  reverse?: boolean;
  customBtnClass?: string;
};

export const Default = (props: VideoTextProps): JSX.Element => {
  const { fields } = props;
  return (
    <div
      className={CN(
        'component',
        'LargeTwoColumn',
        props?.customBtnClass,
        styles.container,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.text, 'rich-text', props.reverse && styles.reverse)}>
        <RichText field={fields.Text} />
      </div>
      <div className={CN(styles.video, props.reverse && styles.reverse)}>
        <VideoBlockComponent params={props.params} classNames={styles.childContainer} />
      </div>
    </div>
  );
};

export const LargeMediaLeft = (props: VideoTextProps): JSX.Element => {
  return <Default {...props} customBtnClass="MediaLeft" reverse />;
};

export const MediaRight = (props: VideoTextProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        styles.MediaRight,
        styles.twoColumnContainer,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={fields.Text} />
      </div>
      <div className={CN(styles.video, styles[props.params.Styles?.trimEnd()])}>
        <VideoBlockComponent params={props.params} classNames={styles.childContainer} />
      </div>
    </div>
  );
};

export const MediaLeft = (props: VideoTextProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        'MediaLeft',
        styles.twoColumnContainer,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.video, styles[props.params.Styles?.trimEnd()])}>
        <VideoBlockComponent params={props.params} classNames={styles.childContainer} />
      </div>
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={fields.Text} />
      </div>
    </div>
  );
};
