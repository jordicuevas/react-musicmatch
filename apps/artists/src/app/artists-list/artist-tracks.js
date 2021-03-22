import React, { Component } from 'react';
import { Accordion, Icon, Message } from 'semantic-ui-react';
import { environment } from '../../environments/environment';
import toast from 'react-hot-toast';
import { artistsAlbums, tracksMessages } from '../messages';
import Loader from '../loader/loader';
import ArtistTrackList from './artist-track-list';

export default class AccordionExampleFluid extends Component {
  state = {
    activeIndex: '',
    albums: [],
    isLoading: true,
    isError: false,
    albumTracks: [],
  };
  constructor(props) {
    super(props);
    this.props = props;
  }

   /**
    * getTrachList : funcion para obtener la informacion del titulo del album
    * 
    * @param TitleProps: informacion del intem del albul seleccionado
    * 
    * @returns setea estado y llama a funcion para obtener el listado de canciones de acuerdo al id del album
    * 
    */
  getTrackList = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    this.getTrackInfo(titleProps.albumid);
  };

  /**
    * getTrackInfo : funcion para obtener la lista de canciones de acuerdo a un albun especifico
    * 
    * @param album_id: id del albul seleccionado
    * 
    * @returns {array} de canciones de acuerdo al album seleccionado
    * 
    */
  getTrackInfo = (album_id) => {
    this.setState({ isLoading: true });
    fetch(
      environment.apiUrl +
        'album.tracks.get?album_id=' +
        album_id +
        '&page=1&apikey=' +
        environment.apikey,
      {
        method: 'GET',
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ isLoading: false, isError: true });
          if (res.status === 403) {
            toast.error(tracksMessages.err403);
          }
          if (res.status === 500) {
            toast.error(tracksMessages.err500);
          }
          return false;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.message.body.track_list.length) {
          toast.success(tracksMessages.success);
          this.setState({ isLoading: false, isError: true });
          this.setState({ albumTracks: data.message.body.track_list });
        } else {
          toast.error(tracksMessages.empty);
          this.setState({ isLoading: false, isError: true });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false, isError: true });
        toast.error(tracksMessages.err);
      });
  };

  /**
    * componentDidMount : al montar la vista se carga la lista de albums de acuerdo a un id de artista
    * 
    * @param artist_id: se recibe por props
    * 
    * @returns {array} de albums de acuerdo al artista seleccionado
    * 
    */
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      environment.apiUrl +
        'artist.albums.get?artist_id=' +
        this.props.artista +
        '&s_release_date=desc&g_album_name=1&apikey=' +
        environment.apikey,
      {
        method: 'GET',
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ isLoading: false, isError: true });
          if (res.status === 403) {
            toast.error(artistsAlbums.err403);
          }
          if (res.status === 500) {
            toast.error(artistsAlbums.err500);
          }
          return false;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.message.body.album_list.length) {
          toast.success(artistsAlbums.success);
          this.setState({ isLoading: false, isError: true });
          this.setState({ albums: data.message.body.album_list });
        } else {
          toast.error(artistsAlbums.empty);
          this.setState({ isLoading: false, isError: true });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false, isError: true });
        toast.error(artistsAlbums.err);
      });
  }

  /**     
    * render : se renderiza el componente album y sus respectivas canciones
    * 
    */
  render() {
    const loading = this.state.isLoading;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : this.state.albums.length > 0 ? (
            
          <Accordion fluid styled>
            {this.state.albums.map((a, indexs) => (
              <div key={indexs}>
                <Accordion.Title
                  albumid={a.album.album_id}
                  active={this.state.activeIndex === indexs}
                  index={indexs}
                  onClick={this.getTrackList}
                >
                  <Icon name="dropdown" />
                  {a.album.album_name}
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === indexs}>
                  <ArtistTrackList tracks={this.state.albumTracks} />
                </Accordion.Content>
              </div>
            ))}
          </Accordion>
        ) : (
          <Message info>
            <Message.Header>{artistsAlbums.empty}</Message.Header>
          </Message>
        )}
      </div>
    );
  }
}
