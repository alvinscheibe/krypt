import { BsShieldFillCheck } from 'react-icons/bs';
import { ReactElement } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

type ServiceCardProps = {
  title: string;
  color: string;
  icon: ReactElement;
  subtitle: string;
}

const ServiceCard = ({ title, color, icon, subtitle }: ServiceCardProps) => (
  <div className={'flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl duration-500 ease-in-out'}>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className={'ml-5 flex flex-col flex-1'}>
      <h1 className={'mt-2 text-white text-lg'}>{title}</h1>
      <p className={'mt-2 text-white text-sm md:w-9/12'}>{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className={'flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services'}>
      <div className={'flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'}>
        <div className={'flex-1 flex flex-col justify-start items-start'}>
          <h1 className={'text-white text-3xl sm:text-5xl py-2 text-gradient'}>Services that we<br />continue to improve</h1>
        </div>
      </div>
      <div className={'flex-1 flex flex-col justify-start items-center'}>
        <ServiceCard
          title={'Security guaranteed'}
          color={'bg-indigo-700'}
          icon={<BsShieldFillCheck fontSize={21} className={'text-white'} />}
          subtitle={'Security is guaranteed. We always maintain privacy and maintaining the quality of our products.'}
        />
        <ServiceCard
          title={'Best exchange rates'}
          color={'bg-purple-500'}
          icon={<BiSearchAlt fontSize={21} className={'text-white'} />}
          subtitle={'Security is guaranteed. We always maintain privacy and maintaining the quality of our products.'}
        />
        <ServiceCard
          title={'Fastest transactions'}
          color={'bg-red-600'}
          icon={<RiHeart2Fill fontSize={21} className={'text-white'} />}
          subtitle={'Security is guaranteed. We always maintain privacy and maintaining the quality of our products.'}
        />
      </div>
    </div>
  );
};

export default Services;