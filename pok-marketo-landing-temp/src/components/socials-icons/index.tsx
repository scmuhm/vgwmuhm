import React from 'react';

interface SocialsIconsProps {
  maxDimension: number
  svgCssFilter?: {
    facebook?: string
    twitter?: string
    instagram?: string
  } /// You can convert RGB to css filter using this site: https://codepen.io/sosuke/pen/Pjoqqp
}

const WHITE_FILTER = 'invert(100%) sepia(0%) saturate(21%) hue-rotate(17deg) brightness(105%) contrast(105%)';

const FACEBOOK_WIDTH_MULTIPLIER = 0.625; /// ratio of 5:8
const FACEBOOK_HEIGHT_RATIO = 1.6; /// ratio of 5:8
const TWITTER_WIDTH_RATIO = 1;
const TWITTER_HEIGHT_RATIO = 1;
const INSTAGRAM_WIDTH_MULTIPLIER = 0.875; /// ratio of 7:8
const INSTAGRAM_HEIGHT_MULTIPLIER = 1.143; /// ratio of 7:8

export function SocialsIcons(props: SocialsIconsProps) {
  return (
    <>
      <a rel='noopener' href='https://www.facebook.com/globalpokerofficial' style={{marginRight: '16px',}}>
        <img src='/crm/global/images/socials/facebook-icon.svg' style={{ filter: props.svgCssFilter?.facebook || WHITE_FILTER }} alt='Facebook Socials Link Icon' width={props.maxDimension * FACEBOOK_WIDTH_MULTIPLIER} height={props.maxDimension} />
      </a>
      <a rel='noopener' href='https://twitter.com/official_glp?lang=en' style={{marginRight: '16px',}}>
        <img src='/crm/global/images/socials/twitter-icon.svg' style={{ filter: props.svgCssFilter?.twitter || WHITE_FILTER }} alt='Twitter Socials Link Icon' width={props.maxDimension} height={props.maxDimension} />
      </a>
      <a rel='noopener' href='https://www.instagram.com/global.poker/' style={{marginRight: '16px',}}>
        <img src='/crm/global/images/socials/instagram-icon.svg' style={{ filter: props.svgCssFilter?.instagram || WHITE_FILTER }} alt='Instagram Socials Link Icon' width={props.maxDimension * INSTAGRAM_WIDTH_MULTIPLIER} height={props.maxDimension} />
      </a>
    </>
  )
}

