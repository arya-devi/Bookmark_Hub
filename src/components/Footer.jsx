import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <h5 className="text-uppercase">MyWebsite</h5>
            <p>
              Your go-to platform for managing bookmarks efficiently.
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">Home</a>
              </li>
              <li>
                <a href="#" className="text-dark">About</a>
              </li>
              <li>
                <a href="#" className="text-dark">Contact</a>
              </li>
              <li>
                <a href="#" className="text-dark">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-light">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
