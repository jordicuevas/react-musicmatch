import React   from 'react'
import {   Message } from 'semantic-ui-react'
import {  tracksMessages} from '../messages'

 
/**
    * ArtistTrackList : retorna el listado de canciones de un album de un artista
    * 
    * @param tracks: el array de canciones a mostrar en la UI
    * 
    * @returns lista UL de canciones del artista
    * 
    */  
const ArtistTrackList = ({ tracks }) => {  
  return (
        <div>   
             { (tracks.length> 0 ) ? 
                 
                 <div>
                   Canciones que se encuentran en el album:
                     <ul className="track-list" >
                     {tracks.map((trackList, indexTrack) => (
                      
                             <li key={indexTrack} > <i className="music icon"></i> {trackList.track.track_name}</li>   
                                                                                  
                    ))}
                     </ul>
                 </div>
                 
                 : <Message info>
          <Message.Header>{tracksMessages.empty}</Message.Header>
         </Message> }
        </div>
  )
    
    
  
}
 
 

export default ArtistTrackList