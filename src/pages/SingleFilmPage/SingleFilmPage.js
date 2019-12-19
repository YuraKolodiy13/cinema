import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getReviews, getSingleFilm} from "../../store/actions/films";
import './SingleFilmPage.scss'
import Loader from "../../components/Loader/Loader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const SingleFilmPage = props => {

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getSingleFilm(props.match.params.id);
    props.getReviews(props.match.params.id);
  }, []);

  if(props.loading){
    return <Loader/>
  }

  return(
    <div className='film' style={{backgroundColor: props.film.background_color}}>
      <div className="film__banner banner" style={{backgroundImage: `url(${props.film.background_image})`}}>
        <div className="banner__wrapper">
          <div className="container">
            <div className="banner__poster">
              <img src={props.film.poster_image} alt=""/>
              <i className="far fa-play-circle" onClick={handleOpen}/>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                className='video__wrapper'
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div>
                    <i className="far fa-times-circle" onClick={handleClose}/>
                    <video controls autoPlay className='film__video'>
                      <source src={props.film.video_link} type="video/webm"/>
                    </video>
                  </div>
                </Fade>
              </Modal>
            </div>
            <div className="banner__info">
              <p>{props.film.name}</p>
              <time>{props.film.released}</time>
            </div>
          </div>
        </div>
      </div>
      <div className="film__info container">
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Overview"/>
            <Tab label="Reviews" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <h4>SYNOPSIS</h4>
          <p>{props.film.description}</p>
          <p>Director: {props.film.director}</p>
          <p>Starring: {props.film.starring}</p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {props.reviews.map((item, key) =>
            <div key={key}>
              <div className="quote">
                <p>{item.comment}</p>
                <p className="review__author">{item.user.name}: <time className="review__date">{new Date(item.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</time></p>
              </div>
              <div className="rating">
                <p>{item.rating}</p>
              </div>
            </div>
          )}
        </TabPanel>
      </div>
    </div>
  )
};


const mapsStateToProps = state => {
  return{
    film: state.films.film,
    reviews: state.films.reviews,
    loading: state.films.loading
  }
};

const mapDispatchToProps = {
  getSingleFilm: getSingleFilm,
  getReviews: getReviews
};

export default connect(mapsStateToProps, mapDispatchToProps)(SingleFilmPage)