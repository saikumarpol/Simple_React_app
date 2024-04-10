import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { AiOutlineForm } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCelebration } from "react-icons/md";
import { GiFinishLine } from "react-icons/gi";
import { TfiCup } from "react-icons/tfi";

import "react-vertical-timeline-component/style.min.css";

// Get current date
const currentDate = new Date();

// Get current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
const currentDayOfWeek = currentDate.getDay();

// Calculate the dates for registration opening and closing
const registrationOpens = new Date(currentDate);
registrationOpens.setDate(currentDate.getDate() + (1 - currentDayOfWeek)); // Monday of the current week
const registrationCloses = new Date(registrationOpens);
registrationCloses.setDate(registrationOpens.getDate() + 3); // Thursday of the current week

// Calculate the date for mentor allocation (Friday of the current week)
const mentorAllocation = new Date(registrationCloses);
mentorAllocation.setDate(registrationCloses.getDate() + 1);

// Calculate the dates for hackathon start and end (Saturday and Sunday of the current week)
const hackathonStart = new Date(mentorAllocation);
hackathonStart.setDate(mentorAllocation.getDate() + 1); // Saturday of the current week
const hackathonEnd = new Date(hackathonStart);
hackathonEnd.setDate(hackathonStart.getDate() + 1); // Sunday of the current week

// Calculate the date for results announcement (Monday of the next week)
const resultsAnnouncement = new Date(hackathonEnd);
resultsAnnouncement.setDate(hackathonEnd.getDate() + 0); // Monday of the next week

const timeLine = [
  {
    id: 1,
    date: registrationOpens.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Registration Begins",
    desc: "Let the fun begin",
    Icon: AiOutlineForm,
  },
  {
    id: 2,
    date: registrationCloses.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Registration Closes",
    desc: "Registration form closes",
    Icon: IoIosCloseCircleOutline,
  },
  {
    id: 3,
    date: mentorAllocation.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Mentor Allocation",
    desc: "You get your own mentor to clear all your doubts",
    Icon: CgProfile,
  },
  {
    id: 4,
    date: hackathonStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Opening Ceremony",
    desc: "Hackathon Begins",
    Icon: MdOutlineCelebration,
  },
  {
    id: 5,
    date: hackathonEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Hackathon Concludes",
    desc: "36 Hours of fun",
    Icon: GiFinishLine,
  },
  {
    id: 6,
    date: resultsAnnouncement.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    eventTitle: "Results Announcement",
    desc: "Let's close",
    Icon: TfiCup,
  },
];

const Timeline = () => {
  return (
    <div className=" w-full min-h-screen  flex flex-col items-center px-4  py-10 md:px-6">
      <h1 className="text-3xl font-bold py-10">Timeline</h1>
      <VerticalTimeline>
        {timeLine.map(({ id, date, eventTitle, desc, Icon }) => (
          <VerticalTimelineElement
            key={id}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#151030", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #151030" }}
            date={date}
            iconStyle={{ background: "#7C3AED",fontWeight:'bold', color: "#fff" }}
            icon={<Icon />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">{eventTitle}</h3>
            <p>{desc}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
