import logo from './logo.svg';
import './App.css';
import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';

// const apiKey = process.env.REACT_APP_API_KEY
// const apiUrl = 'https://frontend-take-home-service.fetch.com'

// fetch(apiUrl + '/auth/login', {
//   method: 'POST',
//   headers: {
//     'fetch-api-key' : apiKey,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     'name': 'userName',
//     'email': 'userEmail@email.com'
//   })
// })
// .then (resp => resp.json())
// .then(function(data) {
//   console.log(data)
// })
// .catch(function(error){
//   console.log(error);
// })

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
