import { Conversation, Drawer, Header, Interaction } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Drawer />
      <Conversation />
      <Interaction />
    </div>
  );
}

export default App;
