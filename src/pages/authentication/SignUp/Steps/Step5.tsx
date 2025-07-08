
import { useNavigate } from "react-router";

export const Step5 = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-[400px] text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Thank you for Signing Up!
                </h1>
                <p className="text-gray-500 text-sm">
                    One of our team members will contact you shortly.
                    Please check your email for further updates
                </p>
            </div>

            {/* Back to Login Link */}
            <button
                onClick={() => navigate("/sign-in")}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
                Back to Login
            </button>
        </div>
    );
};
