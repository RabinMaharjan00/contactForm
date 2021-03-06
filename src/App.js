import './App.scss';
import "bootstrap/dist/css/bootstrap.css";
import Header from './components/Header/Header';
import ContactForm from './components/contactForm/ContactForm';

function App() {
  return (
    <div className="container">
     <Header />
     <div className="main"> 
     <ContactForm />
     </div>
     <div>
       
     </div>
    </div>
  );
}

export default App;
