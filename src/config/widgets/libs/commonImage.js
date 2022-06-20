const defaultImg = require("@/assets/widgets/image.png");
const ImageConfig = {
  src: {
    label: "链接地址",
    props: {
      url: defaultImg,
    },
  },
  objectFit: {
    label: "平铺方式",
    props: {
      objectFit: "scale-down",
    },
  },
};

export { ImageConfig };
export default ImageConfig;
