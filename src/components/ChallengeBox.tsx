import styles from "../styles/components/ChallengeBox.module.css";

import {ChallengesContext} from '../contexts/ChallengesContext';
import { useContext} from "react";

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Novo desafio"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            onClick={resetChallenge}
                            className={styles.challengeFailedButton}>
                            Falhei
                        </button>
                        <button
                            type="button"
                            onClick={completeChallenge}
                            className={styles.challengeSucceededButton}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                    </p>
                </div>
            )}
        </div>
    );
}