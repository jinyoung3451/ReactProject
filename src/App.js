import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Googlemap from './Googlemap'
import './App.css';

function App() {


  const [location, setLocation] = useState('');//도시입력 변수
  const [result, setResult] = useState({});// 도시 출력 변수
  const API_KEY = "fd37794955cbb8179558c67225cdc9df"; //API Key

  //api 접속 URL 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {//정상적인 도시를 입력하였을때 get 메소드 발행 
        const data = await axios({
          method: 'get',
          url: url,
        })
        setResult(data);//데이터 setResult에 저장
        console.log(data);//데이터 콘솔로그에 출력

      }
      catch (err) {
        //비정상적인 도시 입력시 발생 alert
        alert("해당 도시가 없습니다.");
      }
    }
  }



  return (
    <TextInput>
      <div className="WeatherInput">
        <h2>세계 날씨 확인 </h2>
        <input
          placeholder="도시를 영어로 입력하세요 "
          value={location}
          onChange={(e) => setLocation(e.target.value)} //입력한 값 저장
          type="text"
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultText>
            <div className="city">도시 : {result.data.name}</div> {/* result에 저장된 api data 중 name data 불러오기 */}
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C {/* 도시 온도 계산식 */}
            </div>
            <div className="sky">날씨 : {result.data.weather[0].main}</div> {/* result에 저장된 api data 중 weather data 불러오기 */}
            <hr></hr>

            <Googlemap initlat={result.data.coord.lat} initlon={result.data.coord.lon} />{/* result에 저장된 api data 중 위도 경도 google map.js으로 전달 */}
          </ResultText>

        )}



      </div>
    </TextInput>
  );
}

export default App;

//도시 입력 style
// WeatherInput : 전체적인 폼 style 
// h2 : 제목 style
// input : 입력창 style
const TextInput = styled.div`
  width: 100;
  height: 100;
  .WeatherInput {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
    background-color : ;
  }
  
  h2{
    text-align: center;
  }
  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

//도시 날씨정보 출력 style
// city : 도시 텍스트 style
// temperature : 온도 텍스트 style
// sky : 날씨 텍스트 style
const ResultText = styled.div`
  margin-top: 60px;
  border: 1px black solid;
  padding: 10px;
  border-radius: 8px;
  .city {
    font-size: 24px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
    text-align: center;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
 
`;