import React from 'react'

const Panel = () => {
  return (
    <div className='h-full rounded-lg w-3/6 flex flex-col p-6 border border-[rgba(34,34,34,.1)]'>
        <form action="">
            <div className='flex flex-col text-black'>
                <label className='text-lg font-extrabold'>Buy <strong className='text-orange-400'>Eixoln</strong> a coffee ☕</label>

                <div className='flex flex-row p-4 items-center'>
                    <div className='text-4xl'>☕</div>
                    <div className='text-[rgba(0,0,0,.3)] text-[21px]'>x</div>
                    
                    <div className='ml-3 w-10 h-10 relative text-center leading-10 hover:bg-[#7D4533] text-[#7D4533] hover:text-white rounded-full border border-[rgba(34,34,34,.3)]'>
                        <span className='text-[17px] font-extrabold '>1</span>
                        <input className='absolute top-0 left-0 w-full h-full opacity-0' type="radio" value="1" />
                    </div>

                    <div className='ml-3 w-10 h-10 relative text-center leading-10 hover:bg-[#7D4533] text-[#7D4533] hover:text-white rounded-full border border-[rgba(34,34,34,.3)]'>
                        <span className='text-[17px] font-extrabold'>3</span>
                        <input className='absolute top-0 left-0 w-full h-full opacity-0' type="radio" value="1" />
                    </div>

                    <div className='ml-3 w-10 h-10 relative text-center leading-10 hover:bg-[#7D4533] text-[#7D4533] hover:text-white rounded-full border border-[rgba(34,34,34,.3)]'>
                        <span className='text-[17px] font-extrabold'>5</span>
                        <input className='absolute top-0 left-0 w-full h-full opacity-0' type="radio" value="1" />
                    </div>

                    <input className='w-10 ml-3' name="coffees" placeholder="10" min="1" max="100" type="number"/>

                </div>

                <input 
                    type="text" 
                    placeholder='Your name please(optional)'
                    className='mt-2 w-3/5 bg-[#F1F0F1] rounded-xl p-3 focus:outline-none focus:border-amber-900 border-2'
                />
                <textarea 
                    name="memo" 
                    cols="27" 
                    rows="10" 
                    className='resize-none bg-[#F1F0F1] p-3 w-3/5 mt-3 focus:outline-none rounded-xl focus:border-amber-900 border-2' 
                    placeholder='Say something nice...(optional)' 
                />

                <button className='w-3/5 mt-5 rounded-3xl p-3 bg-amber-900'>Support</button>
            </div>
        </form>
    </div>
  )
}

export default Panel