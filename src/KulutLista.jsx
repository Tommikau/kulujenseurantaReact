import React, { useState, useEffect } from "react";
import kulutService from './Services/kulut';
import LisääKulu from "./KuluAdd";
import './App.css';

const KulutLista = () => {
    const [kulut, setKulut] = useState([]);
    const [reload, reloadNow] = useState(false);
    const [lisäystila, setLisäystila]=useState(false)

    

    useEffect(() => {
        kulutService.getAll()
            .then(data => {
                setKulut(data);
            })
            .catch(error => {
                console.error('Jotain meni vikaan kulujen haussa: ', error);
            });
    }, [reload,lisäystila]);
    const poistaKulu = (kulu) => {
        let vastaus = window.confirm(`Poista kulu ${kulu.id}`)
    
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
        <div>
            <h1>Kulut</h1>
            {!lisäystila && <button id='lisaaNappi' onClick={()=> setLisäystila(true)}>Lisää uusi</button>}
            {lisäystila && <LisääKulu setLisäystila={setLisäystila} />}
            <table id='kulutTaulu'>
                <thead>
                    <tr>
                        <th>Id</th>
            
                        <th>Nimi</th>
                        
                        <th>Summa</th>
                        
                        <th>Päivämäärä</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {kulut.map(k =>
                        <tr key={k.id}>
                            <td>{k.id}</td>
                            <td>{k.nimi}</td>
                            <td>{k.hinta}</td>
                            <td>{k.lasku_päivämäärä}</td>
                            <td>
                                <button id='poista' onClick={()=>poistaKulu(k)}>Poista</button>
                                <button id='muokkaaNappi'>Muokkaa</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default KulutLista;
