import { useContext } from 'react';
import NextImage from 'next/image';

import { CookieConsentContext } from 'src/utils/cookie-consent-context';

import { Body, Heading } from 'vgw/_shared/components/Typography';

import MGALogo from './images/mga-logo.webp';
import ITechLogo from './images/itech-logo.png';
import RGFLogo from './images/rgf-logo.png';
import RGF18Logo from './images/rgf-18-logo.png';

import styles from './styles.module.scss';

export const Default = (): JSX.Element => {
  const { setPopupVisible } = useContext(CookieConsentContext);

  const showCookiePopup = () => setPopupVisible(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Heading level={5} className={styles.menuHeading}>
              Quick Links
            </Heading>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/championships">The GP Championships</a>
              </li>
              <li>
                <a href="/sign-up-offer">Sign-Up Offer</a>
              </li>
              <li>
                <a href="/hometown-heroes">Hometown Heroes</a>
              </li>
              <li>
                <a target="_blank" href="/terms-conditions-hometown-heroes">
                  Hometown Heroes Rules
                </a>
              </li>
            </ul>

            <Heading level={5} className={styles.menuHeading}>
              Games
            </Heading>
            <ul>
              <li>
                <a href="/poker-games-online">Poker Games</a>
              </li>
              <li>
                <a href="/casino-games">Casino Games</a>
              </li>
            </ul>
          </div>

          <div className={styles.menuItem}>
            <Heading level={5} className={styles.menuHeading}>
              About
            </Heading>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/what-are-gold-coins">What Are Gold Coins</a>
              </li>
              <li>
                <a href="/release-notes">Release Notes</a>
              </li>
              <li>
                <a href="/play-for-free">Play For Free</a>
              </li>
              <li>
                <a href="/poker-hand-rankings">Poker Hand Rankings</a>
              </li>
              <li>
                <a href="/card-room-rules">Card Room Rules</a>
              </li>
              <li>
                <a href="/rake">Rake</a>
              </li>
              <li>
                <a href="/responsible-gameplay">Responsible Social Gameplay</a>
              </li>
              <li>
                <a href="https://globalpoker.zendesk.com/hc/en-us">Contact Us</a>
              </li>
              <li>
                <a href="/poker-dictionary-terms-glossary">Poker Dictionary</a>
              </li>
              <li>
                <a href="/merchandise/how-to-claim-merchandise">How To Claim Merchandise</a>
              </li>
            </ul>
          </div>

          <div className={styles.menuItem}>
            <Heading level={5} className={styles.menuHeading}>
              Legal
            </Heading>
            <ul>
              <li>
                <a href="/tournament-cancellation-policy">Tournament cancellation policy</a>
              </li>
              <li>
                <a href="/terms-conditions">Terms & conditions</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy policy</a>
              </li>
              <li>
                <span onClick={showCookiePopup}>Your Privacy Choices</span>
              </li>
              <li>
                <a href="/customer-acceptance-policy">Customer acceptance policy</a>
              </li>
              <li>
                <a href="/sweeps-rules">Sweeps rules</a>
              </li>
              <li>
                <a href="/live-event-terms-conditions">Live event terms & conditions</a>
              </li>
              <li>
                <a href="/celebrity-challenge-meta-promotion-rules">Social competition terms</a>
              </li>
            </ul>

            <Heading level={5} className={styles.menuHeading}>
              Support
            </Heading>
            <ul>
              <li>
                <a href="https://globalpoker.zendesk.com/hc/en-us">Help center</a>
              </li>
              <li>
                <a href="https://globalpoker.zendesk.com/hc/en-us/requests/new">
                  Submit a support ticket
                </a>
              </li>
              <li>
                <a href="/getting-started-verify-redemptions-purchases">Getting started</a>
              </li>
            </ul>
          </div>

          <div className={styles.menuItem}>
            <ul className={styles.social}>
              <li>
                <a rel="noopener" href="https://www.facebook.com/globalpokerofficial">
                  <img src="/facebook-icon.svg" alt="Facebook" />
                </a>
              </li>
              <li>
                <a rel="noopener" href="https://twitter.com/official_glp?lang=en">
                  <img src="/twitter-icon.svg" alt="Twitter" />
                </a>
              </li>
              <li>
                <a rel="noopener" href="https://www.instagram.com/global.poker/">
                  <img src="/instagram-icon.svg" alt="Instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.logos}>
          <a
            target="_blank"
            rel="noopener"
            href="https://authorisation.mga.org.mt/verification.aspx?company=4debab56-21d5-49fd-96c5-1c2b5500dbb4&lang=en&details=1"
            title="Malta Gaming Authority"
          >
            <NextImage src={MGALogo} width={254} alt="MGA logo" />
          </a>

          <a
            target="_blank"
            rel="noopener"
            href="https://itechlabs.com/certificates/vgw/RNG_Certificate_MT_VGW_22Apr21.pdf"
          >
            <NextImage src={ITechLogo} width={137.5} alt="iTech logo" />
          </a>

          <a
            target="_blank"
            rel="noopener"
            href="https://rgf.org.mt/"
            title="Responsible Gaming Foundation"
          >
            <NextImage src={RGFLogo} width={50} alt="RGF logo" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.gamingaddictsanonymous.org/"
            title="Computer Gaming Addicts Anonymous"
          >
            <NextImage src={RGF18Logo} width={50} alt="RGF 18+ logo" />
          </a>
        </div>

        <div className={styles.copyright}>
          <Body size={1}>
            ©VGW Group 2012. All rights reserved. NO PURCHASE NECESSARY to enter Sweepstakes |
            Gameplay can be harmful if not kept in control, please play responsibly.
          </Body>

          <Body size={1}>
            Global Poker is operated by VGW GP Limited and all payments are processed by VGW GP
            Limited. The sweepstakes promotions and prizes (Sweeps Coins) offered at Global Poker
            are operated by VGW Games Limited and are regulated by the Malta Gaming Authority (MGA),
            licence no. MGA/B2C/188/2010 issued on the 14th August 2017. The registered address of
            VGW Games Limited is Trident Park, Notabile Gardens, No6 - Level 3, Central Business
            District, Mdina Road, Zone 2 Birkirkara CBD2010 Malta and Phone Number +356 99088901.
            Gold Coins Games offered by VGW GP Limited are not regulated by the MGA. 18+ Play
            responsibly:{' '}
            <a href="https://www.gamingaddictsanonymous.org/">
              https://www.gamingaddictsanonymous.org/
            </a>
          </Body>
        </div>
      </div>
    </div>
  );
};
