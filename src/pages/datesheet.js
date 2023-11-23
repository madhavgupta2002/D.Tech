import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export default function DateSheet() {
  const router = useRouter();
  
  const handleRefresh = () => {
    if (!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    } 
  };
  useEffect(() => {
    handleRefresh();
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <>
    <Head>
        <title>DTU Datesheet Generator</title>
        <meta
          name="D.Tech DTU Exam DateSheet Generator"
          content="One Click solution to automatically Generate your B.Tech exam datesheet."
        />
    </Head>
      <div id="cursor" />
      <div id="main">
      <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <p> DTU Exam DateSheet Generator </p>
            <input
              type="text"
              id="newRoll"
              placeholder="Enter Roll No (eg. 2K21/CO/262)"
            />
            <button id="addRollButton">Generate</button>
            <br />
            <br />
          </div>
          <div id="box2" className="c1" />
        </div>
        <br />
        <br />
        <div className="html-content" id="main-content">
          <center><p id="p2"> DateSheet for B.Tech Odd End Semester Examination 2023-24</p>
          <p id="p1" /></center>
          <table id="myTable">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Timings</th>
              </tr>
            </tbody>
          </table>
          <br />
          <center>
            {" "}
            Generated using{" "}
            <a href="https://bit.ly/DTUexam"> DTU Exam DateSheet Generator </a>
          </center>
          <br/>
         <center> <b>Disclaimer: </b> Kindly <a href="http://exam.dtu.ac.in/DateSheet/TEN_BTECH_O23.pdf"> verify </a>  the corresponding dates.</center>
        
        </div>
        <button id="print">Print</button>
        <br />
        <br />
        <div className="faq-content">
          <div className="faq-question">
            <input id="q1" type="checkbox" className="panel" />
            <div className="plus">+</div>
            <label htmlFor="q1" className="panel-title">
              Add Additional Subjects (Optional)
            </label>
            <div className="panel-content">
              <div id="add_col">
                <h4>Add Additional Subjects (Optional)</h4>
                <label htmlFor="newDate">Date:</label>
                <input type="date" id="newDate" />
                <br />
                <label htmlFor="newCode">Subject Code:</label>
                <input type="text" id="newCode" />
                <br />
                <label htmlFor="newSubject">Subject Name:</label>
                <input type="text" id="newSubject" />
                <br />
                <button id="addRowButton">Add Row</button>
              </div>
            </div>
          </div>
          <div className="faq-question">
            <input id="q2" type="checkbox" className="panel" />
            <div className="plus">+</div>
            <label htmlFor="q2" className="panel-title">
              Credits
            </label>
            <div className="panel-content">
              <h4>Developer : Madhav Gupta (2K21/CO/262)</h4>
              <h4>UI design : Mrinal Deb (2K21/CO/292)</h4>
            </div>
          </div>
          <div className="faq-question">
            <input id="q3" type="checkbox" className="panel" />
            <div className="plus">+</div>
            <label htmlFor="q3" className="panel-title">
              Report Bug
            </label>
            <div className="panel-content">
              <h4> Contact : 8851737950 </h4>
              <h4>
                {" "}
                Mail :{" "}
                <a href="mailto:madhavgupta_co21a5_07@dtu.ac.in">
                  madhavgupta_co21a5_07@dtu.ac.in
                </a>
              </h4>
            </div>
          </div>
          <img src="./assets/img/bg.png" alt="Your Image" className="image" />
        </div>
      </div>
    </>

  )
}

