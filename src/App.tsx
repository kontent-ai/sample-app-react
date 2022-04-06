import React from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { projectConfigurationPath, selectedProjectCookieName } from './const';

interface AppProps{
  language: string,
  changeLanguage: (newLanguage: any, newUrl: any) => void
}

const App: React.FC<AppProps> = () => {
  const [cookie] = useCookies([selectedProjectCookieName])
  //const projectId = this.props.cookies.get(selectedProjectCookieName);

  if (!cookie.ProjectId) {
    return <Navigate to={projectConfigurationPath} />;
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
