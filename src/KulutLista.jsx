import React, { useState, useEffect } from "react";
import kulutService from './Services/kulut';

const KulutLista = () => {
    const [kulut, setKulut] = useState([]);
    const [reload, reloadNow] = useState(false);


    useEffect(() => {
        kulutService.getAll()
            .then(data => {
                setKulut(data);
            })
            .catch(error => {
                console.error('Jotain meni vikaan kulujen haussa: ', error);
            });
    }, []);
    const poistaKulu = (kulu) => {
        let vastaus = window.confirm(`Poista kulu ${kulu.id}`)
    
        if (vastaus === true) {
        kulutService.remove(kulu.id)
        .then(res => {
            if (res.status === 200) {
           // setMessage(`Successfully removed product ${product.productName}`)
            //setIsPositive(true)
            //setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            // Ilmoituksen piilotus
           // setTimeout(() => {
           // setShowMessage(false)},
           // 5000
           // )
            reloadNow(!reload)
            }
            
                }
            )
            .catch(error => {
               // setMessage(error)
                //setIsPositive(false)
                //setShowMessage(true)
                console.log(error)
                window.scrollBy(0, -10000) // Scrollataan ylös 
        
                //setTimeout(() => {
                //  setShowMessage(false)
               //  }, 6000)
              })
        } //poiston  peruutus
        else {
        //setMessage('Poisto peruttu onnistuneesti.')
          //  setIsPositive(true)
         //   setShowMessage(true)
         console.log("poiston peruutus onnistui!")  
         window.scrollBy(0, -10000) // Scrollataan ylös 
    
            // Ilmoituksen piilotus
           // setTimeout(() => {
           // setShowMessage(false)},
            //5000
           // )
        }    
    
    }
    
    return (
        <div>
            <table id='kulutTaulu'>
                <thead>
                    <tr>
                        <th>Id</th>
            
                        <th>Nimi</th>
                        
                        <th>Summa</th>
                        
                        <th>Päivämäärä</th>
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
                                <button onClick={()=>poistaKulu(k)}>Poista</button>
                                <button>Testi</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default KulutLista;
