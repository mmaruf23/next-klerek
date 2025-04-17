import { Modal, Spinner } from '@/components/common';
import ErrorModal from '@/components/common/ErrorModal';
import { uploadFile } from '@/services/upload';
import { DataDetail } from '@/types/response';
import { ErrorResponse } from '@/types/response';
import { isZip } from '@/utils/mime';
import Head from 'next/head';
import React, { useState } from 'react';

// const dummyErrorMessage: ErrorResponse = {
//   status: 'error',
//   message: 'Sample message',
// };

const Home = () => {
  const [file, setFile] = useState<File>();
  const [inputKey, setInputKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<DataDetail>();
  const [errorMessage, setErrorMessage] = useState<ErrorResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const pickedFile = e.target.files?.[0];

    // handle batal ubah pilih file
    if (!pickedFile) {
      setFile(undefined);
      return;
    }

    // handle salah pilih jenis file by drag-drop
    if (!isZip(pickedFile.type)) {
      handleReset(); // triger tombol reset
      alert('file bukan zip!');
      return;
    }

    setFile(pickedFile);
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      console.log('File tidak ada!');
      return;
    }

    setIsLoading(true);
    const response = await uploadFile(file);
    if (response.status === 'success' && response.data != undefined) {
      setDetail(response.data[0]);
    }

    if (response.status === 'error' && response.message != undefined) {
      setErrorMessage(response);
    }

    setIsLoading(false);
  };

  // tombol reset file yang dipilih
  const handleReset = (): void => {
    if (file) {
      setFile(undefined);
      setInputKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="relative font-mono">
        {isLoading && <Spinner />}
        {detail && (
          <Modal handleClick={() => setDetail(undefined)} data={detail} />
        )}
        {errorMessage && (
          <ErrorModal
            err={errorMessage}
            handleClick={() => setErrorMessage(undefined)}
          />
        )}
        <Head>
          <title>Home</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <div className="mb-6">
              <input
                key={inputKey}
                onChange={handleChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-400 dark:bg-gray-700 dark:file:bg-gray-600 dark:file:text-gray-200 dark:text-gray-200"
                type="file"
                name="file"
                id="file"
                accept=".zip"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleUpload}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700  dark:bg-indigo-800 dark:hover:bg-indigo-900"
              >
                Upload
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
