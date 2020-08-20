import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.scss';
import LoginPage from './pages/login/login.page';
import HomePage from "./pages/home/home.page";

import ProjectsPage from "./pages/projects/projects.page";
import ProductPage from "./pages/products/products.page";
import ProgressBarComponent from "./components/ui/progress-bar/progressBar.component";
import {S3Upload} from "./components/s3-upload-images/upload"
import GiftsPage from "./pages/gifts/gifts.page";


function App() {
    
    
    return (
        <React.Fragment>

            <ProgressBarComponent/>
            {/* <S3Upload/> */}
            <Switch>
                <Route exact path='/' component={ProjectsPage}/>                
                <Route exact path='/products' component={ProductPage}/>
                <Route path='/gifts' component={GiftsPage}/>
                <Route exact path='/home' component={HomePage}/>
                <Route exact path='/login' component={LoginPage}/>
            </Switch>
        </React.Fragment>

    );
}

export default App;
