import Link from "next/link";
import { mahesh } from "@/public/mahesh.jpg";

import Image from "next/image";

const members = [
  {
    name: "Mahesh Tadas",
    role: "Founder & CEO",
    avatar: "CEO",
    link: "#",
  },
  //   {
  //     name: "Elijah Jones",
  //     role: "Co-Founder - CTO",
  //     avatar: "https://alt.tailus.io/images/team/member-two.webp",
  //     link: "#",
  //   },
  //   {
  //     name: "Isabella Garcia",
  //     role: "Sales Manager",
  //     avatar: "https://alt.tailus.io/images/team/member-three.webp",
  //     link: "#",
  //   },
  //   {
  //     name: "Henry Lee",
  //     role: "UX Engeneer",
  //     avatar: "https://alt.tailus.io/images/team/member-four.webp",
  //     link: "#",
  //   },
  //   {
  //     name: "Ava Williams",
  //     role: "Interaction Designer",
  //     avatar: "https://alt.tailus.io/images/team/member-five.webp",
  //     link: "#",
  //   },
  //   {
  //     name: "Olivia Miller",
  //     role: "Visual Designer",
  //     avatar: "https://alt.tailus.io/images/team/member-six.webp",
  //     link: "#",
  //   },
];

export default function TeamSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-blue-500 sm:text-5xl md:text-6xl mb-4">
          About Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Shaping the future of finance with innovation, trust, and growth.
        </p>
      </div>
      <div className="mx-auto max-w-5xl  px-6">
        <div className="mt-18 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">Our team</h2>
          </div>
          <div className="mt-6 sm:mt-0">
            {/* <p>
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p> */}
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <Image
                  src="/mahesh.jpg"
                  alt="Profile Image"
                  width={826}
                  height={1239}
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 
             hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                />

                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    {/* <span className="text-xs">00{index + 1}</span> */}
                    <h3 className="text-xs">Founder & CEO</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
