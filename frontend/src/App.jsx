import FloatingShape from "./components/FloatingShape.jsx"

function App() {
 

  return (
   <div className="min-h-screen bg-linear-to-br from-zinc-950 via-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-indigo-500" size="w-64 h-64" top="-5%" left="-10%" delay={0} />
    <FloatingShape color="bg-violet-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
    <FloatingShape color="bg-fuchsia-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
   </div>
  )
}

export default App
