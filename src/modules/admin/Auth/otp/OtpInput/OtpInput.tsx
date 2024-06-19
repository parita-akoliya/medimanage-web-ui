import React, { useState, useRef } from 'react';
import './OtpInput.css';

interface OtpInputProps {
    length: number;
    onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

    const handleInputChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOtp(newOTP);

        if (value !== '' && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOTP.every((digit) => digit !== '')) {
            onComplete(newOTP.join(''));
        }
    };

    const handleBackspace = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            const newOTP = [...otp];
            newOTP[index - 1] = '';
            setOtp(newOTP);
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="otp-container">
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    ref={(input) => (inputRefs.current[index] = input)}
                    className="otp-input"
                />
            ))}
        </div>
    );
};

export default OtpInput;
