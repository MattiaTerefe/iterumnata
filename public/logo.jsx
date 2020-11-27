import Link from "next/link";
export const Logo = (props) => (
  <Link href="/">
    <a>
      <img src="../assets/logo.svg" className="logo" />
    </a>
  </Link>
);
