import {makeStyles,} from "@mui/styles";

export const PostStyles = makeStyles((theme) => ({
    app: {
      paddingTop: "50px",
      maxWidth: "1170px",
      margin: "0 auto",
    },
    root: {
      flexGrow: 1,
      paddingBottom: '50px'
    },
    textField: {
      width: "100%",
      fontSize: "25px",
    },
    btn: {
      width: "100%",
      marginTop: "15px",
      backgroundColor: "#3dc000",
      "&:hover": {
        backgroundColor: "#3dc000",
      },
    },
    media: {
      height: 140,
    },
    starIcon: {
      color: '#f0c60b'
    },
    watchersIcon: {
      color: '#58a6ff',
    },
    count: {
      marginLeft: '25px',
      fontWeight: '700'
    },
    description: {
      height: '50px',
      overflow: 'hidden !important',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    input: {
      width: '100%'
    },
    textarea: {
      resize: 'none',
      width: '100%',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #000',
      '&:disabled': {
        borderBottomStyle: 'dotted',
        opacity: '0.5'
      }
    },
    iconWrapper: {
      textAlign: 'center',
      '& > svg': {
        width: '30px',
        cursor: 'pointer'
      }
    },
    accordion: {
      marginTop: '25px !important',
      width: '100% '
    }
  }));