import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css' // Removed since we're using Tailwind
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from './components/header'
// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>D.Tech</title>
      </Head>

      <div id="main" className="w-11/12 border-4 border-white rounded-2xl overflow-hidden bg-white mx-auto my-8">
        <Header />

        <div className="relative w-full m-0 p-0">
          <div id="box" className="w-full h-[30vh] bg-blue-600"></div>
          <div className="bg-black bg-opacity-70 p-8 text-center rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="text-4xl mb-4 text-white">D.Tech</h1>
            <div id="links" className="flex flex-col gap-4">
              <Link href="https://subject-registration-clone-dtu.vercel.app/" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Subject Analysis
                </button>
              </Link>
              <Link href="https://drive.google.com/file/d/1oSqkmZ7rm2rhgYIwzL_0X5srzW0DxCz4/view?usp=drive_link" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  B.Tech Breakdown
                </button>
              </Link>

              <Link href="https://dtu-timetable.vercel.app/" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Time Table Generator
                </button>
              </Link>
              <Link href="https://dtu-tnp.vercel.app/" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Placement Stats
                </button>
              </Link>

              <Link href="/datesheet">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  DateSheet Generator
                </button>
              </Link>
              <Link href="/result">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Result Analysis
                </button>
              </Link>

              <Link href="https://drive.google.com/drive/folders/1qPI0QfHpfyK3UhsDhbsChGBLATmc7N1e?usp=drive_link" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Question Papers
                </button>
              </Link>
              <Link href="https://dtu-pyq.vercel.app/" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  PYQ Solutions
                </button>
              </Link>

              <Link href="https://swayam-quiz.vercel.app/" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  MOOC Practice
                </button>
              </Link>
              <Link href="https://drive.google.com/file/d/1w5b1Pa4UN9y1WbsbFsKpHny0ouu_jO8F/view?usp=drive_link" target="_blank">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded">
                  Internship Training Diary
                </button>
              </Link>
            </div>
          </div>
          <div id="box2" className="relative h-[50vh] rounded-full bg-blue-600 -mt-[25vh]"></div>
        </div>

        <div className="faq-question my-8">
          <input id="q2" type="checkbox" className="panele hidden" />
          <div className="plus text-2xl font-sans">+</div>
          <label htmlFor="q2" className="panel-title text-xl cursor-pointer block font-poppins">
            Credits
          </label>
          <div className="panele-content text-lg mt-4 bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="mb-4">
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
            <h4 className="mb-4">
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

        <img src="./assets/img/bg.png" alt="Your Image" className="image w-full h-auto block m-0 p-0 mt-8" />

      </div>
    </>
  )
}