import React from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
    Alert,
  } from "@material-tailwind/react";
import { Link, useNavigate} from "react-router-dom";

export default function Landing() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [visible, setVisible] = React.useState(true);


  const navigate = useNavigate();

  return (

    <div>

    <header className="fixed w-full">
    <Alert className="rounded-none font-white-100" color="amber" open={open} onClose={() => setOpen(false)}>
        <Typography variant="small">
            For collaborations or hiring inquiries, please reach out to <a className='underline ms-1 me-1' target='_blank' href="https://mail.google.com/mail/u/0/?fs=1&to=ashleshshenoy09@gmail.com&tf=cm"> ashleshshenoy09@gmail.com</a> Your feedback is invaluable to us; we'd love to hear from you!
        </Typography>
    </Alert>
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <a href="#" className="flex items-center">
                    <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" width="35" height="30" className="h-6 mr-3 sm:h-9"/>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Watomate</span>
                </a>
                <div className="flex items-center lg:order-2">
                    <Link to="/login" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Login</Link>
                </div>
               
            </div>
        </nav>
    </header>
    <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">Building Campaigns <br></br>automations & more.</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Build marketing campaigns  on <a target="_blank" href="https://www.whatsapp.com" className="hover:underline"> whatsapp</a>. Integrate your <a target="_blank" href="https://flowbite.com/docs/getting-started/introduction/" className="hover:underline">Shopify store</a> to build auomations. </p>
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <a href="https://github.com/ashleshshenoy/watomate" target="_blank" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg> View on GitHub
                    </a> 
                    <a href="" target="_blank" className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                       <img src="./whatsapp.png" width="30" height="30" className="me-2" alt="" ></img>
                        Watch demo
                    </a>
                </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="/hero.png" alt="hero image"></img>
            </div>                
        </div>
    </section>

    <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

            <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Targeted Campaign Creation for Customer Segments</h2>
                    <p className="mb-8 font-light lg:text-xl">Revolutionize your marketing strategy with our app's advanced campaign creation feature. Easily create targeted campaigns for specific customer segments, ensuring your messages resonate with each group.</p>
                    
                    <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                        <li className="flex space-x-3">
                    
                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Large scale broadcasting</span>
                        </li>
                        <li className="flex space-x-3">
                    
                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">AI-driven message rephrasing</span>
                        </li>
                        <li className="flex space-x-3">
                    
                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Context based Image generation</span>
                        </li>
                    </ul>
                    <p className="mb-8 font-light lg:text-xl">Go beyond the limitations of traditional WhatsApp broadcast with our app's large-scale campaign capabilities.</p>
                </div>
                <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-1.png" alt="dashboard feature image"></img>
            </div>
            <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-2.png" alt="feature image 2"></img>
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Seamless Integration with Shopify & automations.</h2>
                    <p className="mb-8 font-light lg:text-xl">Simplify your workflow, automate marketing tasks triggered based on Shopify events and enhance your marketing efforts with targeted messages for your customers
                    </p>

                    <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                        <li className="flex space-x-3">

                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Easy app integration</span>
                        </li>
                        <li className="flex space-x-3">
                    
                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Update and manage multiple trigger</span>
                        </li>
                        <li className="flex space-x-3">
                    
                            <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">AI based content rephrasing.</span>
                        </li>
                      
                        
                    </ul>
                    <p className="font-light lg:text-xl">leverage real-time Shopify data to deliver personalized experiences to your customers, ultimately driving sales and revenue.                  .</p>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 mt-5 pt-5" >
        <br></br><br></br>
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">Frequently asked questions</h2>
            <div className="max-w-screen-md mx-auto">
            <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
        <Typography variant="small"  >
        <span>How do I connect my whatsapp?</span>
        </Typography>
            
        </AccordionHeader>
        <AccordionBody>
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">You need to connect your whatsapp account to be able to send messages to through our application.</p>
            <p className="text-gray-500 dark:text-gray-400">You can link your whatsapp web account by scanning QR provided by application.</p>
        </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        <Typography variant="small"  >
        <span>How do I integrate Shopify store?</span>
        </Typography>
        </AccordionHeader>
        <AccordionBody>
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">You can Integrate your shopify store to our platform my installing our Shopify application to your store.</p>
            <p className="text-gray-500 dark:text-gray-400">We have a unpublished shopify app which is not available on the Shopify store, only way to install application is through our platform.</p>
        </div>        
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
        <Typography variant="small"  >
        <span>How secure is it?</span>
        </Typography>
        </AccordionHeader>
        <AccordionBody>
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">We want to assure our users that we do not utilize your WhatsApp & Shopify access for any purpose other than facilitating the actions initiated by you within our app</p>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">We do not share this access with third parties, nor do we employ it for analytics or any other external purposes.</p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">We understand the importance of giving our users control over their data. Therefore, we provide an option for users to logout and remove all access and data from our servers at any time. By selecting this option, all data associated with your account will be permanently deleted from our servers, ensuring complete privacy and peace of mind</p>   
            </div>
        </AccordionBody>
      </Accordion>
    </>
            </div>               
        </div>
    </section>





    <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">

            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
            <div className="text-center">
                <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                    Watomate    
                </a>
                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2023 watomate all rights reserved.
                </span>
                <ul className="flex justify-center mt-5 space-x-5">

                    <li>
                        <a href="https://github.com/ashleshshenoy" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/ashlesh-shenoy/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <img width="16" height="16" src="/linkedin.svg" alt="" ></img>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    </div>
        )
}

