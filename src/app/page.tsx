import Image from "next/image";
import Link from 'next/link';

//import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <Link href="/signin">Sign In</Link>
      <br />
      <Link href="/register">Register</Link>
    </>
  );
}
