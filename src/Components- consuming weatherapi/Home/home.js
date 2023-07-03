import React, {useState, useEffect} from "react"
import "./home.css"
import {AiOutlineSearch} from "react-icons/ai"
import {FaCloud} from "react-icons/fa"
import axios from "axios"


const  Weather =  () => {

        const [search, setSearch] = useState("Lagos")
        const [data, setData] = useState([])
        const [input, setInput] = useState("")
        let componentMounted = true;


        useEffect(() => {
                const getWeather = () =>{
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=87bb17f3b43d08c8ccbe3b0e19057e34&units=metric`)
                        .then ((response) =>{
                                setData(response.data)
                        })
                        return () => {
                                componentMounted = false;
                        }
                }
                getWeather();
        }, [search]);

        console.log(data)

        let icon = null;
        if (typeof data.main != "undefined" ){
                if(data.weather[0].main == "Clouds"){
                        icon = "FaCloud"
                }else if(data.weather[0].main == "Thunderstorm"){
                        icon = "FaBolt"
                }else if(data.weather[0].main == "Drizzle"){
                        icon = "FaCloudRain"
                }else if(data.weather[0].main == "Rain"){
                        icon = "FaCloudShowerHeavy"
                }else if(data.weather[0].main == "Snow"){
                        icon = "FaSnowFlake"
                }else if(data.weather[0].main == "Clear"){
                        icon = "FaClear"                
                }else if(data.weather[0].main == "Mist"){
                        icon = "FaMist"
                }else {
                        icon = "FaSmog"
                }
        }else {
                return(
                        <div>. . . Loading</div>
                )
        }

        let temp = (data.main.temp).toFixed(0);
        let humidity = (data.main.humidity).toFixed(1);
        let pressure = (data.main.pressure).toFixed(1);

        // Date
        let d = new Date();
        let date = d.getDate();
        let year = d.getFullYear();
        let month = d.toLocaleString("default", {month: "long"});
        let day = d.toLocaleString("default", {weekday: "long"});

        // Time
        let time = d.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
        });

        const handleSubmit = (event) => {
                event.preventDefault();
                setSearch(input);
        }


        return (
                <div className="WF-App">           
                        <div className="WF-App-Wrap" > 
                                <div className="WF-App-Top">
                                        <div className="Line"></div>
                                        <h1 style={{color: "white"}}>W E A T H E R.<span style={{color: "turquoise"}} >F O R E C A S T</span></h1>
                                </div>

                                <div className="WF-App-Mid">
                                        <div className="WF-Info-Details">
                                                <form  onSubmit={handleSubmit}>
                                                        <div className="Search-hold">      
                                                                <div>
                                                                        <input  
                                                                        placeholder="In What City. . .?"
                                                                        type="search" 
                                                                        name= "search"
                                                                        value={input}
                                                                        onChange={(e) => setInput(e.target.value)} required
                                                                        />
                                                                </div>
                                                                <button style={{outline: 0, border: 0}}   type="submit" className="Search-icon">
                                                                        <AiOutlineSearch style={{width: 25, height: 25, color: "gray", paddingRight: 10}} />
                                                                </button>
                                                        </div>
                                                        <div className= "Error"><p>Invalid City Name</p></div>
                                                </form>
                                                <div className= "Overlay">
                                                        <div className="Climate">
                                                                <h2>{data.name} | {data.sys.country}</h2>
                                                                <p className="Date">{day}, {month}  {date}, {year}
                                                                        <br/>{time}
                                                                </p>    
                                                                <hr/>
                                                        </div>
                                                        <div className="Climate-Details">
                                                                <i> <FaCloud style={{width: 30, height: 30, }} /> </i>
                                                                {/* <i className= {` Cloud ${icon} `}></i> */}
                                                                {/* < img src= {` http://openweaathermap.org/img/w/${data.weather[0].icon}.png `}  alt="image-icon" /> */}
                                                                <h1>{temp}&deg;C </h1>
                                                                <p>{data.weather[0].main}</p>
                                                                <p>humidity: {humidity}% </p>
                                                                <p>pressure: {pressure}mb</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <div className="WF-App-Bottom">
                                        <div className="line" ></div>
                                        <div className="Page-No"></div>
                                </div>
                </div>
                </div>
        );
}


export default Weather;

