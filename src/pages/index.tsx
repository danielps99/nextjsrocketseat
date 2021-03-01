import {GetServerSideProps} from 'next';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number, 
  currentExperience : number, 
  challengesCompleted : number,
}
export default function Home(props: HomeProps) {
  // LINHAS UTILIZADAS PARA EXPLICAR UM COMPORTAMENTO UTIL PARA POSSIBILITAR A INDEXAÇÃO POR MOTORES DE BUSCA
  // console.log("ISSO É IMPRESSO NO LOG DO NAVEGADOR", props);

  return (
    <ChallengesProvider 
    level={props.level} 
  currentExperience={props.currentExperience}  
  challengesCompleted={props.challengesCompleted} 
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // LINHAS UTILIZADAS PARA EXPLICAR UM COMPORTAMENTO UTIL PARA POSSIBILITAR A INDEXAÇÃO POR MOTORES DE BUSCA
  // const user = {
  //   level: 1,
  //   currentExperience: 50,
  //   challengesCompleted: 2,
  // }

  // console.log("ISSO É IMPRESSO NO LOG DO SERVIDOR NODE", user);

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props: {
      level : Number(level), 
      currentExperience : Number(currentExperience), 
      challengesCompleted : Number(challengesCompleted),
    }
  }
}