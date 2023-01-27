import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = (props) => (
  <ContentLoader
    speed={2}
    width={160}
    height={160}
    viewBox="0 0 160 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-1" y="360" rx="5" ry="5" width="245" height="25" />
    <rect x="0" y="450" rx="10" ry="10" width="90" height="30" />
    <rect x="0" y="519" rx="5" ry="5" width="120" height="30" />
    <rect x="110" y="450" rx="10" ry="10" width="90" height="30" />
    <rect x="0" y="395" rx="5" ry="5" width="150" height="20" />
    <rect x="135" y="430" rx="5" ry="5" width="110" height="15" />
    <rect x="0" y="430" rx="5" ry="5" width="110" height="15" />
    <rect x="86" y="16" rx="0" ry="0" width="1" height="2" />
    <rect x="0" y="0" rx="10" ry="10" width="160" height="160" />
  </ContentLoader>
);

export default Sceleton;
