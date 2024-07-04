import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from './components/header'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      {/* <div id="cursor" /> */}
      <Head>
        <title>D.Tech</title>
      </Head>


      <div id="main">
        <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <h1>D.Tech</h1>
            <div id="links">
              <Link id="routeButton" href="https://subject-registration-clone-dtu.vercel.app/" target="_blank">
                <button id="CGPAButton">
                  Subject Analysis
                </button>
              </Link>
              <Link id="routeButton" href="https://drive.google.com/file/d/1oSqkmZ7rm2rhgYIwzL_0X5srzW0DxCz4/view?usp=drive_link" target="_blank">
                <button id="CGPAButton">
                  B.Tech Breakdown
                </button>
              </Link>

              <Link id="routeButton" href="/datesheet">
                <button id="datesheetButton">
                  DateSheet Generator
                </button>
              </Link>
              <Link id="routeButton" href="/result">
                <button id="CGPAButton">
                  Result Analysis
                </button>
              </Link>
              <Link id="routeButton" href="/question-papers">
                <button id="PYQButton">
                  Question Papers
                </button>
              </Link>
              <Link id="routeButton" href="/PYQSolutions">
                <button id="PYQButton">
                  PYQ Solutions
                </button>
              </Link>
            </div>
          </div>
          <div id="box2" className="c1" />
        </div>
        <br />
        <br />
        <div className="faq-question">
          <input id="q2" type="checkbox" className="panele" />
          <div className="plus">+</div>
          <label htmlFor="q2" className="panel-title">
            Credits
          </label>
          <div className="panele-content">
            <h4><a href='https://www.linkedin.com/in/madhavgupta2002/' target="_blank">Madhav Gupta (Developer)</a></h4>
            <h4><a target="_blank">Piyush Bhawsar (Contributor: Bugs)</a></h4>
            <h4><a target="_blank">Mrinal Deb (Contributor: UI)</a></h4>
            <h4><a target="_blank">Mohit Gupta (Contributor: Bugs)</a></h4>
          </div>
        </div>

        <img src="./assets/img/bg.png" alt="Your Image" className="image" />

      </div>

    </>
  )
}
