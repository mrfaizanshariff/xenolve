import * as motion from "motion/react-client"
import React from "react";
export default  function Home() {

  
  const shinyTextAnimationInitial:React.CSSProperties = {
   
  }
  const shinyTextAnimationFinal:React.CSSProperties = {
    backgroundPosition:"left center",
    color:"#ef9671"
  }
  return (
  <div className="py-16 px-20 relative gradient-blur">
    <section className="flex  relative p-36 md:p-56 justify-center items-center border-b-2 border-blue-600 ">
      <div className="flex md:flex-row flex-col justify-center items-center">
        <div className="text-5xl md:text-6xl cursor-pointer shiny text-black">Create.</div>
        <div className="text-5xl md:text-6xl cursor-pointer shiny text-black">Innovate.</div>
        <div className="text-5xl md:text-6xl cursor-pointer shiny text-black">Teach.</div>
      </div>
    </section>
    <motion.div
            initial={{ opacity: 0, translateY:200}}
            whileInView={{ opacity: 1,  translateY:0 }}
            transition={{
                duration: 0.6
            }}
            
        >

    <section className="max-w-7xl py-8 text-white">
      <div className="font-[light-font] mb-4">
        What we do
      </div>
      <div className="flex md:flex-row flex-col gap-8">
        <div className="md:text-4xl text-3xl ">
        Xenolve is your one stop for Internet Solutions. 
        We are a group of hustlers who love solving business problems with tech based solutions.
        </div>
        <div className="font-[light-font] text-lg">
        Our goal is to <span className="shiny cursor-pointer underline decoration-blue-600 text-blue-600" >CREATE</span> software solutions that match your needs and expectations. 
        To <span className="shiny cursor-pointer underline decoration-blue-600 text-blue-600">INNOVATE</span> strategies and plans to stream-line the Internet presence of your brand.
        And to <span className="shiny cursor-pointer underline decoration-blue-600 text-blue-600">TEACH</span> upcoming builders/hustlers on how to navigate the ever changing tech world.
        </div>
      </div>
      <div>
        <button>
          Our Work
        </button>
      </div>
    </section>
        </motion.div>
  </div>
  );
}
