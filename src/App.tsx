import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateTaskModalForm from "./components/CreateTaskModalForm";
import DroppableTaskList from "./components/DroppableTaskList";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/tasks" element={
                  <div>
                  <CreateTaskModalForm/>
                      <br/>
                  <DroppableTaskList/>
                  </div>
              } />
          </Routes>
      </Router>
  );
}

export default App;
