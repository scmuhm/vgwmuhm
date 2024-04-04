const NotFound = (): JSX.Element => (
  <div className="not-found-wrapper">
    <div className="not-found-container">
      <div className="not-found-content">
        <h2>OOPS!</h2>
        <h3>WE CAN&apos;T SEEM TO FIND THE PAGE YOU WERE LOOKING FOR.</h3>
        <h4>Error code: 404</h4>
        <a href="/" className="button">
          Return Home
        </a>
      </div>
    </div>
    <div className="not-found-banner">
      <img src="/banners/chips.jpg" alt="404" />
    </div>
  </div>
);

export default NotFound;
