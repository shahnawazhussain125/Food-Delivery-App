import React from 'react';
import loading from '../assests/images/loading.gif'
import { makeStyles} from '@material-ui/core'

const useStyle = makeStyles({
    loading:{
        flexGrow: 1,
        position: "fixed",
        zIndex: 1,
        width: "100%",
        height: "100%", 
        overflow: "auto",
        paddingTop: "10%",
        textAlign: "center",
        backgroundColor:"rgba(0,0,0,0.4)",
    }
})
const Loading = (props) => {
    const classes = useStyle();
  return (
    <div className={classes.loading}>
        <img src={loading} />
    </div>
  );
}

export default Loading;