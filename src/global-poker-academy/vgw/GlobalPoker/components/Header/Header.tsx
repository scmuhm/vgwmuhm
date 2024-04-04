import NextImage from 'next/image';
import GPLogoWhite from 'vgw/GlobalPoker/assets/images/gp-logo-white.svg';
import { Button } from 'vgw/_shared/components/Button';
import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { Heading } from 'vgw/_shared/components/Typography';
import PlayPoker from './images/play-poker.webp';
import PokerClock from './images/poker-clock.webp';
import SignUpPromo from './images/sign-up-promo.webp';
import HamburgerIcon from './components/hamburger';
import { useState } from 'react';

export const Default = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <HamburgerIcon
        mobileMenuOpen={mobileMenuOpen}
        handleOnclick={() => setMobileMenuOpen((prev) => !prev)}
      />
      <div className={styles.container}>
        <div className={CN(styles.logo, mobileMenuOpen && styles.mobileMenuOpen)}>
          <a href="/">
            <NextImage src={GPLogoWhite} width={115} alt="Global Poker logo" />
          </a>
        </div>

        <nav className={CN(styles.menu, mobileMenuOpen && styles.mobileMenuOpen)}>
          <ul className={styles.topLevel}>
            <li>
              <a href="/" className={CN(styles.link, styles.linkHome)}>
                Home
              </a>
            </li>

            <li>
              <span className={styles.link}>Tournaments & promotions</span>

              <div className={styles.megaMenu}>
                <div className={styles.container}>
                  <div className={styles.megaMenuRow}>
                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a className={CN(styles.link, styles.linkHeading)} href="/championships">
                            The GP championships
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/online-poker-promotions/rattlesnake-open"
                          >
                            Rattlesnake Open
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/grizzly-games">
                            Grizzly games
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/the-goat">
                            The goat
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/eagle-cup">
                            Eagle cup
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="/online-poker-promotions"
                          >
                            Promotions
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/grizzly-games/">
                            Grizzly Games VII
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="/online-poker-tournaments"
                          >
                            Weekly Poker Tournaments
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/online-poker-promotions/sunday-scrimmage"
                          >
                            SUNDAY SCRIMMAGE
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/online-poker-promotions/gold-coin-scrimmage"
                          >
                            GOLDEN SCRIMMAGE
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/gold-rush">
                            GOLD RUSH
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/bonanza">
                            BONANZA
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-poker-promotions/daily-hundo">
                            DAILY HUNDO
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a
                        href="https://play.globalpoker.com/login?platform=globalpoker.com"
                        className={styles.megaMenuCallout}
                      >
                        <NextImage
                          src={PlayPoker}
                          className={styles.megaMenuImage}
                          alt="Play Poker"
                        />
                        <Heading level={4}>PLAY POKER</Heading>
                      </a>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a
                        href="/online-poker-tournaments/poker-clock-timer/"
                        className={styles.megaMenuCallout}
                      >
                        <NextImage
                          src={PokerClock}
                          className={styles.megaMenuImage}
                          alt="Get our clock app"
                        />
                        <Heading level={4}>GET OUR CLOCK APP</Heading>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <span className={styles.link}>Games</span>

              <div className={styles.megaMenu}>
                <div className={styles.container}>
                  <div className={styles.megaMenuRow}>
                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="/poker-games-online"
                          >
                            Poker Games
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/private-games">
                            Private Games
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/texas-holdem">
                            Texas Holdem
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/omaha">
                            Omaha
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/omaha-high-low">
                            Omaha High/Low
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/bounty-tournaments">
                            Bounty Poker
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/jackpot-sitngo">
                            Jackpot Sit&apos;n&apos;go
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-games-online/crazy-pineapple">
                            Crazy Pineapple
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a className={CN(styles.link, styles.linkHeading)} href="/casino-games">
                            Casino Games
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/casino-games/slots">
                            Slots
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/casino-games/table-games">
                            Table games
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a className={CN(styles.link, styles.linkHeading)}>Ring Game Features</a>
                        </li>
                        <li>
                          <a className={styles.link} href="/ring-games/the-vault">
                            The Vault
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a
                        href="https://play.globalpoker.com/login?platform=globalpoker.com"
                        className={styles.megaMenuCallout}
                      >
                        <NextImage
                          src={PlayPoker}
                          className={styles.megaMenuImage}
                          alt="Play Poker"
                        />
                        <Heading level={4}>PLAY POKER</Heading>
                      </a>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a href="/sign-up-offer/" className={styles.megaMenuCallout}>
                        <NextImage
                          src={SignUpPromo}
                          className={styles.megaMenuImage}
                          alt="Sign up offer"
                        />
                        <Heading level={4}>SIGN UP OFFER</Heading>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <span className={styles.link}>About</span>

              <div className={styles.megaMenu}>
                <div className={styles.container}>
                  <div className={styles.megaMenuRow}>
                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a className={CN(styles.link, styles.linkHeading)} href="/about">
                            About
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/vgw-play-ferrari">
                            VGW PLAY X FERRARI
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/what-are-gold-coins">
                            WHAT ARE GOLD COINS
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-hand-rankings">
                            Poker Hand Rankings
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/card-room-rules">
                            Card Room Rules
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/rake">
                            Rake
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/responsible-gameplay">
                            Responsible Social Gameplay
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="https://globalpoker.zendesk.com/hc/en-us"
                          >
                            Contact Us
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/poker-dictionary-terms-glossary">
                            Poker Dictionary
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.megaMenuColumn}></div>

                    <div className={styles.megaMenuColumn}>
                      <a
                        href="https://play.globalpoker.com/login?platform=globalpoker.com"
                        className={styles.megaMenuCallout}
                      >
                        <NextImage
                          src={PlayPoker}
                          className={styles.megaMenuImage}
                          alt="Play Poker"
                        />
                        <Heading level={4}>PLAY POKER</Heading>
                      </a>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a href="/sign-up-offer/" className={styles.megaMenuCallout}>
                        <NextImage
                          src={SignUpPromo}
                          className={styles.megaMenuImage}
                          alt="Sign up offer"
                        />
                        <Heading level={4}>SIGN UP OFFER</Heading>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <span className={styles.link}>Support</span>

              <div className={styles.megaMenu}>
                <div className={styles.container}>
                  <div className={styles.megaMenuRow}>
                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="https://globalpoker.zendesk.com/hc/en-us/requests/new"
                          >
                            Submit a support ticket
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="https://globalpoker.zendesk.com/hc/en-us"
                          >
                            Help Center
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="/getting-started-verify-redemptions-purchases"
                          >
                            Getting started
                          </a>
                        </li>
                        <li>
                          <a className={styles.link} href="/online-safety">
                            HOW TO KEEP YOUR ACCOUNT SECURE
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/getting-started-verify-redemptions-purchases/#create"
                          >
                            Create Account
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/getting-started-verify-redemptions-purchases/#purchase"
                          >
                            Purchase
                          </a>
                        </li>
                        <li>
                          <a
                            className={styles.link}
                            href="/getting-started-verify-redemptions-purchases/#verify"
                          >
                            Verify Account
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.megaMenuColumn}>
                      <ul>
                        <li>
                          <a
                            className={CN(styles.link, styles.linkHeading)}
                            href="/merchandise/how-to-claim-merchandise"
                          >
                            HOW TO CLAIM MERCHANDISE
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a
                        href="https://play.globalpoker.com/login?platform=globalpoker.com"
                        className={styles.megaMenuCallout}
                      >
                        <NextImage
                          src={PlayPoker}
                          className={styles.megaMenuImage}
                          alt="Play Poker"
                        />
                        <Heading level={4}>PLAY POKER</Heading>
                      </a>
                    </div>

                    <div className={styles.megaMenuColumn}>
                      <a href="/sign-up-offer/" className={styles.megaMenuCallout}>
                        <NextImage
                          src={SignUpPromo}
                          className={styles.megaMenuImage}
                          alt="Sign up offer"
                        />
                        <Heading level={4}>SIGN UP OFFER</Heading>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className={styles.user} onClick={() => null}>
              <div className={styles.buttons}>
                <Button
                  component="a"
                  size={1}
                  color="white"
                  href="https://play.globalpoker.com/register?platform=globalpoker.com"
                >
                  Register
                </Button>
                <Button
                  component="a"
                  size={1}
                  color="white"
                  ghost
                  href="https://play.globalpoker.com/login?platform=globalpoker.com"
                >
                  Log in
                </Button>
              </div>
            </li>
          </ul>

          <a href="/sign-up-offer/" className={CN(styles.megaMenuCallout, styles.mobileCallout)}>
            <NextImage src={SignUpPromo} className={styles.megaMenuImage} alt="Sign up offer" />
            <Heading level={4}>SIGN UP OFFER</Heading>
          </a>
        </nav>
      </div>
    </div>
  );
};
