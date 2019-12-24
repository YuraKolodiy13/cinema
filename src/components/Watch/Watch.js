import React, {Fragment} from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './Watch.scss'
import {Link} from  'react-router-dom'

const Watch = props => {

  const [open, setOpen] = React.useState(false);
  const [wtw, setWtw] = React.useState(false);

  const handleOpen = (e) => {
    e.target.dataset.watch === 'trailer'
      ? setWtw(props.film.preview_video_link)
      : setWtw(props.film.video_link);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return(
    <Fragment>
      <ul className='watch__funcs'>
        <li onClick={handleOpen} data-watch="trailer">watch trailer</li>
        <li onClick={handleOpen} data-watch="film">watch film</li>
        <li><Link to={`/film/${props.film.id}`}>More info</Link></li>
      </ul>
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
              <source src={wtw}/>
            </video>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  )
}

export default Watch