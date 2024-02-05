import Link from "next/link";

const Footer = () => {
  return (
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

);
};

export default Footer;
