import { DataDetail } from '@/types/response';
import React from 'react';

type DataDetailProps = {
  data: DataDetail;
  handleClick: () => void;
};

const DataDisplay: React.FC<DataDetailProps> = ({ data, handleClick }) => {
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
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Kode Toko:</p>
                <p className="text-sm text-gray-900">{data.store_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">NIK:</p>
                <p className="text-sm text-gray-900">{data.user_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Tanggal Transaksi:
                </p>
                <p className="text-sm text-gray-900">{data.date_tx}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Total Transaksi:
                </p>
                <p className="text-sm text-gray-900">
                  Rp {data.total_tx.toLocaleString()}
                </p>
              </div>
            </div>
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

export default DataDisplay;
