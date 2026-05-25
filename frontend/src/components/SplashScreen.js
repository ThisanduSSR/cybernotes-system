import React from "react";

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-logo">CyberNotes</div>
      <div className="splash-subtitle">
        Secure, polished note keeping with animated visuals and modern UI.
      </div>
      <div className="splash-loader">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default SplashScreen;
