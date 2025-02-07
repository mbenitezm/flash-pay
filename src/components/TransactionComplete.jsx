import { useNavigate } from 'react-router-dom';

const TransactionComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center">
      <div className="w-full max-w-[400px] mx-auto px-4">
        <div className="bg-gray-800 p-8 shadow-2xl shadow-blue-500/10 rounded-2xl border border-gray-700 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400">Your transaction has been completed</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionComplete; 