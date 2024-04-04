import { useState } from 'react';

import { Heading } from 'vgw/_shared/components/Typography';
import styles from './styles.module.scss';
import CN from 'vgw/_shared/utils/classNames';
import { ClientConfig } from '../../../../scripts/config/service';

export const Default = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.contentWrapper}>
        <div className={CN('component', styles.container)}>
          <div className={styles.contentContainer}>
            <SubscriptionPreferencesContent />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionPreferencesContent = (): JSX.Element => {
  type FeedbackPopup = 'success' | 'fail' | 'none';

  const [formData, setFormData] = useState({
    email: ``,
    subscribe: false,
  });
  const [feedbackPopup, setFeedbackPopup] = useState<FeedbackPopup>(`none`);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(``);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    subscribe: boolean
  ): Promise<void> => {
    e.preventDefault();
    // To prevent user spamming request while a request is ongoing
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await submitRequest(email, subscribe);
      if (response.ok) {
        setFeedbackMessage(`You have successfully ${subscribe ? `subscribed` : `unsubscribed`}.`);
        setFeedbackPopup(`success`);
        setFormData({ ...formData, email: `` });
      } else if (response.status === 400) {
        setFeedbackMessage(`Invalid email. Please enter a valid email address.`);
        setFeedbackPopup(`fail`);
      } else {
        setFeedbackMessage(`Something went wrong, please try again later.`);
        setFeedbackPopup(`fail`);
      }
    } catch (error) {
      setFeedbackMessage(`Something went wrong, please try again later.`);
      setFeedbackPopup(`fail`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.content}>
      {feedbackPopup !== `none` && (
        <div className={`${feedbackPopup === `fail` ? styles.failMessage : styles.successMessage}`}>
          <p className={styles.feedbackMessage}>{feedbackMessage}</p>
          <button
            className={styles.closeButton}
            aria-label="Close message"
            type="button"
            onClick={() => setFeedbackPopup(`none`)}
          >
            &times;
          </button>
        </div>
      )}
      <Heading level={1} className={styles.heading}>
        SUBSCRIPTION PREFERENCES
      </Heading>
      <p className={styles.disclaimer}>
        BONUS SWEEPS OFFERS ARE ONLY AVAILABLE TO THOSE WHO ARE SUBSCRIBED TO OUR EMAIL OFFERS. BY
        UNSUBSCRIBING FROM GLOBAL POKER YOU WILL BE MISSING OUT ON ALL OF OUR OFFERS.
      </p>
      <p className={styles.bold}>
        <b>DO YOU WISH TO UNSUBSCRIBE FROM GLOBAL POKER?</b>
      </p>
      <form
        onSubmit={(e) => handleSubmit(e, formData.email, formData.subscribe)}
        className={styles.formContent}
      >
        <label className={styles.emailLabel}>
          EMAIL ADDRESS:
          <input
            className={styles.emailInput}
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            checked={!formData.subscribe}
            onChange={() => setFormData({ ...formData, subscribe: false })}
          />
          <p className={styles.checkboxLabelText}>Yes, please unsubscribe.</p>
        </label>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            checked={formData.subscribe}
            onChange={() => setFormData({ ...formData, subscribe: true })}
          />
          <p className={styles.checkboxLabelText}>No, keep me in the loop.</p>
        </label>
        <input className={styles.updateButton} type="submit" value="UPDATE" />
      </form>
    </div>
  );
};

async function submitRequest(email: string, subscribe: boolean): Promise<Response> {
  return await fetch(
    `${ClientConfig.MAR_PIPELINES_HOST}/notification/landing/subscription-preference`,
    {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        tenant: ClientConfig.TENANT_GP,
        email: email.trim(),
        active: subscribe,
      }),
    }
  );
}
