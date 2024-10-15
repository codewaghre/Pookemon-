import { useEffect, useState } from 'react';
import '../index.css'
import '../App.css'
import PookemonCard from './PookemonCard';
function Pookemon() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pookemon, setPookemon] = useState([])
    const [search, setSearch] = useState("");
    console.log(pookemon);
    
    const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

    const fetchPookemon = async () => {
        try {
            const response = await fetch(API)
            const data = await response.json()
            // console.log(data);


            // fetch Data through URL and It return Promise
            const detailPookemonData = data.results.map(async (currPookemon) => {
                const response = await fetch(currPookemon.url)
                const data = await response.json()
                // console.log(data);
                return data

            })
            // console.log(detailPookemonData);


            //fetch data throgh Promise 
            const detailedResponse = await Promise.all(detailPookemonData)
            // console.log(detailedResponse);
            setPookemon(detailedResponse)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)

        }
    }

    useEffect(() => {
        fetchPookemon()
    }, [])


    const searchData = pookemon.filter((currPookemon) =>
        currPookemon.name.toLowerCase().includes(search.toLowerCase())
    )


    //setLoading and set Error
    if (loading) {
        return <div><h1>Loading.....</h1></div>
    }

    if (error) {
        return <div>
            <h1> Error is : {error.message}</h1>
        </div>
    }
    

    return (
        <div>
            <section className="container">
                <header>
                    <h1> Let Catch Pokémon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="search Pokemon"
                        value={search}
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                </div>

                <div>
                    <ul className='cards'>
                        {
                            searchData.map((pookemon) => {
                                return (
                                    <PookemonCard key={pookemon.id} pokemonData={pookemon} />
                                )
                            })
                        }
                    </ul>
                </div>

    
            </section>

        </div>
    )
}

export default Pookemon
