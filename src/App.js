import React, {useState} from 'react';
import { ClockIcon, CalendarIcon, GlobeAmericasIcon } from '@heroicons/react/20/solid';
import './App.css';
import { format, addMinutes } from 'date-fns'
import { useFormik } from 'formik';

var App = () => {
  const minutes = 15;
  const curDate = new Date();
  const startDate = format(curDate, 'h:mmaaa');
  const endDate = format(addMinutes(curDate, minutes), 'h:mmaaa, EEEE, MMMM d, yyyy');
    
  function validate(values){
      const errors = {};
      if(!values.name){
        errors.name = "Required";
        alert('Name is required!');
        return errors;
      }
      if(!values.email.every(v => v)){
        errors.email = "Required";
        alert('Email is required!');
        return errors;
      }
      return errors;
    }

    const formik = useFormik({
      validateOnBlur: false,
      validateOnChange: false,
      initialValues: {
        name: '',
        email: [],
        message: '',
      },
      validate,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    const [count, setCount] = useState([0]);
    const addMore = () => {
      setCount([...count, count.length]);
    }

    const remove = (idx) => {
      const newCount = [...count];
      newCount.splice(idx, 1);
      setCount(newCount);

      const formikEmails = formik.values.email;
      formikEmails.splice(idx, 1);
      formik.setFieldValue('email', formikEmails);
    };

  return (
    <div className='container my-4'>
      <div className='m-auto w-4/5 shadow-all flex'> 
        <div className='flex-1 border-r-2 p-8'>
          <h6 className='text-xs text-gray-500 font-bold py-2'>Gaurav Garg</h6>
          <h1 className='text-lg font-bold py-2'>{minutes} Minute Meeting</h1>
          <div className='grid items-center grid-template-columns-20-auto gap-2'>
            <ClockIcon className="h-5 w-5 text-gray-500" />
            <h6 className='text-xs text-gray-500 font-bold py-2'>{minutes} min</h6>
          </div>
          <div className='grid items-center grid-template-columns-20-auto gap-2'>
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h6 className='text-xs text-gray-500 font-bold py-2'>{startDate} - {endDate}</h6>
          </div>
          <div className='grid items-center grid-template-columns-20-auto gap-2'>
            <GlobeAmericasIcon className="h-5 w-5 text-gray-500" />
            <h6 className='text-xs text-gray-500 font-bold py-2'>Indian Standard Time</h6>
          </div>
        </div>
        <div className='flex-2 p-8 '>
          <h1 className="md:text-xl font-bold mb-4">Enter Details</h1>  
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white">
              <div className="col-span-3 sm:col-span-2">
                <div className="col-span-6 sm:col-span-4 mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
                  <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} className="mt-1 w-full rounded-md border-2 border-gray-200 sm:text-sm p-2"/>
                </div>
                {
                  count.map((v, i) => (
                    <div key={i} className="col-span-6 sm:col-span-4 mb-4">
                      <label htmlFor={`email.${i}`} className="block text-sm font-medium text-gray-700">Email*</label>
                      <div className="grid items-center gap-2 grid-template-columns-auto-20">
                        <input type="email" name={`email.${i}`} id={`email.${i}`} onChange={formik.handleChange} value={formik.values.email[i]} autoComplete="email" className="mt-1 w-full rounded-md border-2 border-gray-200 sm:text-sm p-2"/>
                        <span className="cursor-pointer" onClick={() => remove(i)}>X</span>
                      </div>
                    </div>
                  ))
                }
                <div className="py-3 text-left mb-4">
                  <input onClick={addMore} type='button' className="inline-flex justify-center rounded-3xl border bg-transparent py-2 px-4 text-sm font-medium lg:text-blue-700 hover:bg-white focus:outline-none focus:ring-2 border-blue-700 cursor-pointer" value="Add Guest" />
                </div>
                <div className="col-span-6 sm:col-span-4 mb-4">
                  <label htmlFor="message" className="block text-sm font-medium ">Please share anything that will help prepare for our meeting</label>
                  <textarea id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" rows="4" className="block p-2.5 w-full text-sm rounded-lg border-2 border-gray-200 bg-white "></textarea>
                </div>
                <div className="py-3 text-left">
                  <button type="submit" className="inline-flex justify-center rounded-3xl border bg-transparent py-2 px-4 text-sm font-medium lg:text-white focus:outline-none focus:ring-2 bg-blue-700">Schedule Event</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;