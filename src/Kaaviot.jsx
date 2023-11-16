import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import kulutService from './Services/kulut';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);


const Kaaviot = () => {
  const [kuukausittaisetKulut, setKuukausittaisetKulut] = useState([])
  const [valittuTyyppi, setValittuTyyppi] = useState('')

  useEffect(() => {
    console.log('Valittu tyyppi muuttui:', valittuTyyppi);
    kulutService.getAll()
    
      .then(data => {
        const kuukausittaisetKulutData = Array(12).fill(0);
        data.forEach(kulu => {
          if (!valittuTyyppi || kulu.nimi === valittuTyyppi){
          const kuukausi = new Date(kulu.lasku_päivämäärä).getMonth();
          kuukausittaisetKulutData[kuukausi] += parseFloat(kulu.hinta);
          }
        });
        setKuukausittaisetKulut(kuukausittaisetKulutData);
      })
      .catch(error => {
        console.error('Jotain meni vikaan kulujen haussa: ', error);
      });
  }, [valittuTyyppi]);

  const chartData = {
    labels: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
    datasets: [
      {
        label: 'Kulut per kuukausi',
        data: kuukausittaisetKulut,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.1,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels,
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };
  
  return (
    <div>
    <h1>Kulujen kuukausittainen kehitys</h1>
    <label>Valitse kulun tyyppi:</label>
    <select value={valittuTyyppi} onChange={(e) => setValittuTyyppi(e.target.value)}>
      <option value="">Kaikki tyypit</option>
      <option value="Sähkö">Sähkö</option>
      <option value="Vesi">Vesi</option>
      {/* Lisää muut tyypit tarvittaessa */}
    </select>
    <Line data={chartData} options={chartOptions} height={100} /> {/*Tätä arvo muuttamalla voi muuttaa kaavion kokoa */}
  </div>  );
  
  
};

export default Kaaviot;
