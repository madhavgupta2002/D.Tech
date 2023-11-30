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
          {/* <Link href="/question-papers">
            <button className="header-item">Question Papers</button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
