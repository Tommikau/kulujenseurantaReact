import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import kulutService from './Services/kulut';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

const Kaaviot = () => {
  const [kuukausittaisetKulut, setKuukausittaisetKulut] = useState([]);
  const [valittuTyyppi, setValittuTyyppi] = useState('');
  const [valittuKuukausi, setValittuKuukausi] = useState('');
  const [valittuVuosi, setValittuVuosi] = useState(new Date().getFullYear().toString()); // Alusta kuluvalla vuodella

  useEffect(() => {
   // console.log('Valittu tyyppi, kuukausi ja vuosi muuttuivat:', valittuTyyppi, valittuKuukausi, valittuVuosi);

    kulutService.getAll()
      .then(data => {
        const kuukausittaisetKulutData = Array(12).fill(0);

        data.forEach(kulu => {
          if (
            (!valittuTyyppi || kulu.nimi === valittuTyyppi) &&
            (!valittuKuukausi || new Date(kulu.lasku_päivämäärä).getMonth() + 1 === parseInt(valittuKuukausi)) &&
            (!valittuVuosi || new Date(kulu.lasku_päivämäärä).getFullYear() === parseInt(valittuVuosi))
          ) {
            const kuukausi = new Date(kulu.lasku_päivämäärä).getMonth();
            const vuosi = new Date(kulu.lasku_päivämäärä).getFullYear();

            kuukausittaisetKulutData[kuukausi] += parseFloat(kulu.hinta);
          }
        });

        setKuukausittaisetKulut(kuukausittaisetKulutData);
      })
      .catch(error => {
        console.error('Jotain meni vikaan kulujen haussa: ', error);
      });
  }, [valittuTyyppi, valittuKuukausi, valittuVuosi]);

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
        labels: chartData.labels.map((label, index) => (valittuKuukausi ? (index + 1 === parseInt(valittuKuukausi) ? label : '') : label)),
        display: true, // Näyttää x-akselin nimet
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
                <option value="Vuokra">Vuokra</option>
                <option value="Auto">Auto</option>
                <option value="Ruokakauppa">Kauppa</option>
                <option value="Viihde">Viihde</option>
                  {/* Lisää muut tyypit tarvittaessa */}
      </select>
      <label>Valitse kuukausi:</label>
      <select value={valittuKuukausi} onChange={(e) => setValittuKuukausi(e.target.value)}>
        <option value="">Kaikki kuukaudet</option>
        <option value="1">Tammi</option>
        <option value="2">Helmi</option>
        <option value="3">Maalis</option>
        <option value="4">Huhti</option>
        <option value="5">Touko</option>
        <option value="6">Kesä</option>
        <option value="7">Heinä</option>
        <option value="8">Elo</option>
        <option value="9">Syys</option>
        <option value="10">Loa</option>
        <option value="11">Marras</option>
        <option value="12">Joulu</option>


        {/* Lisää muut kuukaudet tarvittaessa */}
      </select>
  
      <label>Valitse vuosi:</label>
      <select value={valittuVuosi} onChange={(e) => setValittuVuosi(e.target.value)}>
      <option value="2022">2022</option>

        {/* Lisää vuodet tarvittaessa */}
        <option value={new Date().getFullYear().toString()}>{new Date().getFullYear().toString()}</option>

        <option value="2024">2024</option>
        <option value="2025">2025</option>

      </select>
  
      <Line data={chartData} options={chartOptions} height={100} />
    </div>
  );
}
  
export default Kaaviot;

