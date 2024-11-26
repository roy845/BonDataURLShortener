import "./App.css";
import Header from "./components/Header";
import ShortenForm from "./components/ShortenForm";

function App(): JSX.Element {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Header title="URL Shortener" />
      <main className="flex-grow container mx-auto p-4">
        <ShortenForm />
      </main>
    </div>
  );
}

export default App;
