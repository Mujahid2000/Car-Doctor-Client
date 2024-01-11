'use client';
import { Button, Carousel } from 'flowbite-react';

const Banner = () => {
    return (
    <div className='h-[700px] mb-48 '>
        {/* <img className='max-w-[1700px] rounded-lg mx-auto' src="https://i.ibb.co/KDqSZzJ/image-1800x700.png" alt="" /> */}
        <Carousel className='absolute bg-gray-900 bg-blend-multiply opacity-50'>
    <img
        alt="..."
        src="https://i.ibb.co/sHr3R8p/5.jpg"
    />
    <img
        
        alt="..."
        src="https://i.ibb.co/ZKM02y8/1.jpg"
    />
    <img
        
        alt="..."
        src="https://i.ibb.co/x370tBQ/2.jpg"
    />
    <img
        
        alt="..."
        src="https://i.ibb.co/K2ZDmyt/3.jpg"
    />
    <img
        
        alt="..."
        src="https://i.ibb.co/syPK8W1/6.jpg"
    />
    </Carousel> 
        <div className='absolute mt-[500px] ml-4 '>
        <div>
            <h2 className='text-6xl text-white font-bold'>
            Affordable <br /> Price For Car <br /> Servicing
            </h2>
            <p className='text-xl mb-4 text-white font-bold'>
            There are many variations of passages of  available, but <br /> the majority have suffered alteration in some form
            </p>
        </div>
        <div>
        <div className='flex gap-3'>
        <Button gradientDuoTone="greenToBlue">
        Discover More
      </Button>
      <Button
        gradientDuoTone="purpleToBlue"
        outline
      >
        <p>
        Latest Project
        </p>
      </Button>
        </div>
        </div>
        </div>
    </div>
    );
};

export default Banner;