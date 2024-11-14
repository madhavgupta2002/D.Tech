import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="header-class">
        <div>
          <Link href="/">
            <button className="header-item">D. Tech Home</button>
          </Link>
        </div>
        <div className="header-pages">
          <Link href="/datesheet">
            <button className="header-item">DateSheet</button>
          </Link>
          <Link href="/result">
            <button className="header-item">Result</button>
          </Link>
          <Link href="https://subject-registration-clone-dtu.vercel.app/" target="_blank">
            <button className="header-item">Subject Analysis</button>
          </Link>
          <Link href="/question-papers">
            <button className="header-item">Question Papers</button>
          </Link>
          <Link href="https://dtu-pyq.vercel.app/">
            <button className="header-item">PYQ Solutions</button>
          </Link>
          <Link href="https://dtu-tnp.vercel.app/" target="_blank">
            <button className="header-item">Placement Stats</button>
          </Link>
          <Link href="https://swayam-quiz.vercel.app/" target="_blank">
            <button className="header-item">MOOC Practice</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
