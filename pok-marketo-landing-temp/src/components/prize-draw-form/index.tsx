import React, { FunctionComponent, useState } from 'react';
import { ClientConfig } from '../../config/config-service';
import styles from './prize-draw-form.module.css';
import Button from "@/components/button";
import {Link} from "@/components/link";

export const PrizeDrawForm: FunctionComponent<{
    buttonColor?: 'red' | 'white' | 'orange' | 'black';
    h1: string;
    intro: string;
    winnersNotifiedByDate: string;
    finalDrawEnterDate: string;
    feedbackMessage: string;
    promotionRulesSrc: string;
}> = ({ buttonColor, h1, intro, finalDrawEnterDate, winnersNotifiedByDate, feedbackMessage, promotionRulesSrc }) => {
    function getButtonColorClass(): string {
        switch (buttonColor) {
            case ('red'): {
                return styles.redButton
            }
            case ('white'): {
                return styles.whiteButton
            }
            case ('orange'): {
                return styles.orangeButton
            }
            default: {
                return styles.blackButton
            }
        }
    }

    const [isSubmitError, setIsSubmitError] = useState<boolean | null>(null);
    const [hasToken, setHasToken] = useState<boolean>(true);
    const submitToken = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get(`token`);

        if (token) {
            try {
                const decodedToken: string = Buffer.from(token, `base64`).toString(`utf-8`);

                const postResponse = await fetch(`${ClientConfig.MAR_PIPELINE_HOST}/notification/landing/prize-draw-entry`, {
                    method: `POST`,
                    headers: {
                        Accept: `application/json`,
                        'Content-Type': `application/json`,
                    },
                    body: decodedToken,
                });

                const jsonResponse = await postResponse.json();

                if (jsonResponse.success) {
                    setIsSubmitError(false);
                } else {
                    setIsSubmitError(true);
                    throw new Error(`${jsonResponse.status} ${jsonResponse.statusText}`);
                }
            } catch (e) {
                setIsSubmitError(true);
            }
        } else {
            setHasToken(false)
        }
    };

    return (
        <form
            onSubmit={submitToken}
            className={styles.form}
        >
            <div className={styles.content}>
                <div>
                    <div>
                        <h1 className={styles.h1}>{h1}</h1>
                        <p>{intro}</p>
                    </div>
                    <div>
                        <h2 className={styles.h2}>HOW DO I ENTER?</h2>
                        <p>
                            Entering this prize draw is easy! Just click the link below between now and {finalDrawEnterDate}. The maximum
                            entries into this competition is one per person.
                        </p>
                    </div>
                </div>

                <input
                    className={`${styles.button} ${getButtonColorClass()}`}
                    value={"ENTER PRIZE DRAW"}
                    type={"submit"}
                />

                {!hasToken && (
                    <div className={styles.submitError}>
                        <p>Something went wrong. Please click the opt in link in your Prize draw email.</p>
                    </div>
                )}

                {isSubmitError === true && (
                    <div className={styles.submitError}>
                        <p>Sorry, something went wrong and we were unable to process your request.</p>
                    </div>
                )}

                {isSubmitError === false && (
                    <div className={styles.submitSuccess}>
                        <h2 className={styles.h2}>THANK YOU FOR OPTING IN!</h2>
                        <h3 className={styles.h3}>What happens now?</h3>
                        <p>
                            {feedbackMessage}   
                        </p>
                        <h3 className={styles.h3}>How will I know if I have won?</h3>
                        <p>Winners will be notified by {winnersNotifiedByDate}. Please keep an eye on your inbox.</p>

                        <Button
                            label={`Back to Global Poker`}
                            url={`/`}
                            color={`red`}
                        />
                    </div>
                )}
            </div>

            <div className={styles.termsConditions}>
                <span className={styles.heading}>TERMS AND CONDITIONS</span>
                <p>By entering this Promotion, you agree to be bound by these <Link href={`${promotionRulesSrc}`}>Promotion Rules</Link>, which include and are inseparably linked to the <Link href={"https://globalpoker.com/docs/gp-terms-conditions-6.2.0.pdf?lid=1os7dx4iton5"}>Global Poker Terms and Conditions</Link>, <Link href={"https://globalpoker.com/docs/gp-privacy-policy-2.7.pdf?lid=lmmohb0u6cbd"}>Privacy Policy</Link>, <Link href={"https://globalpoker.com/docs/gp-responsible-gameplay-3.1.pdf?lid=27uuoqu30or6"}>Responsible Social Gameplay Policy</Link> and <Link href={"https://globalpoker.com/docs/gp-sweeps-rules-5.0.pdf?lid=5ic6g00bw9lz"}>Sweeps Rules</Link> (collectively, the Official Rules), and by the decisions of VGW Group, which are final on all matters relating to the Promotion. VGW Group reserves the right, in its sole discretion, to amend these Promotion Rules or to otherwise cancel, suspend or modify this Promotion in any manner it deems appropriate at any time and without prior notice to you. You will have no legal recourse against the Promotion Parties or their respective employees, for any such change, suspension or termination.</p>
            </div>
        </form>
    );
};

