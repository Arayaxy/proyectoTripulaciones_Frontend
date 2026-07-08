import { Login } from '../components/Login'
import heroImg from '../assets/heroImg.jpg'
import heroLogo from '../assets/logo_2026_Backstage.svg'

export const LoginPage = () => {
  return (
    <main className="login">
      <header className="login__header">
        <a href="/">
          <img src={heroLogo} alt="MITÜMI Backstage"  /> </a>
      </header>
      <div className="login__hero">
        <img src={heroImg} alt="MITÜMI Backstage" className="login__hero-img" />
      </div>
      <Login/>
      <footer className="login__footer">
        © MITÜMI 2026
      </footer>
    </main>
  )
}
