import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {

    const [canShow, setCanShow] = useState(false);
    const {level} = useContext(ChallengesContext);

    useEffect(() => {
        if (level > 1) {
            setCanShow(true);    
        }        
    }, [level]);
    
    function closeModal(){
        setCanShow(false);
    }

    return !canShow ? null : (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                <button type="button"
                    onClick={closeModal}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    );
}