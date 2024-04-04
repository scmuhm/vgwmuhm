const Geolocation = (): JSX.Element => {
  return (
    <div className="location-unavailable--container">
      <img
        src="/gpa/white-logo.svg"
        alt="Global Poker Logo"
        className="location-unavailable--logo"
      />

      <div className="location-unavailable--text-area">
        <div className="location-unavailable--unavailable-text">UNAVAILABLE IN YOUR LOCATION</div>

        <div className="location-unavailable--info-text">
          Global Poker Academy is currently only available in the United States (except WA state)
          and Canada (except Quebec). Please contact support for any additional questions.
        </div>

        <div className="location-unavailable--email-link">support@globalpoker.com.</div>
      </div>
    </div>
  );
};

export default Geolocation;
