import React from 'react'

const AboutDep = () => {
  return (
    <>
      <div className="md:px-20 lg:px-0">
        <div className="my-10 bg-blue-50 py-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 md:gap-10">
            <div className="w-full  lg:w-2/6 flex flex-col gap-10">
              <h1 className="text-3xl font-bold pl-3">About the University</h1>
              <p className="text-md lg:text-md text-gray-500 font-light px-4">
                Sri Ramachandra Institute of Higher Education and Research
                (Deemed University) previously known as SRMC & RI (DU), ranked
                among the top health sciences universities in India, had its
                origin as Sri Ramachandra Medical College and Research Institute
                which was established by Sri Ramachandra Educational and Health
                Trust in the year 1985 as a private not-for-profit
                self-financing institution and dedicated to serve the society as
                a centre of excellence with emphasis on medical education,
                research and health care. The Trust achieved the task of
                establishing the Institution as a “Centre of Excellence” under
                the leadership of Late Shri. N.P.V.Ramasamy Udayar who was the
                Founder & Managing Trustee of the Trust and also the first
                Chancellor of the Deemed University. Shri.V.R.Venkataachalam is
                currently the Chancellor of the Deemed University and is also
                the Managing Trustee of the Trust. Shri R.V. Sengutuvan is the
                Pro Chancellor of the Deemed University.
              </p>
            </div>
            <div className="w-full h-full lg:w-2/6 lg:h-1/6 px-4">
              <img
                src="https://www.sriramachandra.edu.in/university/images/about_sru/university_profile/01.jpg"
                alt="Loading ..."
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="my-10 bg-blue-50 py-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 md:gap-10">
            <div className="w-full  lg:w-2/6 flex flex-col gap-10">
              <h1 className="text-3xl font-bold pl-3">About the Department</h1>
              <p className="text-md lg:text-md text-gray-500 font-light px-4">
                The department of Oral Pathology is situated in the fourth floor
                of dental college, spread out in 10,000 square feet area housing
                state of the art equipment in the field of academics and
                research. The undergraduate program in our department was
                established in the year 1995 &the Postgraduate course started
                from the year 2000.The department of Oral Pathology provides a
                centre for teaching scholarly activities, deals with patient
                care and is concerned with the diagnosis of a wide range of
                abnormalities in the oral and maxillofacial region.
              </p>
            </div>
            <div className="w-full h-full lg:w-2/6 lg:h-1/6 px-4">
              <img
                src="https://opsriher.s3.ap-south-1.amazonaws.com/International+Clinico-Pathological.jpeg"
                // "https://oralpath.sriher.com/resources/template/images/aboutoral.jpg"
                alt="Loading ..."
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutDep