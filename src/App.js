import "./styles.css";
import Form from "./Form";
import config from './config.json';

export default function App() {
  return (
    <div className="App">
      <Form
        config={config}
      />
    </div>
  );
}
