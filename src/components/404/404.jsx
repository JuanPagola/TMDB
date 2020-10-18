import React, { useEffect, createRef } from 'react';
import lottie from 'lottie-web';
import pagNotFound from '../../assets/404Animation.json';
import './404.scss';

export const NotFound = () =>{
    let animationContainer404 = createRef();
    
    useEffect(() => {
        const cancelAnim = lottie.loadAnimation({
            container: animationContainer404.current,
            animationData: pagNotFound,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet'
            }
        });
        //Optional clean up for unmounting
        return () => cancelAnim.destroy();
    }, []);

    return (
        <div className="mainContainer">
            <div ref={animationContainer404} />
            <p>Page not found</p>
            <p>click <a href="/">here</a> to start again </p>
        </div>
    );
}