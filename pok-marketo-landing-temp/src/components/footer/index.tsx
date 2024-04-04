import React from 'react';
import styles from './footer.module.css';
import { SocialsIcons } from '../socials-icons';
// import { PrivacyChoiceLink } from '../service/PrivacyChoice';
import NextImage from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer} role='contentinfo'>
            <div className={styles.container}>
                <div className={styles.footerWrapper}>
                    <div className={styles.footerMenu}>
                        <div>
                            <h3>Quick Links</h3>
                            <ul className={styles.menu}>
                                <li className={styles.menuItem}>
                                    <a href='/'>Home</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/championships'>The GP Championships</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/sign-up-offer'>Sign-Up Offer</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/hometown-heroes'>Hometown Heroes</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a target='_blank' href='/terms-conditions-hometown-heroes'>
                                        Hometown Heroes Rules
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Games</h3>
                            <ul className={styles.menu}>
                                <li className={styles.menuItem}>
                                    <a href='/poker-games-online'>Poker Games</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/casino-games'>Casino Games</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>About</h3>
                            <ul className={styles.menu}>
                                <li className={styles.menuItem}>
                                    <a href='/about'>About</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/what-are-gold-coins'>What Are Gold Coins</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/release-notes'>Release Notes</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/play-for-free/'>Play for Free</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/poker-hand-rankings'>Poker Hand Rankings</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/card-room-rules'>Card Room Rules</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/rake'>Rake</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/responsible-gameplay'>Responsible Social Gameplay</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='https://globalpoker.zendesk.com/hc/en-us'>Contact Us</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/poker-dictionary-terms-glossary'>Poker Dictionary</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/merchandise/how-to-claim-merchandise'>How To Claim Merchandise</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Legal</h3>
                            <ul className={styles.menu}>
                                <li className={styles.menuItem}>
                                    <a href='/tournament-cancellation-policy'>Tournament Cancellation Policy</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/terms-conditions'>Terms & Conditions</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/privacy-policy'>Privacy Policy</a>
                                </li>
                                {/* TODO: Add privacy / cookie consent components? */}
                                {/*<PrivacyChoiceLink/>*/}
                                <li className={styles.menuItem}>
                                    <a href='/customer-acceptance-policy'>Customer Acceptance Policy</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/sweeps-rules'>Sweeps Rules</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/live-event-terms-conditions'>Live Event Terms & Conditions</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/celebrity-challenge-meta-promotion-rules'>Social Competition Terms</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Support</h3>
                            <ul className={styles.menu}>
                                <li className={styles.menuItem}>
                                    <a href='https://globalpoker.zendesk.com/hc/en-us'>Help Center</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='https://globalpoker.zendesk.com/hc/en-us/requests/new'>Submit a support ticket</a>
                                </li>
                                <li className={styles.menuItem}>
                                    <a href='/getting-started-verify-redemptions-purchases'>Getting Started</a>
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.footerSocials}`}>
                            <SocialsIcons maxDimension={30} />
                        </div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <div className={styles.widgetMediaImage}>
                        <a
                            target='_blank'
                            rel='noopener'
                            href='https://authorisation.mga.org.mt/verification.aspx?company=4debab56-21d5-49fd-96c5-1c2b5500dbb4&lang=en&details=1'
                            title='Malta Gaming Authority'
                        >
                            <NextImage width={255} height={50} src='/crm/global/images/footer/mga-logo.png' alt='MGA Logo' />
                        </a>
                    </div>
                    <div className={styles.widgetMediaImage}>
                        <a target='_blank' rel='noopener' href='https://itechlabs.com/certificates/vgw/RNG_Certificate_MT_VGW_22Apr21.pdf' title='iTech Labs'>
                            <NextImage width={135} height={50} src='/crm/global/images/footer/itech-black-logo.png' alt='RNG iTech Labs Certified' />
                        </a>
                    </div>
                    <div className={styles.widgetMediaImage}>
                        <a target='_blank' rel='noopener' href='https://rgf.org.mt/' title='Responsible Gaming Foundation'>
                            <NextImage width={70} height={70} src='/crm/global/images/footer/rg-logo.png' alt='RGF Logo' />
                        </a>
                    </div>
                    <div className={styles.widgetMediaImage}>
                        <a target='_blank' rel='noopener' href='https://www.gamingaddictsanonymous.org/' title='Computer Gaming Addicts Anonymous'>
                            <NextImage width={70} height={70} src='/crm/global/images/footer/ico_18Plus.png' alt='CGAA' />
                        </a>
                    </div>
                </div>
                <div className={styles.copyright}>
                    ©VGW Group 2012. All rights reserved. NO PURCHASE NECESSARY to enter Sweepstakes | Gameplay can be harmful if
                    not kept in control, please play responsibly.
                    <br />
                    <br />
                    Global Poker is operated by VGW GP Limited and all payments are processed by VGW GP Limited. The sweepstakes promotions and prizes (Sweeps
                    Coins) offered at Global Poker are operated by VGW Games Limited and are regulated by the Malta Gaming Authority (MGA), licence no.
                    MGA/B2C/188/2010 issued on the 14th August 2017. The registered address of VGW Games Limited is Trident Park, Notabile Gardens, No6 – Level
                    3, Central Business District, Mdina Road, Zone 2 Birkirkara CBD2010 Malta and Phone Number +356 99088901. Gold Coins Games offered by VGW GP
                    Limited are not regulated by the MGA. 18+ Play
                    responsibly:{' '}
                    <a href='https://www.gamingaddictsanonymous.org/' rel='noopener' target='_blank'>
                        https://www.gamingaddictsanonymous.org/
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
