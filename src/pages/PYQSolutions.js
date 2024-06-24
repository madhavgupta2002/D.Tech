import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './components/header';
import { answers } from '../../public/js/answers';

const inter = Inter({ subsets: ['latin'] });

export default function PYQSolutions() {
  const parseKey = (key) => {
    const [code, ...rest] = key.split(' ');
    const subjectName = rest.slice(0, -2).join(' ');
    const year = rest.slice(-2).join(' ');

    return { code, subjectName, year };
  };

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
        <div className="button-container">
          {Object.entries(answers).map(([key, value]) => {
            const { code, subjectName, year } = parseKey(key);

            return (
              <Link href={value} key={key}>
                <button className="solution-button">
                  <div>{code}</div>
                  <div>{subjectName}</div>
                  <div>{year}</div>
                </button>
              </Link>
            );
          })}
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
            <h4>
              <a href='https://www.linkedin.com/in/madhav-g-6bb64a11a/' target="_blank" rel="noopener noreferrer">
                Madhav Gupta (2K21/CO/262)
              </a>
            </h4>
          </div>
        </div>
        <img src="./assets/img/bg.png" alt="Your Image" className="image" />
      </div>
      <style jsx>{`
        .button-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 10px;
        }

        .solution-button {
          flex: 1 1 200px;
          padding: 15px;
          margin: 5px;
          width: 200px;
          height: 120px;
          text-align: center;
          font-weight: bold;
          font-size: 1.01em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          {/* display: flex; */}
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .solution-button div {
          margin: 2px 0;
          text-align: center;
        }
      `}</style>
    </>
  );
}
