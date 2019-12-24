import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getFilms, getReviews, getSingleFilm} from "../../store/actions/films";
import './SingleFilmPage.scss'
import Loader from "../../components/Loader/Loader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Watch from "../../components/Watch/Watch";
import FilmItem from "../../components/FilmItem/FilmItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  const [value, setValue] = useState(0);
  const [categoryActive, changeCategoryActive] = useState(props.match.params.id);

  if(categoryActive !== props.match.params.id){
    props.getSingleFilm(props.match.params.id);
    changeCategoryActive(props.match.params.id);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.getSingleFilm(categoryActive);
    props.getReviews(props.match.params.id);
    props.getFilms();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    },
  };

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
              <div className="topCap">{props.film.genre}</div>
              <h2 className="capTitle">{props.film.name} - <span className="year">{props.film.released}</span></h2>
              <div className="movieDetail">
                <div className="duration">{props.film.run_time}min.</div>
                <div className="imdbCont">
                  <span className="text">IMDB Rating </span>
                  <span className="imdbVal">{props.film.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="banner__info">
              <Watch film={props.film}/>
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
          <div className='info-wrap'>
            <h4>SYNOPSIS</h4>
            <p>{props.film.description}</p>
          </div>
          <div className='info-wrap'>
            <h4>CAST</h4>
            <p>Starring: {props.film.starring}</p>
          </div>
          <div className='info-wrap'>
            <h4>CREW</h4>
            <p>Director: {props.film.director}</p>
          </div>
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
      <div className="film__suggestionWrap container">
        <div className="film__suggestion">
          <Carousel responsive={responsive} swipeable={false}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType='desktop'
          >
            {props.films.map((item, key) => item.genre === props.film.genre && item.id !== props.film.id
              ? <FilmItem item={item} key={key}/>
              : null
            )}
          </Carousel>
        </div>
      </div>
    </div>
  )
};


const mapsStateToProps = state => {
  return{
    film: state.films.film,
    films: state.films.films,
    reviews: state.films.reviews,
    loading: state.films.loading
  }
};

const mapDispatchToProps = {
  getSingleFilm: getSingleFilm,
  getReviews: getReviews,
  getFilms: getFilms
};

export default connect(mapsStateToProps, mapDispatchToProps)(SingleFilmPage)