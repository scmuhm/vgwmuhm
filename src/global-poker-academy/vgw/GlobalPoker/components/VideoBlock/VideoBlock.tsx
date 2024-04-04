import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type VideoBlockProps = {
  params: ComponentParams;
};

export const Default = (props: VideoBlockProps): JSX.Element => {
  const { params } = props;

  if (!params) return <></>;

  return (
    <div
      className={CN('component', styles.container, props.params?.Styles?.trimEnd())}
      style={{ '--aspect-ratio': params.AspectRatio } as React.CSSProperties}
    >
      <iframe
        className={styles.iframe}
        width="100%"
        height="auto"
        title={params.Title}
        src={params.VideoURL}
      />
    </div>
  );
};
