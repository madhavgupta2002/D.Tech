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


      <div id="main">
        <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <h1>D.Tech</h1>
            <div id="links">
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
              <Link id="routeButton" href="https://subject-registration-clone-dtu.vercel.app/">
                <button id="CGPAButton">
                  Registration Simulator
                </button>
              </Link>
              <Link id="routeButton" href="/question-papers">
                <button id="PYQButton">
                  Question Papers
                </button>
              </Link>
              <Link id="routeButton" href="/PYQSolutions">
                <button id="PYaQButton">
                  PYQ Solution
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
            <h4><a href='https://www.linkedin.com/in/madhav-g-6bb64a11a/' target="_blank">Madhav Gupta (2K21/CO/262)</a></h4>
          </div>
        </div>

        <img src="./assets/img/bg.png" alt="Your Image" className="image" />

      </div>

    </>
  )
}
