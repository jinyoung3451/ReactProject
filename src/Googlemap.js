import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";


// google 지도 styled
const containerStyle = {
  height: "300px", width: "200px"
}


function Googlemap(props) {
  console.log(props)
  const center = {
    //api로 받은 경도와 위도를 실수형태로 변환
    lat: parseFloat(props.initlat),
    lng: parseFloat(props.initlon)
  }
  //google map api 설정코드
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',// jsApi 사용 id
    googleMapsApiKey: "AIzaSyC9KjeBTxfq8RLwrnZbW61Wo7t_r4t_16M" //api key
  })





  return isLoaded ? (


    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >


      </GoogleMap>
    </div>

  ) : <></>
}


export default Googlemap;