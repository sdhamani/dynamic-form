import './App.css';
import formConfig from './config/sampleFormConfig.json';
import DynamicForm from './components/dynamicForm';


function App() {
  return (
    <div className="App">
      <DynamicForm config={formConfig} />
    </div>
  );
}

export default App;
