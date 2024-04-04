import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type AuthoredTextProps = {
  children: JSX.Element;
};

export const AuthoredText = (props: AuthoredTextProps): JSX.Element => {
  return <div className={CN(styles.authoredText)}>{props.children}</div>;
};
