import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div id="cursor" />
      <div id="main">
        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <h1>DTU Utility</h1> {/* Updated Heading */}
            <div id="links"> 
              <Link  id="routeButton" href="/datesheet">
                <button id="datesheetButton"> 
                  DateSheet Generator
                </button>
              </Link>              
              <Link  id="routeButton" href="/result">
                <button id="CGPAButton"> 
                  CGPA Analysis
                </button>
              </Link>
              <Link  id="routeButton" href="/question-papers">
                <button id="PYQButton"> 
                  Question Papers
                </button>
              </Link>
            </div>
          </div>
          <div id="box2" className="c1" />
        </div>
        <br />
        <br />
        <img src="./assets/img/bg.png" alt="Your Image" className="image" />
      </div>
    </>
  )
}
