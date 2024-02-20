import React from 'react'
import PageHeadings from '../_components/PageHeadings'
import ContactForm from './_components/ContactForm'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='min-h-screen w-full relative my-auto py-16 gap-y-5 px-3 max-w-7xl mx-auto'>
        <PageHeadings
            title='Contact Us' 
            description='Got Some enquiries? Reach out to us by filling out this form sending an email to operations@virtualsglobal.com'
        />
        <ContactForm />
        
    </div>
  )
}