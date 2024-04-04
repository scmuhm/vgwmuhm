import { CookieConsentContext } from 'src/utils/cookie-consent-context';
import styles from './styles.module.scss';
import { useContext } from 'react';

const Footer = (): JSX.Element => {
  const { setPopupVisible } = useContext(CookieConsentContext);
  const showCookiePopup = () => setPopupVisible(true);

  return (
    <footer className={styles.wrapper}>
      <div className={styles.menu}>
        <ul>
          <li>ChumbaCasino Footer</li>
          <li>
            <span className={styles.privacyLink} onClick={showCookiePopup}>
              Your Privacy Choices
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
