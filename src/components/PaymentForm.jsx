import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCardIcon, KeyIcon } from '@heroicons/react/24/outline';

const PaymentForm = () => {
  const [useSavedCard, setUseSavedCard] = useState(true);
  const [saveCard, setSaveCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(1);
  const [total, setTotal] = useState('0.00');
  const [subtotal, setSubtotal] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const totalFromUrl = params.get('total');
    if (totalFromUrl) {
      const formattedSubtotal = Number(totalFromUrl).toFixed(2);
      setSubtotal(formattedSubtotal);
      const tipAmount = (Number(formattedSubtotal) * (10 / 100));
      const initialTotal = (Number(formattedSubtotal) + tipAmount).toFixed(2);
      setTotal(initialTotal);
    }
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      savedCard: "1"
    }
  });

  const savedCards = [
    { id: 1, last4: '4242', brand: 'Visa', expiry: '12/24' },
    { id: 2, last4: '5555', brand: 'Mastercard', expiry: '10/25' },
  ];

  const handleCardSelection = (cardId) => {
    setSelectedCard(cardId);
    setValue('savedCard', cardId.toString());
  };

  const handleTipSelection = (percentage) => {
    setTipPercentage(percentage);
    const tipAmount = (Number(subtotal) * (percentage / 100));
    const newTotal = (Number(subtotal) + tipAmount).toFixed(2);
    setTotal(newTotal);
  };

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/transaction-complete';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center">
      <div className="w-full max-w-[400px] mx-auto px-4">
        <div className="bg-gray-800 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 rounded-2xl border border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="min-h-[280px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Payment Details</h2>
                <div className="text-base sm:text-lg">
                  <span className="font-bold text-blue-400">${subtotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setUseSavedCard(false)}
                  className={`p-4 rounded-xl border ${
                    !useSavedCard 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                  } transition-all duration-200 flex flex-col items-center justify-center gap-2`}
                >
                  <CreditCardIcon className={`h-6 w-6 ${!useSavedCard ? 'text-blue-400' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">New Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUseSavedCard(true)}
                  className={`p-4 rounded-xl border ${
                    useSavedCard 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                  } transition-all duration-200 flex flex-col items-center justify-center gap-2`}
                >
                  <div className="relative">
                    <CreditCardIcon className={`h-6 w-6 ${useSavedCard ? 'text-blue-400' : 'text-gray-400'}`} />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${useSavedCard ? 'bg-blue-400' : 'bg-gray-400'} flex items-center justify-center`}>
                      <span className="text-[8px] font-bold text-gray-900">✓</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Saved Cards</span>
                </button>
              </div>

              {useSavedCard && (
                <div className="space-y-3">
                  {savedCards.map((card) => (
                    <div key={card.id}>
                      <input
                        type="radio"
                        name="saved-card"
                        value={card.id}
                        className="hidden"
                        checked={selectedCard === card.id}
                        onChange={() => handleCardSelection(card.id)}
                      />
                      <label 
                        className={`relative flex cursor-pointer rounded-xl border ${
                          selectedCard === card.id 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-gray-700 hover:border-blue-500'
                        } bg-gray-800/50 p-4 transition-all w-full`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCardSelection(card.id);
                        }}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-8 rounded-md bg-gray-700 flex items-center justify-center">
                              <span className="text-xs font-medium text-white">{card.brand}</span>
                            </div>
                            <div className="text-sm">
                              <p className="font-medium text-gray-200">
                                •••• {card.last4}
                              </p>
                              <p className="text-gray-400 text-xs">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedCard === card.id 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-600'
                            }`}>
                              <div className={`h-3 w-3 rounded-full bg-white transition-opacity ${
                                selectedCard === card.id ? 'opacity-100' : 'opacity-0'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {!useSavedCard && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200">
                      Card number
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCardIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('cardNumber', { required: !useSavedCard })}
                        className="block w-full pl-9 pr-3 py-2 sm:text-sm border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-400">Card number is required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200">
                        Expiration date
                      </label>
                      <input
                        type="text"
                        {...register('expiry', { required: !useSavedCard })}
                        className="mt-1 block w-full py-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200">
                        CVC
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          {...register('cvc', { required: !useSavedCard })}
                          className="block w-full pl-9 pr-3 py-2 sm:text-sm border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 text-blue-500 focus:ring-offset-gray-800 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label className="ml-2 block text-sm text-gray-200">
                      Save this card for future payments
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Tip Section */}
            <div className="space-y-3 border-t border-gray-700 pt-6 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-200">Add a tip</h3>
                <span className="text-sm text-gray-400">
                  {tipPercentage > 0 ? `$${(Number(subtotal) * (tipPercentage / 100)).toFixed(2)}` : '-'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[10, 15, 20].map((percentage) => (
                  <button
                    key={percentage}
                    type="button"
                    onClick={() => handleTipSelection(percentage)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all
                      ${tipPercentage === percentage
                        ? 'bg-blue-500/10 border border-blue-500 text-blue-400'
                        : 'bg-gray-700 border border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                  >
                    {percentage}%
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-sm font-medium text-gray-200">Total</span>
                <span className="text-lg font-bold text-blue-400">${total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                ${isLoading 
                  ? 'bg-blue-500/50 cursor-not-allowed opacity-75'
                  : 'bg-blue-600 hover:bg-blue-700'} 
                transition-colors relative mt-2`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Pay now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;