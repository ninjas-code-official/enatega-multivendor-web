/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import ConfigurationContext from "../../src/context/Configuration";

const ConfigurableValues = () => {
  const configuration = useContext(ConfigurationContext);
  console.log("configuration", configuration);
  const SERVER_URL = "http://10.97.35.175:8001/";
  const WS_SERVER_URL = "ws://10.97.35.175:8001/";
  const GOOGLE_CLIENT_ID = configuration.webClientID;
  const STRIPE_PUBLIC_KEY = configuration.publishableKey;
  const PAYPAL_KEY = configuration.clientId;
  const GOOGLE_MAPS_KEY = configuration.googleApiKey;
  const AMPLITUDE_API_KEY = configuration.webAmplitudeApiKey;
  const LIBRARIES = "places,drawing,geometry,localContext,visualization".split(
    ","
  );
  const COLORS = {
    GOOGLE: configuration.googleColor,
  };
  const SENTRY_DSN = configuration.webSentryUrl;
  const PRIMERY_COLOR = configuration.primaryColor;
  const SECONDARY_COLOR = configuration.secondaryColor;
  const TERTIARY_COLOR = configuration.tertiaryColor;

  return {
    SERVER_URL,
    WS_SERVER_URL,
    GOOGLE_CLIENT_ID,
    COLORS,
    PAYPAL_KEY,
    STRIPE_PUBLIC_KEY,
    GOOGLE_MAPS_KEY,
    AMPLITUDE_API_KEY,
    LIBRARIES,
    SENTRY_DSN,
    PRIMERY_COLOR,
    SECONDARY_COLOR,
    TERTIARY_COLOR,
  };
};

export default ConfigurableValues;
