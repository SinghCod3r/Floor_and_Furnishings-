import React from "react";

function Loader() {
  return (
    <>
      <main
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <ul className="o-vertical-spacing o-vertical-spacing--l">
          <li className="blog-post o-media">
            <div className="o-media__body">
              <div className="o-vertical-spacing">
                <p>
                  <span className="skeleton-box" style={{ width: "80%" }} />
                  <span className="skeleton-box" style={{ width: "90%" }} />
                  <span className="skeleton-box" style={{ width: "83%" }} />
                </p>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
}

export default Loader;
