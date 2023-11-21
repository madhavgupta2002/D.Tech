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
      {/* <div id="cursor" /> */}      <div id="cursor" />

      <div id="main">
        <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <p> Question Papers </p>
 
            <button id="display">Semester 5-8 (CO IT SE)</button>

          </div>
          <div id="box2" className="c1" />
        </div>
        <br />
        <br />


   
        <div className="html-content" id="main-result-content" >
          <div id="navigator">
          </div>
          <div class="container-iframe">
          <iframe id="myIframe" class="responsive-iframe" width="600" height="400" ></iframe>
          
          </div>
        </div>



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
