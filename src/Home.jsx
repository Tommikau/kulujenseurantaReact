import React from "react";
import './App.css';
import money from './money.png'



const Home =() =>{
    return(
        <div className="tervetuloa-container">
            <h1>Tervetuloa kulujen seuranta sovellukseen!</h1>
            <p>Tämä sovelluksen avulla on mahdollista seurata omaa kulutustaan.</p>
            
            <p>Valitse ylhäältä minne haluat navigoida.</p>
                <p>Kulut välilehdeltä näet kaikki kulut ja voit lisätä uusia sekä suodattaa kuluja tyypin mukaan.
              </p>
              <p>Kaaviossa näet kulut graafisesti esitteyinä
                </p> 

                <img src={money} alt="Kuluja" style={{width:'200px', height:'auto'}}/>      
        </div>
    )
}
export default Home