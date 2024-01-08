import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const CustomTheme = (
  PRIMERY_COLOR = "#000fff",
  SECONDARY_COLOR,
  TERTIARY_COLOR
) => {
  const theme = createTheme({
    breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1400 },
    },
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: blue.A200,
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          // backgroundColor: blue.A200,
          // color: "white",
        },
      },
      MuiPickersDay: {
        day: {
          color: blue.A700,
        },
        daySelected: {
          backgroundColor: blue["400"],
        },
        dayDisabled: {
          color: blue["100"],
        },
        current: {
          color: blue["900"],
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: blue["400"],
        },
      },
    },
    typography: {
      fontFamily: ["Poppins", "Open Sans", "sans-serif"].join(),
      htmlFontSize: 16,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      fontWeightBolder: 800,
      h1: {
        fontWeight: 300,
        fontSize: "6rem",
        lineHeight: 1.167,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontWeight: 300,
        fontSize: "3.75rem",
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontWeight: 400,
        fontSize: "3rem",
        lineHeight: 1.167,
        letterSpacing: "0em",
      },
      h4: {
        fontWeight: 400,
        fontSize: "2.125rem",
        lineHeight: 1.235,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontWeight: 400,
        fontSize: "1.5rem",
        lineHeight: 1.334,
        letterSpacing: "0em",
      },
      h6: {
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      button: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
      caption: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
      shape: {
        borderRadius: 4,
      },
      zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
      },
    },
    palette: {
      mode: "light",
      common: {
        black: "#000",
        blackShade: "#0000008c",
        lightBlack: "#00000040",
        darkBlack: "#0000005e",
        white: "#fff",
        whiteShade: "#E5EDEF",
      },
      primary: {
        main: PRIMERY_COLOR,
        light: "#fff",
        lightest: "#cfcfcf",
        dark: "#F4F4F4",
        darkest: "#C4C4C4",
        contrastText: "#fff",
      },
      secondary: {
        main: "#FAFAFA",
        light: "#333333",
        lightest: SECONDARY_COLOR,
        dark: "#949393",
        darkest: "#959191",
        contrastText: "#fff",
      },
      success: {
        main: TERTIARY_COLOR,
        light: PRIMERY_COLOR,
        lightest: "#f1f1f1",
        dark: "#F0F0F0",
        darkest: "#E6EBEE",
        contrastText: "#fff",
      },
      info: {
        main: "rgba(39,111,191,0.8)",
        light: "#E1E5E8",
        lightest: "#CED8DA",
        dark: "#CDD7D8",
        darkest: " #FCFCFD",
        contrastText: "#fff",
      },
      error: {
        main: "#fe0000",
        light: "#F1F3F3",
        lightest: "#EBEBEB",
        dark: "#131313",
        darkest: "#C2C2C2",
        contrastText: "#fff",
      },
      warning: {
        main: "#FA7751",
        light: "#FCC54C",
        lightest: "#F7F7F7",
        dark: "#DCDCDC",
        darkest: "#888",
        contrastText: "#fff",
      },
      button: {
        main: SECONDARY_COLOR,
        light: "#0070ba",
        lightest: PRIMERY_COLOR,
        dark: "#EFF4F7",
        darkest: "#FBE7EF",
        contrastText: "#fff",
      },
      shades: {
        main: "#EDF1F2",
        light: "#f0f0fd",
        lightest: "#DFEAF6",
        dark: "#BED3EB",
        darkest: "#93B7DF",
        contrastText: "#5D93CF",
      },
      shadows: {
        main: "#FDE5EF",
        light: "#1D3655",
        lightest: "#1E3656",
        dark: "#9D9D9D",
        darkest: "#276FBF",
        contrastText: "#178",
      },
      borders: {
        main: "#FF5F00",
        light: "#F79E1B",
        lightest: "#222D65",
        dark: "#EB001B",
        darkest: "#253B80",
        contrastText: "#179BD7",
      },
      grey: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
        A100: "#d5d5d5",
        A200: "#aaaaaa",
        A400: "#303030",
        A700: "#616161",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      text: {
        primary: "#fff",
        secondary: "#212121",
        success: "#D5146D",
        disabled: "#5A5858",
        hint: "#FFF",
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: {
        primary: "#153759",
        secondary: "#5C92CE",
        success: "#90B4DC",
        paper: "#FAFAFA",
        default: "#fff",
      },
    },
  });

  return theme;
};

export default CustomTheme;
