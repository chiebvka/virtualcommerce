"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'
import { createContact } from '@/sanity/utils';
import { useToast } from '@/components/ui/use-toast';

type Props = {}

export default function ContactForm({}: Props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast()


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Set loading state to true
    setIsLoading(true);

    try {
      // Call the createContact function to add contact information to Sanity
      await createContact(name, email, issue);

      // Reset the form inputs
      setName('');
      setEmail('');
      setIssue('');
      toast({
        title: "Success",
        description: "Payment Made Successfully",
      });
    } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
    } finally {
      // Set loading state back to false after submission
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
  
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="issue" className="block text-sm font-semibold leading-6 text-gray-900">
              Describe what your Inquiry is about
            </label>
            <div className="mt-2.5">
              <textarea
                name="issue"
                id="issue"
                rows={4}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palette sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
          {/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group> */}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="block w-full rounded-md bg-palette px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-palette/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette"
          >
            {isLoading ? 'Submitting....' :"Submit" }
          </button>
        </div>
      </form>
    </div>
  )
}