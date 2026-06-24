import { useRef, useState } from "react"


const TestPage = () => {
 const [code, setCode] = useState(["", "", "", "", "", ""])
 const inputRefs = useRef([]);
 
 const handleChange = (index, value) => {
   const newCode = [...code];
  if(value.length>1){
  const pastedCode = value.slice(0, 6).split("")
  for (let i = 0 ; i < 6 ;i++){
    newCode[i]=pastedCode[i] || ""; 
  }
  setCode(newCode);

  const lastFilledIndex = newCode.findLastIndex((digit)=>digit !== "");
  const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5 ;
  inputRefs.current[focusIndex].focus();

  }
  
  else{
   
  newCode[index] = value;
  setCode(newCode) 

  if(value && index < 5){
    inputRefs.current[index + 1].focus();
  }
  }
 }

 const handleSubmit = (e) => {
  e.preventDefault();
  const finalCode = code.join("")
  alert(`CODE:${finalCode}`)

 }

 const handleKeyDown = (e,index) => {
  if(e.key === "Backspace" && !code[index] && index > 0){
    inputRefs.current[index-1].focus();
  }
 }


  return (
    <div className="max-w-md bg-gray-50 rounded-2xl backdrop-filter backdrop-blur-xl  shadow-xl overflow-hidden">
      <div className="p-12 w-full max-w-md">
        <h1 className="text-3xl font-light text-gray-700 text-center tracking-wide mb-2">Verify your OTP</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-between mt-5 gap-2 ">

          {code.map((digit, index)=>(
            <input
            key={index}
            value={digit}
            ref={(el) => inputRefs.current[index] = el}
            className="bg-gray-700 size-12 text-white border-2 border-gray-500 rounded-lg font-bold text-center"
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            
            />
          ))}

        </div>

        <button type="submit" className="
        mt-5
        w-full
        py-3
        px-4
        bg-indigo-500/15
       
        text-gray-700
        font-medium
        rounded-lg
        hover:bg-indigo-500/20
        hover:border-indigo-400/40
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500/40
        transition-all
        duration-200 cursor-pointer" 
        disabled={code.some((digit)=> !digit)}
        >
          Submit
        </button>
       

      </form>
      <p className="p-3 m-3 text-xl">Code: {code.join("")}</p>
          </div>
    </div>
  )
}

export default TestPage
