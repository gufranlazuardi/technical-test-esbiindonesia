import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = (prop: Props) => {
  const { children } = prop;

  return (
    <>
      <div className=" w-full h-screen bg-pink-200 overflow-auto">
        <div className="flex gap-8 mt-[2rem] mx-[2rem] py-[10rem] bg-white justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
