import { createTheme } from "@mui/material";
import {
  black,
  green,
  greyCoolBci,
  greyLight,
  greyRegular,
  greyText,
  newGray,
  redBci,
  tortoise,
  tortoiseLight,
  white,
} from "../base/colors";

const MainTheme = createTheme({
  components: {
    // Baseline
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: {
          fontSize: "0.875rem",
        },
      }),
    },

    // Popover
    MuiPopover: {
      styleOverrides: {
        root: {
          background: "rgba(0,0,0,.2)",
          "&#menu-": {
            backgroundColor: "transparent",
          },
        },
        paper: {
          borderRadius: "8px",
        },
      },
    },

    // Button
    MuiButton: {
      defaultProps: {
        color: "inherit",
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          outline: "none !important",
          minWidth: 32,
          textTransform: "none",
          fontWeight: 700,
        },
        outlined: {
          padding: "6.5px 16px",
        },
        contained: {
          padding: "7.5px 16px",
          border: "none",
          "&:hover": {
            border: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: "3px",
          fontSize: "1.125rem",
        },
      },
    },

    // Form
    MuiFormControl: {
      styleOverrides: {
        root: {
          maxWidth: "100%",
          rowGap: 5,
          "&.form-control-full": {
            width: "100%",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: white,
          "&.Mui-error fieldset": {
            borderColor: "red !important",
          },
        },
        input: {
          padding: `8.145px 10px`,
          fontSize: 14,
        },
        inputMultiline: {
          padding: 0,
        },
        notchedOutline: {
          borderColor: "#E9E9E9",
        },
        inputAdornedStart: {
          paddingLeft: 0,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: newGray,
          padding: 6.5,
          "&.nopadding": {
            padding: 0,
          },
        },
        indeterminate: {
          color: redBci,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: newGray,
        },
      },
    },

    // Pagination
    MuiPagination: {
      styleOverrides: {
        ul: {
          "& li:last-child button.Mui-disabled, & li:first-of-type button.Mui-disabled":
            {
              backgroundColor: white,
              borderColor: greyRegular,
              opacity: 1,
              "& path": {
                color: greyText,
              },
            },
          "& li:last-child button, & li:first-of-type button": {
            backgroundColor: redBci,
            "& path": {
              color: white,
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          background: white,
          "&$selected": {
            backgroundColor: white,
            borderColor: redBci,
          },
        },
      },
    },

    // Accordion
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "0 !important",
        },
      },
    },

    // Backdrop
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: 'rgba(0,0,0,.2)'
        },
      },
    },

    // Dialog
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: "none",
        },
        paperWidthSm: {
          maxWidth: 816,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "20px 22px",
          fontSize: 16,
          fontWeight: 700,
          color: redBci,
          borderBottom: "1px solid #E0E0E0",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "21px 31px",
          borderTop: "1px solid #E0E0E0",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.05)",
          border: "1px solid #E0E0E0",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px",
          "&:last-child": {
            paddingBottom: "auto",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: white,
          border: `1px solid #E0E0E0`,
          color: "black",
        },
        arrow: {
          backgroundColor: white,
          color: "#E0E0E0",
        },
      },
    },

    // Alert
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: "#FFF1E6",
        },
        standardInfo: {
          backgroundColor: "rgba(0, 57, 255, 0.05)",
          border: "1px solid rgba(0, 57, 255, 0.1)",
        },
      },
    },

    // Table
    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          backgroundColor: white,
        },
      },
    },

    // Divider
    MuiDivider: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
  },
  typography: {
    subtitle1: {
      fontSize: 18,
      lineHeight: "21.41px",
    },
    subtitle2: {
      fontSize: 16,
      lineHeight: "18.75px",
    },
    caption: {
      fontSize: 14,
      lineHeight: "21.41px",
    },
    body1: {
      fontSize: 12,
      lineHeight: "16.06px",
    },
    body2: {
      fontSize: 13,
      lineHeight: "18px",
    },
  },
  palette: {
    primary: {
      main: redBci, // red-bci
    },
    secondary: {
      main: greyCoolBci, // grey-cool-bci
      dark: black, // black-bci
      light: greyRegular, // grey-regular-bci
      contrastText: greyLight, // grey-light-bci
    },
    info: {
      main: black, // blue-bci
    },
    warning: {
      main: tortoise, //tortoise-bci,
      light: tortoiseLight, //tortoise-light-bci
    },
    success: {
      main: green, //tortoise-bci,
      light: green, //tortoise-light-bci
    },
    text: {
      primary: black, // black-bci
      secondary: black, // blue-bci
    },
    error: {
      main: redBci,
    },
  },
});

export default MainTheme;
