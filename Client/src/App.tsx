import { Button } from "./components/ui/button";


const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-6xl font-extrabold text-gray-800 text-center">
        Welcome to Clearity App!
      </h1>
      <Button>Click me</Button>
    </div>
  );
};

export default App;
