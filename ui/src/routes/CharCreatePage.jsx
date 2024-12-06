import { useState } from 'react';
import { useNavigate } from "react-router";

import './CharCreatePage.css';

export default function CharacterCreatePage() {
    const [character, setCharacter] = useState({
        fname: '', lname: '', alignment: '',
        class: '', level: '', deity: '', homeland: '', race: '', size: '',
        gender: '', age: '', height: '', weight: '', hair: '', eyes: '',
        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
        background: ''
    });

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Character submitted:', character);
        try {
            //eventually map all the actual sheet data found here:
            //https://pathfindercharactersheets.com/wp-content/uploads/2017/07/Pathfinder-fillable-sheet.pdf
            //for now hard code what back-end supports
            const payload = {
                fname: character.fname, lname: character.lname, race: character.race,
                class: character.class, alignment: character.alignment, deity: character.deity,
                str: character.str, dex: character.dex, con: character.con, int: character.int,
                wis: character.wis, cha: character.cha, background: character.background
            };

            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/characters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create character");
            }

            const data = await response.json();
            if(data.status == "SUCCESS"){
                console.log(`character creation successful!`);
                alert("Character creation success");
                navigate('/characters');
            }

        } catch (error) {
            console.error("Error character create:", error);
            alert("Failed to Create. Please try again.");
        }
    };

    return (
        <div className="character-sheet">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="form-group">
                        <label htmlFor="fname">Character Name</label>
                        <input type="text" id="fname" name="fname" value={character.fname} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="alignment">Alignment</label>
                            <input type="text" id="alignment" name="alignment" value={character.alignment} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="class">Class</label>
                            <input type="text" id="class" name="class" value={character.class} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="level">Level</label>
                            <input type="text" id="level" name="level" value={character.level} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="deity">Deity</label>
                            <input type="text" id="deity" name="deity" value={character.deity} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="homeland">Homeland</label>
                            <input type="text" id="homeland" name="homeland" value={character.homeland} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="race">Race</label>
                            <input type="text" id="race" name="race" value={character.race} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input type="text" id="size" name="size" value={character.size} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="attributes">
                    {['str', 'dex', 'con', 'int', 'wis', 'cha'].map((attr) => (
                        <div key={attr} className="attribute">
                            <label htmlFor={attr}>{attr.toUpperCase()}</label>
                            <input type="number" id={attr} name={attr} value={character[attr]} onChange={handleChange} min="3" max="18" />
                        </div>
                    ))}
                </div>

                <div className="background">
                    <label htmlFor="background">Character Background</label>
                    <textarea id="background" name="background" value={character.background} onChange={handleChange} rows="5" />
                </div>

                <button type="submit" className="submit-btn">Create Character</button>
            </form>
        </div>
    );
}