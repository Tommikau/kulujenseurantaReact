import React, { useState, useEffect } from "react";
import kulutService from './Services/kulut';
import MuokkaaKulu from "./KuluEdit";
import LisääKulu from "./KuluAdd";
import './App.css';

const KulutLista = () => {
    const [kulut, setKulut] = useState([])
    const [reload, reloadNow] = useState(false)
    const [lisäystila, setLisäystila]=useState(false)
    const [editTila, setEditTila] =useState(false)
    const [muokattavaKulu, setMuokattavaKulu]=useState(false)
  //  const [search, setSearch]=useState("")
    const [hakutermit, setHakutermit] = useState(['Sähkö', 'Vesi', 'Testi']);
    const [valittuHakutermi, setValittuHakutermi] = useState('');
  

    useEffect(() => {
      const token = localStorage.getItem('token')
        kulutService.setToken(token)
        console.log(token)
        kulutService.getAll()
            .then(data => {
                setKulut(data);
            })
            .catch(error => {
                console.error('Jotain meni vikaan kulujen haussa: ', error);
            });
    }, [reload,lisäystila,editTila]);

  // Tavallinen haku 
  //const handleSearchInputChange = (event) => {
    //    setSearch(event.target.value.toLowerCase());
    //  }
      const handleHakutermiChange = (event) => {
        setValittuHakutermi(event.target.value.toLowerCase());
      };
    
    
    const muokkaaKulu =(kulu) =>{
        setMuokattavaKulu(kulu)
        setEditTila(true)
        reloadNow(!reload)
        }
    

    const poistaKulu = (kulu) => {
        let vastaus = window.confirm(`Poista kulu`)
    
        if (vastaus === true) {
        kulutService.remove(kulu.id)
        .then(res => {
            if (res.status === 200) {
            window.scrollBy(0, -10000) 

        }        reloadNow(!reload)

                }
            
            )
            .catch(error => {
                console.log(error)
                window.scrollBy(0, -10000) // Scrollataan ylös 
        
              })
        } //poiston  peruutus
        else {
        
         console.log("poiston peruutus onnistui!")  
         window.scrollBy(0, -10000) // Scrollataan ylös 
    
           
        }  
  

    }
    
    return (
        <> 
        <div id='kulutListaContainer' >
           
            <h1 id='kulutListaTitle'>Kulut</h1>
            <div>

            {!lisäystila && !editTila && (
            <>
              <select id='kuluValinta'value={valittuHakutermi} onChange={handleHakutermiChange}>
                <option value="">Valitse hakutermi</option>
                {hakutermit.map((termi) => (
                  <option key={termi} value={termi}>
                    {termi}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
            {
            editTila && <MuokkaaKulu setEditTila={setEditTila} 
                  muokattavaKulu={muokattavaKulu} 
                />}

            {!editTila && <button id='lisaaNappi' onClick={()=> setLisäystila(true)}>Lisää uusi</button>}
            {lisäystila && <LisääKulu setLisäystila={setLisäystila} />}

            {!lisäystila && !editTila
            &&
            <table id='kulutTaulu'>
                <thead>
                    <tr>
                        
            
                        <th>Nimi</th>
                        
                        <th>Summa</th>
                        
                        <th>Päivämäärä</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {kulut
                    .filter(k=>k.nimi.toLowerCase().includes(valittuHakutermi)).map(k =>
                        <tr key={k.id}>
                            <td>{k.nimi}</td>
                            <td>{k.hinta}</td>
                            <td>{new Date(k.lasku_päivämäärä).toLocaleDateString('fi-FI')}</td>
                            <td>
                                <button id='poista' onClick={()=>poistaKulu(k)}>Poista</button>
                                <button id='muokkaaNappi' onClick={()=>muokkaaKulu(k)} >Muokkaa</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>}
        </div>
        </>
    );
}

export default KulutLista;
