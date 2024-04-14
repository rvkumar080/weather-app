
import { useEffect, useState } from 'react';
import './App.css';
import Display from './Display';
import Input from './Input';
import axios from 'axios';
import { BiHistory } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"



function App() {

  const API_KEY = `8d6454a89dff871786a0307b0dbebbee`
  const [weather, setWeather] = useState([]);
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState([]);
  const [toggle, setToggle] = useState(false);
  
  const searchWeather = (city) => {
    setLoader(true);
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    axios.get(api)
    .then(
      (success) => {
        setWeather(success.data)
        let flag = false;
        for(var i=0; i< history.length; i++){
          if(history[i].city == city){
            flag = true;
            break
          }
        }
        if(flag == false){
          setHistory([
            ...history,
            {
              city,
              timestamp: new Date().getTime()
            }
          ])
        }
       
        // console.log(weather);
        // console.log(success.data)
        
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    ).finally(
      () => {
        setLoader(false);
      }
    )

  }

  useEffect(
    () => {
      if(history.length != 0){
        localStorage.setItem("history", JSON.stringify(history));
      }

    },
    [history]
  )
  useEffect(
    () => {
      const lsHistory = localStorage.getItem("history");
      if(lsHistory != undefined){
        setHistory(JSON.parse(lsHistory));
      }
    },
    []
  )
  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem("history");
  }
  const removeHistory = (index) => {
      if(history.length == 1){
      clearAll();
       
      }else{
        const newHistory = history.filter(
          (h, i) => {
            if(i == index) return false;
            else return true
          }
          )
          setHistory(newHistory);
      }
    }
  

  return (
    <div className='w-screen h-screen bg-[#F0F8FF] px-2'>
      <div className='w-screen py-2'>
        <h1 className='relative md:text-center text-3xl pl-1'>Weather 
        
        {
                    toggle
                    ? <AiOutlineClose onClick={() => setToggle(!toggle)} className='absolute right-1 top-2 text-2xl'/>
                    : <BiHistory onClick={() => setToggle(!toggle)} className={`absolute right-1 top-2 text-2xl md:hidden block`}/>
                }
        </h1>

      </div>
      <Input searchWeather={searchWeather} weather={weather} />
      <Display data={weather} history={history} searchWeather={searchWeather} loader={loader} clearAll={clearAll} removeHistory={removeHistory} toggle={toggle} />

    </div>
  );
}

export default App;
