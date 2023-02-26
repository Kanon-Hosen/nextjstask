import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from 'moment';

const DateTimeSlot = () => {
    const [selected, setSelected] = useState();
    const [apTime, setAptime] = useState();
    const [resData, setResData] = useState([]);
    const [bgcolor, setBgcolor] = useState(false);
    const [toggle, setToggle] = useState(false);

    fetch('slote.json')
        .then(res => res.json())
        .then((data) => {
            return setResData(data?.schedule)
        })
    const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    background-color:#FFE7DF;
    border:none;
    color: #F25A2C    ;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: #FFE7DF;
    color: #F25A2C    ;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>{format(selected, "PP")}.</p>;
    }
    // const time = format(selected, "PP")
    const handleSlote = (e) => {
        setAptime(e.target.innerText)
        setBgcolor(!bgcolor)
        if (!bgcolor) {
            e.target.style.backgroundColor = "#FFE7DF";
            e.target.style.color = "#F25A2C";
        }
        else {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";

            
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }
  return (
    <div className="mt-[50px] transition-transform delay-500 duration-300">
      <h1 className="font-semibold italic">Select Date</h1>
      <div className="flex justify-between gap-10">
              <div className="border rounded-lg mt-2 w-1/2">
              <style>{css}</style>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            modifiersClassNames={{
              selected: "my-selected",
              today: "my-today",
            }}
              // footer={footer}
          />
              </div>
              <div className="w-1/2 gap-3">
                  <h1 className="font-semibold italic mb-1 ">Select Time Slot</h1>
                  {resData?.map(slote => {
                    //   console.log(slote)
                      var result = moment(slote?.start);
                      var slote2 = moment(slote?.end);
                    //   console.log(result.format("hh:mm a"));
                    //   console.log("🚀 ~ file: DateTimeSlot.jsx:64 ~ DateTimeSlot ~ result:", result)
                      return (
                          <>
                              <button onClick={(e)=>handleSlote(e)} className="border mt-2 mx-1 hover:bg-[#FFE7DF] rounded-full px-3 py-1 transition-colors uppercase">
                              {result.format("hh:mm a")}   
                              </button>
                              <button onClick={(e)=>handleSlote(e)} className="border uppercase hover:bg-[#FFE7DF] transition-colors mt-2 mx-1 rounded-full px-3 py-1">
                              {slote2.format("hh:mm a")}   
                              </button>
                          </>
                      )
                  })}
              </div>
          </div>
          <form onSubmit={(e)=>handleSubmit(e)} className="mt-[74px] z-50 relative">
              <textarea required name="" cols="30" rows='5' className="w-full h-32 border rounded-lg p-4 resize-none placeholder-black italic" placeholder="Additional Details"></textarea>
              <div className="flex justify-end">
              <button className="w-[111px] h-[48px] flex items-center justify-center bg-[#039800] rounded-full text-white mt-[75px]">Book Now</button>
              </div>
              <div className={`${toggle ? "scale-100 transition-transform duration-300 delay-300" : 'scale-0 hidden transition-transform duration-300 delay-300'} absolute w-fit h-fit flex items-center justify-center top-0 left-0 transition-transform duration-300 delay-300`}>
              <div className="h-[390px] flex items-center justify-center shadow-md p-4 rounded-xl bg-white w-[585px] flex-col">
                      <p className="font-bold text-4xl">  Great!</p>
            <p className="flex italic mt-2">Your Booked Time</p>
            <p className="flex gap-1 mt-1">Date: {footer}, Time: {apTime} </p>
            <button className="mt-5 bg-[#F25A2C] py-3 px-10 text-white rounded-full">Ok</button>
             </div>
          </div>
          </form>
  
    </div>
  );
};

export default DateTimeSlot;
