import React, { Component, useEffect, useState } from 'react';
import {
  Accordion,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Menu,
  Message,
  Modal,
  Segment,
} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Grid, Image } from 'semantic-ui-react';
import Loader from '../loader/loader';
import AccordionExampleFluid from './artist-tracks';
import './artists-list.module.scss';
import { countries } from './countries';
import Bouncer from 'react-data-bouncer';
import { getFlag ,setFavorite, checkFavorite  } from '../utils/utils';
/* eslint-disable-next-line */

/**
 * Contacts : se carga la lista de top 12 artistas
 *
 * @param artists: listado del top 12 de artistas
 *
 * @returns {array} con la lista de artistas correspondientes al top 12
 *
 */

const Contacts = ({ artists }) => {
  const [count, setCount] = useState(0);
  const actualizarFavoritos = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      <div className="ui container artist-list__names">
        <div className="module_name">{artists.module_name}</div>
        <div className="ui four column stackable grid artist__card">
          {artists.artists.map((contact, index) => (
            <div key={index} className="column">
              <div className="ui stackable cards">
                <div className="ui card artists__card_css">
                  <div className="content">
                    {contact.artist.artist_twitter_url !== '' ? (
                      <a href={contact.artist.artist_twitter_url}>
                        <img
                          className="ui mini right floated image"
                          src="assets/twitter.png"
                          alt=""
                        />
                      </a>
                    ) : (
                      ' '
                    )}

                    <div className="header">
                      {contact.artist.artist_name}{' '}
                      {getFlag(countries, contact.artist.artist_country)}
                    </div>

                    <div className="description">
                      {contact.artist.begin_date !== '0000-00-00'
                        ? ' El artista comenzó el  ' + contact.artist.begin_date
                        : 'La fecha de comienzo no esta disponible'}
                    </div>
                  </div>
                  <div className="extra content">
                    <div className="ui two buttons">
                      <button
                        className="ui green basic button"
                        onClick={() => {
                          setFavorite(contact,contact.artist.artist_id );
                          actualizarFavoritos();
                        }}
                      >
                        {checkFavorite(contact,contact.artist.artist_id ) ? (
                          <i
                            style={{ textAlign: 'left' }}
                            className="star   icon"
                          ></i>
                        ) : (
                          <i
                            style={{ textAlign: 'left' }}
                            className="star outline icon"
                          ></i>
                        )}
                      </button>
                      <ArtistaModal artista={contact} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 

 
/**
 * ArtistsDetailCard : boton para llamar al modal con la info del artista
 *
 */
const ArtistsDetailCard = ({ ...rest }) => (
  <button type="button" className="ui red basic button" {...rest}>
    <i style={{ textAlign: 'right' }} className="plus circle icon"></i>
  </button>
);
/**
 * ArtistsDetailCard : boton para llamar al modal con la info del artista
 *
 */
const ArtistsDetaiFav = ({ ...rest }) => (
  <button type="button" className="ui red basic button" {...rest}>
    <i style={{ textAlign: 'right' }} className="plus circle icon"></i>
  </button>
);
/**
 * ArtistaModal : modal con la info detalla de cada artista
 *
 */
const ArtistaModal = ({ artista }) => {
  const [show, setShow] = useState(false);
  const openArtistModal = () => setShow(true);
  const [count, setCount] = useState(0);
  const actualizarFavoritos = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <Modal
      trigger={
        <ArtistsDetailCard onClick={openArtistModal}></ArtistsDetailCard>
      }
      closeIcon
    >
      <Header icon="user" content="Tarjeta del artista" />
      <Modal.Content>
        <h4>Listado de albums del artista {artista.artist.artist_name}</h4>
        <button
                        className="ui green basic button"
                        onClick={() => {
                          setFavorite(artista,artista.artist.artist_id );
                          actualizarFavoritos();
                        }}
                      >
                        {checkFavorite(artista,artista.artist.artist_id ) ? (
                          <i
                            style={{ textAlign: 'left' }}
                            className="star   icon"
                          ></i>
                        ) : (
                          <i
                            style={{ textAlign: 'left' }}
                            className="star outline icon"
                          ></i>
                        )}
                      </button>
        <Bouncer>
          <AccordionExampleFluid artista={artista.artist.artist_id} />
        </Bouncer>
      </Modal.Content>
    </Modal>
  );
};

export default Contacts;
