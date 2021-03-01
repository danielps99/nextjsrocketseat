import { createContext, useState, ReactNode } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye',
    description: string
    amount: number
}
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLeval: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLeval = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLeval) {
            finalExperience = finalExperience - experienceToNextLeval;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLeval,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}