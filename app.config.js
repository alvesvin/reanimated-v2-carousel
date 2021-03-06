export default {
  expo: {
    name: "Reanimated V2 Carousel",
    slug: "reanimated-v2-carousel",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      TMDB_AUTH_TOKEN: process.env.TMDB_AUTH_TOKEN,
      TMDB_API_URL: process.env.TMDB_API_URL,
      TMDB_IMAGES_URL: process.env.TMDB_IMAGES_URL
    }
  }
};
