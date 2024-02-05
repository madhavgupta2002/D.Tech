import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Link from 'next/link'

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

    <Head>
        <title>DTU Question Papers</title>
        <meta
          name="D.Tech DTU Question Papers"
          content="Study from Previous Year Question Papers for Delhi Technological University Semester Exams."
        />
    </Head>

      <div id="main">
        <Header />

        <div className="container">
          <div id="box" />
          <div id="mid_box" className="text">
            <p> Question Papers </p>
 
            <button id="display"> Semester 5-8 (CO IT SE) </button>

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
          <iframe id="myIframe" class="responsive-iframe" width="600" height="400" sandbox="allow-scripts allow-same-origin"></iframe>

          </div>
        </div> 

        <br />
        <br />
        <Footer />

      </div>
    </>
  );
}
