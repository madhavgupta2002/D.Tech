import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function DateSheet() {
  const router = useRouter();

  const handleRefresh = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };
  useEffect(() => {
    handleRefresh();
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <>
      <div id="cursor" />
      <div id="main">
        <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <p> Result Analysis </p>
            <input
              type="text"
              id="inputBox"
              placeholder="Enter Roll No (eg. 2K21/CO/262)"
            />
            <button id="submit">Show</button>
            <br />
            <br />
          </div>
          <div id="box2" className="c1" />
        </div>
        <br />
        <br />
        <p id="p2"> Result </p>

        <div className="html-content" id="main-result-content">
          <div id="result-data">
            <div className="row">
              <div id="nameDiv" className="data-div">
                <p className="label">Name:</p>
                <p id="name" className="dynamic-content"></p>
              </div>

              <div id="rollNoDiv" className="data-div">
                <p className="label">Roll No:</p>
                <p id="rollNo" className="dynamic-content"></p>
              </div>
            </div>

            <div className="row">
              <div id="sem1GPADiv" className="data-div">
                <p className="label">Sem 1 GPA:</p>
                <p id="sem1GPA" className="dynamic-content"></p>
              </div>

              <div id="sem2GPADiv" className="data-div">
                <p className="label">Sem 2 GPA:</p>
                <p id="sem2GPA" className="dynamic-content"></p>
              </div>

              <div id="sem3GPADiv" className="data-div">
                <p className="label">Sem 3 GPA:</p>
                <p id="sem3GPA" className="dynamic-content"></p>
              </div>

              <div id="sem4GPADiv" className="data-div">
                <p className="label">Sem 4 GPA:</p>
                <p id="sem4GPA" className="dynamic-content"></p>
              </div>
            </div>

            <div className="row">
              <div id="rank1Div" className="data-div">
                <p className="label">Branch Rank:</p>
                <p id="rank1" className="dynamic-content"></p>
              </div>

              <div id="rank2Div" className="data-div">
                <p className="label">College Rank:</p>
                <p id="rank2" className="dynamic-content"></p>
              </div>
              <div className="data-div">
                <p className="label">GPA:</p>
                <p id="gpa" className="dynamic-content"></p>
              </div>
              <div className="row">
                <div className="data-div">
                  <p className="label">Projected Perfect CGPA:</p>
                  <p id="projGPA" className="dynamic-content"></p>
                </div>

                <div className="data-div">
                  <p className="label">Projected Perfect Department Rank:</p>
                  <p id="projRank" className="dynamic-content"></p>
                </div>
              </div>
            </div>
          </div>
          <div id="graph">
            <canvas id="myChart"></canvas>
          </div>
        </div>

        <br />
        <br />

        <center>
          <b>Disclaimer: </b> <br />
          Only for 2K21 B.Tech Students <br />
          The Data is fetched from the main Result Files, thus updations will
          not be visible <br />
          Result of People who failed any subject may not be visible due to the
          same reason. <br />
          These Department Ranks are to provide a rough idea, contact dept HOD
          for official data. <br />
        </center>

        <br />
        <br />
        <div className="faq-content">
          <div className="faq-question">
            <input id="q2" type="checkbox" className="panel" />
            <div className="plus">+</div>
            <label htmlFor="q2" className="panel-title">
              Credits
            </label>
            <div className="panel-content">
              <h4>Developer : Madhav Gupta (2K21/CO/262)</h4>
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
  );
}
