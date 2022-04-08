import React from "react";
import { countries } from "./countries";
import { useState, useRef, useEffect} from "react";

const Searchfun = () => {

    const [searchWord, setSearchWord] = useState("")
    const [showDrop, setShowDrop] = useState(false)
    const [display, setDisplay] = useState([])

    const ref = useRef(null)

    const onChange = (e) => {
        setSearchWord(e.target.value);
        setShowDrop(true);
        
    }

    const getDisplay = (newValue) => {
            setDisplay(prev => {
            return [...prev, newValue]
        })

        setSearchWord("")
    }

    useEffect(() => {
        if(searchWord == ""){
            setShowDrop(false);
        }
    },[searchWord])

    const Filter = (array) => {
        return array.filter(value => {
            return value.name.toLowerCase().includes(searchWord.toLocaleLowerCase())
        })
    }
    return(
        <div style={{textAlign:"center"}}>
            <input onChange={onChange} value={searchWord}/>
            <div style={{display:showDrop ? "block" : "none"}}>
            {
                Filter(countries).slice(0 ,15).map(value => {
                    return <p key={value.code || value.geonameid}
                            onClick={() => {
                                getDisplay(value)
                            }}
                            ref={ref}>{value.name}</p>
                })
            }
                
            </div>

            <div>
            {
                display.map(value => {
                return <ul>
                    <li>
                        {value.name}
                    </li>
                    <li>
                        {value.subcountry}
                    </li>
                </ul>
            })
            }
            
            </div>
        </div>
    )
}

export default Searchfun