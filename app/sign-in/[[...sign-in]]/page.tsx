import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="flex justify-center mb-6">
          <div
            className="h-24 w-24 rounded-full dark:bg-white flex items-center bg-blue-500 justify-center 
                       text-5xl dark:text-blue-500 font-bold shadow-md text-shadow-gray-800"
          >
            Ꝏ
          </div>
        </div>
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#3b82f6",
            },
          }}
        />
      </div>
    </>
  );
}
