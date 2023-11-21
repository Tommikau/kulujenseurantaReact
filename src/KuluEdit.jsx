import React,{useState} from "react";
import kulutService from './Services/kulut';
import './App.css';



const MuokkaaKulu=({setEditTila, muokattavaKulu}) =>{

    const [uusiId, asetaUusiId]=useState(muokattavaKulu.id)
    const [uusiHinta, asetaUusiHinta] = useState(muokattavaKulu.hinta)
    const [uusiNimi, asetaUusiNimi] = useState(muokattavaKulu.nimi)
    const [uusiLaskuPvm, asetaUusiLaskuPvm] = useState(muokattavaKulu.lasku_päivämäärä)

    const handleSubmit=(event) =>{
        event.preventDefault()
        const token = localStorage.getItem('token');

        var uusiKulu ={
            user:token,
            id:uusiId,
            hinta:uusiHinta,
            nimi:uusiNimi,
            lasku_päivämäärä: uusiLaskuPvm
        };
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        };

        kulutService.update(uusiKulu, config)
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                alert(`Kulu muokattu ${uusiKulu.id}`);
                setEditTila(false);
            } else {
                alert(`Virhe: ${response.statusText}`);
            }
        })
        .catch(error => {
            alert(`Virhe: ${error.message}`);
            setTimeout(() => {}, 5000);
        });
};
    

    return (
        
        <div id='muokkaa'>
            <h2>Muokkaa kulua</h2>
                   
            <form onSubmit={handleSubmit}>
                <div>
                <label>Kulun tyyppi</label><br></br>
                <select value={uusiNimi} onChange={({ target }) => asetaUusiNimi(target.value)} required>
                <option value="" disabled>-- Valitse kulun tyyppi --</option>
                <option value="Sähkö">Sähkö</option>
                <option value="Vesi">Vesi</option>
                <option value="Vuokra">Vuokra</option>
    {/* Lisää tarvittavat kulutyypit tähän */}
                </select>            
                </div>
                 <div>
                    <label>Hinta</label><br></br>
                    <input type="number" value={uusiHinta} placeholder="Hinta"
                    onChange={({target}) => asetaUusiHinta(target.value)}required/>
                </div>
                <div>
                    <label>Laskun päivämäärä</label><br></br>
                    <input type="date" value={uusiLaskuPvm} placeholder="Lisää laskun pvm"
                    onChange={({target}) => asetaUusiLaskuPvm(target.value)}required/>
                </div>
            <br>
            </br>

            <input type='submit' value='Tallenna'/>
            <input type='button'value='Peruuta' onClick={()=>{setEditTila(false)}}/>
            
            </form>
            
        </div>
    )
}

export default MuokkaaKulu