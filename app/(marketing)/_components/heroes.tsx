import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex items-center justify-center md:justify-end max-w-5xl md:ml-8 md:mr-[50px]">
      <div className="relative w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:h-[450px] md:w-[450px]">
        <Image 
          src="/landing.svg" 
          fill
          className="object-contain dark:hidden" 
          alt="Landing"
        />
        <Image 
          src="/landing-dark.svg" 
          fill
          className="object-contain hidden dark:block" 
          alt="Landing"
        />
      </div>
    </div>
  );
}
