import React from 'react';
import {useState} from 'react';
import Header from '../../components/header';
import './about.css';

function About() {
    const year = new Date().getFullYear()

    const [names, setNames] = useState(['Vasya', 'Kolya']);

    const nameItems = names.map((item, i) => <li key={i}>{item}</li>)

    const handleAddItem = () => {
        setNames([...names, 'Текст']);       
    }

    return(
        <div className="about">
            <button onClick={handleAddItem}>Add item</button>
           <ul>
               {nameItems}
           </ul>
        </div>
    )
}

export default About;