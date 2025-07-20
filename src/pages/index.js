import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css' // Removed since we're using Tailwind
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from './components/header'
import { useState, useEffect } from 'react';
// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [showRedirectBar, setShowRedirectBar] = useState(true);
  const [countdown, setCountdown] = useState(5); // Changed from 10 to 5
  const router = useRouter();

  useEffect(() => {
    if (!showRedirectBar) return;
    if (countdown === 0) {
      window.location.href = 'https://d-tech-red.vercel.app/';
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, showRedirectBar]);

  return (
    <>
      <Head>
        <title>D.Tech</title>
      </Head>

      <div id="main" className="w-full border-4 border-white rounded-2xl overflow-hidden bg-gradient-to-br from-[#4FA4FF] via-[#4FA4FF]/70 to-white">
        <Header />

        {/* Redirect Bar */}
        {showRedirectBar && (
          <div
            className="flex items-center justify-center px-4 py-4 mb-6 rounded-2xl cursor-pointer mx-4 mt-6 bg-red-500"
            onClick={(e) => {
              // Prevent click on close button from triggering redirect
              if (e.target.getAttribute('aria-label') === 'Close redirect bar') return;
              window.location.href = 'https://d-tech-red.vercel.app/';
            }}
          >
            <div className="flex flex-col items-center w-full">
              <div className="text-white text-2xl font-bold text-center">
                This Website is no longer maintained.
              </div>
              <div className="text-white text-lg text-center mt-1">
                Redirecting to DTech Red in {countdown} second{countdown !== 1 ? 's' : ''}
              </div>
            </div>
            <button
              aria-label="Close redirect bar"
              className="ml-4 text-white text-2xl font-bold hover:text-gray-200 focus:outline-none cursor-pointer rounded-full self-start"
              onClick={(e) => {
                e.stopPropagation();
                setShowRedirectBar(false);
              }}
            >
              ×
            </button>
          </div>
        )}

        <div className="relative w-full m-0 p-0 bg-gradient-to-b from-[#4FA4FF] via-[#4FA4FF]/50 to-white">
          {/* <div id="box" className="w-full h-[30vh] bg-blue-600"></div> */}
          <div className="bg-gradient-to-br from-black/90 to-black/70 p-8 text-center rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="text-4xl mb-4 text-white">D.Tech</h1>
            <div id="links" className="flex flex-col gap-4">
              <Link href="https://subject-registration-clone-dtu.vercel.app/" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Subject Analysis
                </button>
              </Link>
              <Link href="https://drive.google.com/file/d/1oSqkmZ7rm2rhgYIwzL_0X5srzW0DxCz4/view?usp=drive_link" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  B.Tech Breakdown
                </button>
              </Link>

              <Link href="https://dtu-timetable.vercel.app/" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Time Table Generator
                </button>
              </Link>
              <Link href="https://dtu-tnp.vercel.app/" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Placement Stats
                </button>
              </Link>

              <Link href="/datesheet">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  DateSheet Generator
                </button>
              </Link>
              <Link href="/result">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Result Analysis
                </button>
              </Link>

              <Link href="https://drive.google.com/drive/folders/1ZbgeICr1FUBcmoyUyyULFhASHk3KEhPH?usp=drive_link" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Question Papers
                </button>
              </Link>
              <Link href="https://dtu-pyq.vercel.app/" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  PYQ Solutions
                </button>
              </Link>

              <Link href="https://swayam-quiz.vercel.app/" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  MOOC Practice
                </button>
              </Link>
              <Link href="https://drive.google.com/file/d/1w5b1Pa4UN9y1WbsbFsKpHny0ouu_jO8F/view?usp=drive_link" target="_blank">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded">
                  Internship Training Diary
                </button>
              </Link>
            </div>
          </div>
          {/* <div id="box2" className="relative h-[50vh] rounded-full bg-blue-600 -mt-[25vh]"></div> */}
        </div>

        <img src="./assets/img/bg.png" alt="Your Image" className="image w-full h-auto block m-0 p-0" />

        <div className="faq-question my-4 bg-gradient-to-r from-[#4FA4FF] to-white">
          <input id="q2" type="checkbox" className="panele hidden" />
          <div className="plus text-2xl font-sans text-white">+</div>
          <label htmlFor="q2" className="panel-title text-lg cursor-pointer block font-poppins text-white">
            Credits
          </label>
          <div className="panele-content text-base mt-2 bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="mb-2">
              <a href='https://www.linkedin.com/in/madhavgupta2002/' target="_blank"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 flex items-center gap-2 font-inter">
                <span>👨‍💻</span>
                Madhav Gupta (Developer)
              </a>
            </h4>
            {/* <h4 className="mb-4">
                <a href="#" target="_blank"
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 flex items-center gap-2 font-inter">
                  <span>🐛</span>
                  Piyush Bhawsar (Contributor: Bugs)
                </a>
              </h4> */}
            <h4 className="mb-2">
              <a href="#" target="_blank"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 flex items-center gap-2 font-inter">
                <span>🎨</span>
                Mrinal Deb (Contributor: UI)
              </a>
            </h4>
            {/* <h4 className="mb-4">
              <a href="#" target="_blank"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 flex items-center gap-2 font-inter">
                <span>🐛</span>
                Mohit Gupta (Contributor: Bugs)
              </a>
            </h4> */}
          </div>
        </div>
      </div>
    </>
  )
