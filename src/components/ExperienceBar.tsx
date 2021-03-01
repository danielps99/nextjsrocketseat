import styles from '../styles/components/ExperienceBar.module.css'
import {ChallengesContext} from '../contexts/ChallengesContext'
import { useContext } from 'react';

export function ExperienceBar() {
    const {currentExperience, experienceToNextLeval} = useContext(ChallengesContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLeval;
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
            <div style={{width:`${percentToNextLevel}%`}}/>
            <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>
                {currentExperience} xp
            </span>
            </div>
             <span>{experienceToNextLeval} xp</span>
        </header>
    );
}