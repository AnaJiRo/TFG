type FormContainerProps = {
    children: React.ReactNode;
  };
  
  export default function FormContainer({ children }: FormContainerProps) {
    return (
      <div className="w-full max-w-md bg-fuchsia-300/80 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col gap-6">
        {children}
      </div>
    );
  }
  