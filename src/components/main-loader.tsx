import React from 'react';
import Image from 'next/image';
import Loader from '../../public/icons/dualLoader.svg';

const MainPageLoader = () => {
  return (
    <div className="flex h-screen  w-screen flex-col items-center justify-center">
        <Image alt='Loading' src={Loader} width={200} height={200} />
    </div>
  )
}

export default MainPageLoader