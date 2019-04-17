import React from 'react';
import './Alert.css';
import closesvg from '../../assets/close.svg';

const Alert = ({ error, setError }) => {
    return error && (
        <div className="Alert-container">
            <div className="Alert-message">
                <div className="Alert-close" onClick={() => { setError(null) }}>
                    <img src={closesvg} alt="close"/>
                </div>
                {error}
            </div>
        </div>
    );
}

export default Alert;