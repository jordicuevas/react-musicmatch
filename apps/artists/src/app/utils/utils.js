import {toast}   from 'react-hot-toast';
import { favMessages } from '../messages';

/**
 * getFlag : funcion para obtener la bandera del pais seleccionado
 *
 * @param countries: {array} de objetos con la informacion de cada pais
 *
 * @returns  {emoji} del pais
 *
 */

export function getFlag(countries, countryCode) {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].code === countryCode) {
      return countries[i].emoji;
    }
  }
}

/**
 * isEmpty : funcion para chequear si el campo esta vacio
 *
 * @param {str}: el string a validar
 *
 * @returns  {boolean} con el resultado de la operacion
 *
 */
export function isEmpty(str) {
  return !str || 0 === str.length;
}

/**
 * isBlank : funcion para chequear si el campo esta en blanco
 *
 * @param {str}: el string a validar
 *
 * @returns  {boolean} con el resultado de la operacion
 *
 */
export function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

/**
 * _isArtistFavorite : funcion para chequear si el artista es favorito
 *
 * @param {json}: array de objetos con los favoritos
 *
 * @param {value}: id de artista a verificar
 *
 * @returns  {boolean} con el resultado de la operacion
 *
 */
export function _isArtistFavorite(json, value) {
  let contains = false;
  Object.keys(json).some((key) => {
    contains =
      typeof json[key] === 'object'
        ? _isArtistFavorite(json[key], value)
        : json[key] === value;
    return contains;
  });
  return contains;
}

/**
 * setFavorite : funcion para agregar o remover un usuario de los favoritos
 *
 * @param {artist}: objeto con la informacion del artista seleccionado
 *
 * @param {id}: id de artista a verificar
 *
 * @returns  guarda o remueve un artista de los favoritos
 *
 */
export function setFavorite(artist, id) {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favs.length > 0) {
    for (let i = 0; i < favs.length; i++) {
      let isFav = _isArtistFavorite(favs, id);
      if (isFav) {
        let newFavs = favs.filter((artista) => artista.artist.artist_id !== id);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
        toast.error(favMessages.remove);
        return false;
      } else {
        favs.push(artist);
        localStorage.setItem('favorites', JSON.stringify(favs));
        toast.success(favMessages.add);

        return false;
      }
    }
  } else {
    favs.push(artist);
    localStorage.setItem('favorites', JSON.stringify(favs));
    toast.success(favMessages.add);
  }
}

/**
 * checkFavorite : funcion para verificar si un usuario es de los favoritos
 *
 * @param {artist}: objeto con la informacion del artista seleccionado
 *
 * @param {id}: id de artista a verificar
 *
 * @returns  {boolean} con el resultado de la operacion
 *
 */
export function checkFavorite(artist, id) {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favs.length > 0) {
    for (let i = 0; i < favs.length; i++) {
      let isFav = _isArtistFavorite(favs, id);
      if (isFav) {
        return true;
      } else {
        return false;
      }
    }
  }
}
