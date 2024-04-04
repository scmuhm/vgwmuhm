import { promises as fs } from 'fs';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import {PrizeDrawForm} from "@/components/prize-draw-form";
import Head from 'next/head';
import Page from "@/components/page";
import { ImageBanner } from "@/components/image-banner";
import Container from "@/components/container";

interface CampaignPageProps {
    campaignId: string;
    imageSrc: string;
    h1: string;
    intro: string;
    finalDrawEnterDate: string;
    winnersNotifiedByDate: string;
    feedbackMessage: string;
    promotionRulesSrc: string;
}

export const CampaignPage = (props: CampaignPageProps): React.ReactElement => {

    if (!props.campaignId) {
        return <div>Campaign Id not found</div>;
    }

    return (
        <>
            <Page>
                <Container>
                    <ImageBanner imageSrc={`/crm/prize-draw/images/banner/pok_prize_draw_banner_wide.jpeg`} />
                    <PrizeDrawForm
                        h1={props.h1}
                        intro={props.intro}
                        finalDrawEnterDate={props.finalDrawEnterDate}
                        winnersNotifiedByDate={props.winnersNotifiedByDate}
                        feedbackMessage={props.feedbackMessage}
                        promotionRulesSrc={props.promotionRulesSrc}
                        buttonColor={`red`}
                    />
                </Container>
            </Page>
        </>
    );
};

export const getStaticPaths = async () => {

    const configFile = await fs.readFile(`${process.cwd()}/src/config/prize-draw.json`, `utf-8`);
    const config = JSON.parse(configFile);

    const campaignPaths = Object.keys(config.campaigns).map(campaignId => ({
        params: { [`campaign-id`]: campaignId},
    }));

    return {
        paths: campaignPaths,
        fallback: false, // false or"blocking"
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const campaignId = context.params?.[`campaign-id`] as string;

    const configFile = await fs.readFile(`${process.cwd()}/src/config/prize-draw.json`, `utf-8`);
    const config = JSON.parse(configFile);

    const campaign = config.campaigns[campaignId];

    return {
        props: {
            campaignId,
            ...campaign,
        },
    };
};

export default CampaignPage;
