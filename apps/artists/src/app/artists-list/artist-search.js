import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { searchMessages } from '../messages';
import Loader from '../loader/loader';
import { environment } from '../../environments/environment';
import Contacts from '../artists-list/artists-list';
import { Message } from 'semantic-ui-react';
class ArtistSearch extends Component {
  state = {
    artists: [],
    module_name: 'Resultados de la búsqueda',
    isLoading: true,
    isError: false,
    modalOpen: false,
  };

  componentDidMount() {
    console.log('se monta');

    const searchArtist = this.props.artists;
    const artistSearchURL =
      'artist.search?q_artist=' +
      searchArtist +
      '&page_size=12&apikey=' +
      environment.apikey;
    fetch(environment.apiUrl + artistSearchURL, {
      method: 'GET',
    })
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ isLoading: false, isError: true });
          if (res.status === 403) {
            toast.error(searchMessages.err403);
          }
          if (res.status === 500) {
            toast.error(searchMessages.err500);
          }
          return false;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.message.body.artist_list.length) {
          toast.success(searchMessages.success);
          this.setState({ isLoading: false, isError: true });
          this.setState({ artists: data.message.body.artist_list });
        } else {
          toast.error(searchMessages.empty);
          this.setState({ isLoading: false, isError: true });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false, isError: true });
        toast.error(searchMessages.err);
      });
  }

  render() {
    const loading = this.state.isLoading;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : this.state.artists.length ? (
          <Contacts artists={this.state} />
        ) : (
          <div className="ui container not-found">
            <Message info>
              <Message.Header>{searchMessages.empty}</Message.Header>
            </Message>
          </div>
        )}

        <Toaster />
      </div>
    );
  }
}

export default ArtistSearch;
