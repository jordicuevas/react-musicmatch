import React, { Component } from 'react';
import styles from './app.module.scss';
import 'semantic-ui-css/semantic.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { top12artists, searchMessages, favMessages } from './messages';
import Contacts from './artists-list/artists-list';
import Loader from './loader/loader';
import { environment } from '../environments/environment';
import ArtistSearch from './artists-list/artist-search';
import { isEmpty, isBlank } from './utils/utils';
import Favs from './artists-list/list-favs';
 
class App extends Component {
  state = {
    artists: [],
    module_name: 'Top 12 by Musicxmatch',
    isLoading: true,
    isError: false,
    modalOpen: false,
    isSearch: false,
    artistName: '',
    checkFavs : false,
    favList : []
  };

  constructor(props) {
    super(props);
    this.searchArtist = this.searchArtist.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
 
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

     //localStorage.setItem("favorites", JSON.stringify([]))
  }
  forceUpdateHandler(){
    this.forceUpdate();
  };
  resetSearch() {
    this.setState({ checkFavs: false, isSearch: false, module_name: 'Top 12 by Musicxmatch'  }, () => {
      this.setState({ checkFavs: false, isSearch: false, module_name: 'Top 12 by Musicxmatch' });
       this.forceUpdateHandler()

    });
  }
  
  getFavorites() {
    const favs = JSON.parse ( localStorage.getItem("favorites") )
    if ( favs.length > 0) {
      this.setState({ module_name: 'Mis Favoritos',checkFavs: true,   favList:favs,  isSearch: false }, () => {     
         this.forceUpdateHandler()
      });
    } else {
      toast.error(favMessages.empty)
    }

  }
  resetState() {
    this.setState({ isSearch: true }, () => {
      this.setState({ isLoading: false, isSearch: false });
      console.log(this.state);
    });
  }
  searchArtist() {
     const ArtistSearchName = (document.getElementById(
      'search-box'
    ) as HTMLInputElement).value;
    this.setState({
      isSearch: true,
      isLoading: false,
      artistName: ArtistSearchName,
      module_name: ArtistSearchName,
    });
    console.log(this.state);
    this.setState({ isSearch: false }, () => {
      if (isBlank(ArtistSearchName) || isEmpty(ArtistSearchName)) {
        toast.error(searchMessages.emptyBox);
        return false;
      }
      this.setState({ isSearch: true, checkFavs: false });
    });
  }

  componentDidMount() {
    const top12URL = `chart.artists.get?page=1&page_size=12&apikey=${environment.apikey}`;
    this.setState({ isLoading: true, isSearch: false });

    fetch(environment.apiUrl + top12URL, {
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(top12artists.success);
          this.setState({ isLoading: false, isError: false });
          return res.json();
        } else {
          this.setState({ isLoading: false, isError: true });
          if (res.status === 403) {
            toast.error(top12artists.err403);
          }
          if (res.status === 500) {
            toast.error(top12artists.err500);
          }
          return false;
        }
      })
      .then((data) => {
        this.setState({ artists: data.message.body.artist_list });
      })
      .catch((error) => {
        this.setState({ isLoading: false, isError: true });
        toast.error(top12artists.err);
      });
  }

  render() {
    const loading = this.state.isLoading;
    const search = this.state.isSearch;
    const listFavs = this.state.checkFavs;

    return (
      <div>
        <div className="ui centered two column grid artist-search__container">
          <div className="centered two column row">
            <div className=" ten wide column">
              <form className="  form">
                <div className="field">
                  <div className="ui fluid left icon input artist-search__width">
                    <i aria-hidden="true" className="search icon"></i>
                    <input
                      id="search-box"
                      type="text"
                      className="artist-search__input"
                      placeholder="Ingrese el nombre del artista"
                    />
                  </div>
                </div>
              </form>
              <div className="two wide column button-mobile mostrar">
              {!search ? (
                <button
                  type="button"
                  onClick={this.searchArtist}
                  className="ui button artist-search__button"
                >
                  Buscar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={this.resetSearch}
                  className="ui button artist-search__button"
                >
                  Ver top 12 artistas
                </button>
              )}
            </div>
              {!listFavs ? (
                <div className="fav-link" onClick={this.getFavorites}>Ver favoritos</div>

              ) : (
                <div className="fav-link" onClick={this.resetSearch}>Ocultar favoritos</div>

              )}
            </div>
            

            <div className="two wide column  computer only">
              {!search ? (
                <button
                  type="button"
                  onClick={this.searchArtist}
                  className="ui button artist-search__button"
                >
                  Buscar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={this.resetSearch}
                  className="ui button artist-search__button"
                >
                  Ver top 12 artistas
                </button>
              )}
            </div>
             
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : !search && !listFavs ? (
          <Contacts artists={this.state}   />
        ) : search && !listFavs? (
          <ArtistSearch artists={this.state.artistName} />
        ) : !search && listFavs ? (
          
             <Favs artists={this.state }   />
        ) :(
          ''
        )
        }

        <Toaster />
      </div>
    );
  }
}

export default App;
