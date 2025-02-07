import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCardIcon, KeyIcon } from '@heroicons/react/24/outline';

const PaymentForm = () => {
  const [useSavedCard, setUseSavedCard] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const savedCards = [
    { id: 1, last4: '4242', brand: 'Visa', expiry: '12/24' },
    { id: 2, last4: '5555', brand: 'Mastercard', expiry: '10/25' },
  ];

  const onSubmit = (data) => {
    console.log(data);
    // Handle payment processing here
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-gray-800 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 rounded-2xl border border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Payment Details</h2>
                <div className="text-base sm:text-lg">
                  <span className="font-bold text-blue-400">
                    ${99.99}
                  </span>
                </div>
              </div>
              
              {/* Saved Cards Section */}
              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSavedCard}
                    onChange={(e) => setUseSavedCard(e.target.checked)}
                    className="w-4 h-4 text-blue-500 focus:ring-offset-gray-800 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label className="ml-2 block text-sm text-gray-200">
                    Use a saved card
                  </label>
                </div>

                {useSavedCard && (
                  <div className="mt-4 space-y-2">
                    {savedCards.map((card) => (
                      <label key={card.id} className="relative flex cursor-pointer rounded-lg border border-gray-700 bg-gray-750 p-3 sm:p-4 shadow-sm focus:outline-none hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="saved-card"
                          value={card.id}
                          className="sr-only"
                          {...register('savedCard')}
                        />
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <p className="font-medium text-gray-200">
                                {card.brand} ending in {card.last4}
                              </p>
                              <p className="text-gray-400 text-xs sm:text-sm">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="ml-3 flex h-5 items-center">
                            <CreditCardIcon className="h-5 w-5 text-blue-400" />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* New Card Form */}
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

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
            >
              Pay now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm; 