import React from 'react';
import { Navbar, PortfolioLink } from '@/components';
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Navbar>
        <PortfolioLink/>
      </Navbar>
      <section id="contact" className="flex justify-center flex-col h-70vh text-black ">
        <p className="section__text__p1">Get in Touch</p>
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <Image
              src="/email.png"
              alt="Email icon"
              className="icon contact-icon email-icon"
              width={50}
              height={50}
            />
            <p>
              <a href="mailto:aryan602.as@gmail.com">aryan602.as@gmail.com</a>
            </p>
          </div>
          <div className="contact-info-container">
            <Image
              src="/linkedin.png"
              alt="LinkedIn icon"
              className="icon contact-icon"
              width={40}
              height={40}
            />
            <p>
              <a href="https://www.linkedin.com/in/aryan-sharma-51a758200/">LinkedIn</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
