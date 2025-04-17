import { ErrorResponse } from '@/types/response';
import React from 'react';

type ErrorModalProps = {
  err: ErrorResponse;
  handleClick: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ err, handleClick }) => {
  return (
    <div className="absolute flex justify-center items-center w-svw h-svh">
      <div className="md:flex md:w-xl bg-white rounded-2xl">
        <div className="p-8 grow">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Data Transaksi
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            Informasi Transaksi
          </div>
          <p className="mt-2 text-gray-500">
            Berikut adalah detail transaksi Anda.
          </p>
          <div className="mt-4">
            <p className="text-red-500 font-semibold">{err.message}</p>
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={handleClick}
            className="px-3 py-1 cursor-pointer rounded hover:bg-gray-400"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
