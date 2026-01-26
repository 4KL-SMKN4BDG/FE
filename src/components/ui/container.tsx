import { FC, ReactNode } from 'react';

interface ContainerProps {
  amount?: number | string;
  iconColor?: string;
  titleColor?: string;
  amountColor?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  amountClassName?: string;
}

const Container1: FC<ContainerProps> = ({
  amount,
  icon,
  iconColor,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  className,
  amountClassName,
}) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return (
    <div
      className={`  w-fit h-fit border-3 border-base-200 flex flex-col rounded-xl ${className}`}
      style={{
        padding: screenWidth >= 640 ? screenWidth * 0.01 : screenWidth * 0.04,
        gap: screenHeight * 0.01,
      }}
    >
      <p className={` text-sm ${titleClassName}`}>{title}</p>
      <p className={subtitleClassName}>{subtitle}</p>
      <div
        className={`flex  items-center ${iconColor}`}
        style={{ gap: screenWidth * 0.01 }}
      >
        {icon}
        <span className={` ${amountClassName}`}>{amount}</span>
      </div>
    </div>
  );
};

const Container2: FC<ContainerProps> = ({
  amount,
  icon,
  title,
  titleColor,
  iconColor,
  amountColor,
  className,
}) => {
  return (
    <div
      className={` hover:pl-10 hover:pr-10 ease-in-out duration-500 stat gap-3 w-full ${className}`}
    >
      <div className={`stat-figure ${iconColor} text-4xl`}>{icon}</div>
      <div className={`${titleColor}`}>{title}</div>
      <div className={`${amountColor}`}>{amount}</div>
    </div>
  );
};

export { Container1, Container2 };
