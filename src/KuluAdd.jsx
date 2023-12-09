import React,{useState} from "react"
import kulutService from './Services/kulut'
import './App.css'



const LisääKulu=({setLisäystila}) =>{

    const [uusiHinta, asetaUusiHinta] = useState('')
    const [uusiNimi, asetaUusiNimi] = useState('')
    const [uusiLaskuPvm, asetaUusiLaskuPvm] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token')
        
        const uusiKulu = {
            user: token,
            hinta: uusiHinta,
            nimi: uusiNimi,
            lasku_päivämäärä: uusiLaskuPvm,
        };
    
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        };
    
        kulutService.create(uusiKulu, config)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                  //  alert(`Kulu lisätty ${uusiKulu.id}`);
                    setLisäystila(false);
                } else {
                    alert(`Virhe: ${response.statusText}`)
                }
            })
            .catch(error => {
                alert(`Virhe: ${error.message}`)
                setTimeout(() => {}, 5000)
            });
    };
     
    return (
        
        <div id='lisää'>
            <h2>Lisää kulu</h2>
                   
            <form onSubmit={handleSubmit}>
            <div>
                <label>Kulun tyyppi</label><br></br>
                <select value={uusiNimi} onChange={({ target }) => asetaUusiNimi(target.value)} required>
                <option value="" disabled>-- Valitse kulun tyyppi --</option>
                <option value="Sähkö">Sähkö</option>
                <option value="Vesi">Vesi</option>
                <option value="Vuokra">Vuokra</option>
                <option value="Auto">Auto</option>
                <option value="Ruokakauppa">Kauppa</option>
                <option value="Viihde">Viihde</option>



                     {/* Lisää tarvittavat kulutyypit tähän */}
                </select>
            </div>

                 <div>
                    <label>Hinta</label><br></br>
                    <input type="number" step='0.01' value={uusiHinta} placeholder="Lisää kulun hinta"
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
            <input type='button'value='Peruuta' onClick={()=>{setLisäystila(false)}}/>
            
            </form>
            
        </div>
    )
}

export default LisääKulu