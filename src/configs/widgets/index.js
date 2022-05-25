import baseConfig from "./base";
import { TextConfig } from "./text";
import { ImageConfig } from "./image";
import scrollTextConfig from "./scrollText";

const commonText = { ...baseConfig, ...TextConfig };
const scrollText = { ...baseConfig, ...scrollTextConfig };
const commonImage = { ...baseConfig, ...ImageConfig };

export default { commonText, commonImage, scrollText };
