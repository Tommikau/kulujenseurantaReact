import React,{useState} from "react";
import kulutService from './Services/kulut';


const LisääKulu=({setLisäystila}) =>{

    const [uusiHinta, asetaUusiHinta] = useState('')
    const [uusiNimi, asetaUusiNimi] = useState('')
    const [uusiLaskuPvm, asetaUusiLaskuPvm] = useState('')

    const handleSubmit=(event) =>{
        event.preventDefault()
        var uusiKulu ={
            hinta:uusiHinta,
            nimi:uusiNimi,
            lasku_päivämäärä: uusiLaskuPvm
        };
        

        kulutService.create(uusiKulu)
        .then(response => {
            if (response.status === 200) {
                window.confirm(`Kulu lisätty ${uusiKulu.id}`)               
            }
            setLisäystila(false);

        }).catch(error => {
            window(error)
            setTimeout(() => {
                            }, 5000);
        })
       
    }
    

    return (
        
        <div id='lisää'>
            <h2>Lisää kulu</h2>
                   
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kulun tyyppi</label>
                    <input type="text" value={uusiNimi} placeholder="Lisää kulun tyyppi esim.Sähkö"
                    onChange={({target}) => asetaUusiNimi(target.value)}required/>
                </div>
                 <div>
                    <label>Hinta</label>
                    <input type="number" value={uusiHinta} placeholder="Lisää kulun hinta"
                    onChange={({target}) => asetaUusiHinta(target.value)}required/>
                </div>
                <div>
                    <label>Laskun päivämäärä</label>
                    <input type="date" value={uusiLaskuPvm} placeholder="Lisää laskun pvm"
                    onChange={({target}) => asetaUusiLaskuPvm(target.value)}required/>
                </div>
            <br>
            </br>

            <input type='submit' value='Tallenna'/>
            <input type='button' value='Peruuta' onClick={()=>{setLisäystila(false)}}/>
            
            </form>
            
        </div>
    )
}

export default LisääKulu