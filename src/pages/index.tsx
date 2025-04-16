import { uploadFile } from '@/services/upload';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [file, setFile] = useState<File>();
  const [inputKey, setInputKey] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const pickedFile = e.target.files?.[0];
    if (!pickedFile) {
      setFile(undefined);
      return;
    }

    const isZip =
      [
        'application/zip',
        'application/x-zip-compressed',
        'application/octet-stream',
      ].includes(pickedFile.type) ||
      pickedFile.name.toLowerCase().endsWith('.zip');

    if (!isZip) {
      handleReset();
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
    const response = await uploadFile(file);
    console.log(response);
  };

  const handleReset = (): void => {
    if (file) {
      setFile(undefined);
      setInputKey((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file.name);
    }
  }, [file]);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="p-4">
        <input
          key={inputKey}
          onChange={handleChange}
          className="border border-dashed"
          type="file"
          name="file"
          id="file"
          accept=".zip"
        />
        <button
          onClick={handleUpload}
          className="px-4 border ml-2 hover:bg-gray-300"
        >
          Upload
        </button>
        <button
          onClick={handleReset}
          className="px-4 border ml-2 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Home;
