import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from './components/header'
import { answers } from '../../public/js/answers'

const inter = Inter({ subsets: ['latin'] })

export default function PYQSolutions() {
  return (
    <>
      <div id="main">
        <Header />
        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <p> PYQ Solutions </p>

          </div>
          <div id="box2" className="c1" />
        </div>
        {Object.keys(answers).map((key) => (
          <div key={key} style={{ margin: '10px' }}>
            <span>{key}</span>
            <a href={answers[key]} download>
              <button>Download</button>
            </a>
          </div>
        ))}
        <br />
        <br />
        <div className="faq-question">
          <input id="q2" type="checkbox" className="panele" />
          <div className="plus">+</div>
          <label htmlFor="q2" className="panel-title">
            Credits
          </label>
          <div className="panele-content">
            <h4>
              <a href='https://www.linkedin.com/in/madhav-g-6bb64a11a/' target="_blank" rel="noopener noreferrer">
                Madhav Gupta (2K21/CO/262)
              </a>
            </h4>
          </div>
        </div>
        <img src="./assets/img/bg.png" alt="Your Image" className="image" />
      </div>
    </>
  )
}