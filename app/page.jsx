// import Image from "next/image";
import 'primeflex/primeflex.css';
import LoginPage from './login/page';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <LoginPage/>
      {/* <h1 className='data'>edtyui</h1> */}
    </>
    // </main>
  );
}
