import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const width = Dimensions.get('window').width

const ScannerOverlay = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={0.8 * width}
    height={0.8 * width}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M336,448h56a56,56,0,0,0,56-56V336"
      style={{
        fill: "none",
        stroke: "#FFF",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 12,
      }}
    />
    <Path
      d="M448,176V120a56,56,0,0,0-56-56H336"
      style={{
        fill: "none",
        stroke: "#FFF",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 12,
      }}
    />
    <Path
      d="M176,448H120a56,56,0,0,1-56-56V336"
      style={{
        fill: "none",
        stroke: "#FFF",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 12,
      }}
    />
    <Path
      d="M64,176V120a56,56,0,0,1,56-56h56"
      style={{
        fill: "none",
        stroke: "#FFF",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 12,
      }}
    />
  </Svg>
);
export default ScannerOverlay;
