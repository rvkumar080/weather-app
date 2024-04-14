import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";


const Display = ({ data, history, searchWeather, loader, clearAll, removeHistory, toggle }) => {
    
    
    function timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (let interval in intervals) {
            const value = Math.floor(seconds / intervals[interval]);
            if (value >= 1) {
                return value + " " + interval + (value === 1 ? "" : "s") + " ago";
            }
        }

        return "Just now";
    }
    return (
        <div className='max-w-[600px] mx-auto md:flex justify-center gap-3'>
            <div className='hidden md:flex flex-col w-[50%] p-4 border rounded bg-white min-h-[300px] shadow-xl'>
                <div className='font-bold text-xl text-center'>History
                    <button onClick={clearAll} className='border px-1 py-0 rounded block mx-auto text-[12px] font-normal cursor-pointer'>Clear history</button></div>
                <hr className='my-2' />
                <ul>
                    {
                        history.map(
                            (h, i) => {
                                return (
                                    <li key={i} onClick={() => searchWeather(h.city)} className='relative cursor-pointer my-2'>{h.city} <span className='text-slate-500'><small>{timeAgo(h.timestamp)}</small></span>
                                        <IoMdClose onClick={
                                            (event) => {
                                                event.stopPropagation();
                                                removeHistory(i);
                                            }
                                        } className='absolute right-0 top-2' />

                                    </li>
                                )
                            }
                        )
                    }

                </ul>
            </div>
            {/* responsive history start */}
            <div className={`duration-300 w-[80%] p-4 border rounded bg-white min-h-[325px] shadow-xl absolute ${toggle ? 'left-[0]' : 'left-[-100%]'}`}>
                <div className='font-bold text-xl text-center'>History
                    <button onClick={clearAll} className='border px-1 py-0 rounded block mx-auto text-[12px] font-normal cursor-pointer'>Clear history</button></div>
                <hr className='my-2' />
                <ul>
                    {
                        history.map(
                            (h, i) => {
                                return (
                                    <li key={i} onClick={() => searchWeather(h.city)} className='relative cursor-pointer my-2'>{h.city} <span className='text-slate-500'><small>{timeAgo(h.timestamp)}</small></span>
                                        <IoMdClose onClick={
                                            (event) => {
                                                event.stopPropagation();
                                                removeHistory(i);
                                            }
                                        } className='absolute right-0 top-2' />

                                    </li>
                                )
                            }
                        )
                    }

                </ul>
            </div>
            {/* responsive history end */}
            <div className='md:w-[50%] px-1'>
                <div className="flex flex-col bg-white rounded p-4 w-full mx-auto max-w-xs min-h-[300px] shadow-xl">
                    {
                        loader == true
                            ?

                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                <span class="sr-only">Loading...</span>
                            </div>


                            :
                            data.length == 0
                                ?
                                <h1 className='text-center text-xl'>Please Enter City Name</h1>
                                :
                                <div>
                                    <div className="font-semibold text-4xl text-center">{data.name}</div>

                                    <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-[100%]">
                                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" className='mx-auto h-24 w-24' />
                                    </div>
                                    <div className="flex flex-row items-center justify-center mt-6">
                                        <div className="font-medium text-4xl">{data.main.temp}°C</div>
                                        <div className="flex flex-col items-center ml-6">
                                            <div>{data.weather[0].main}</div>

                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mt-6">
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Wind</div>
                                            <div className="text-sm text-gray-500">{data.wind.speed}k/h</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Humidity</div>
                                            <div className="text-sm text-gray-500">{data.main.humidity}%</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Visibility</div>
                                            <div className="text-sm text-gray-500">{data.visibility}m</div>
                                        </div>
                                    </div>
                                </div>
                    }

                </div>
            </div>

        </div>
    );
}

export default Display;
