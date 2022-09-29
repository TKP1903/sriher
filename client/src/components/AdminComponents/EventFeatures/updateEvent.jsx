import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-date-picker';
// import TimePicker from 'react-time-picker';
import Multiselect from 'multiselect-react-dropdown';
// import { MdDelete } from "react-icons/md";
// import { AiFillFileAdd } from "react-icons/ai";

//Redux action
import { getSpecificEvent, updateEventData } from "../../../Redux/Reducer/Events/event.action";

const UpdateEvent = () => {
    const { type } = useParams();
    // const [rDate, setRDate] = useState(new Date());
    // const [csDate, setCSDate] = useState(new Date());
    // const [ceDate, setCEDate] = useState(new Date());
    // const [dDate, setDDate] = useState(new Date());
    // const [startTime, setStartTime] = useState('10:00');
    // const [endTime, setEndTime] = useState('10:00');
    const [eventData, setEventData] = useState([]); 

    const [organiser, setOrganiser] = useState([
        "Dr.H.Thamizhchelvan",
        "Dr.N.Malathi",
        " Dr.Sharada.T.Rajan",
        " Dr.R.Vidhya",
        " Dr.S.Vijayanirmala",
        "Dr. R. Suganya",
        "Dr Vandana.S",
        "Dr.S.Mythili",
        "Dr.A.Soumya",
        "Lalita sai",
        "Dr Ashwini P",
        "N.JUVANITA MARIA NIVEDA",
        "Rachael J Khodabux",
        "Ayesha tabassum",
        "Nikitha K",
        "Dr.WM Tilakaratne",
        "Dr.K. Ranganathan",
        "Dr.Anand Ramanathan",
    ]);

    const [speaker, setSpeaker] = useState([
        "DR.K. RANGANATHAN",
        "DR.RAGHU DHANAPAL",
        "DR.SHREENIVAS, S. VANAKI",
        "DR.ABIKSHYEET PANDA ",
        "DR.S. RAJENDIRAN ",
        "DR.RACHNA RATH",
        "DR.MINAL S.CHAUDHARY",
        "DR.SUSMITA SAXENA",
        "DR.P.JAYANTHI",
        "DR.V.RAMESH",
        "DR.SHARADA T  RAJAN",
        "DR.SOLOMON F D PAUL",
        "DR.KIRAN KUMAR K",
        "DR. RADHIKA T DR. DEEPU GEORGE DR.RAKESH DR.SUJATHA",
        "DR.SIMARPREET V SANDHU",
        "DR.H.THAMIZH CHELVAN",
        "DR.PRATIBHA RAMANI",
        "DR.LEENA DENNIS JOSEPH",
        "DR.S.SHAMALA RAVIKUMAR",
        "DR.SEKAR B",
        "DR K.KARPAGASELVI",
        "DR.VIDYA R",
        "DR.SANDHYA SUNDARAM",
        "DR. N. MALATHI",
        "DR.RAJKUMAR K",
        "Dr.Shubangi Maske",
        "DR. JYOTI BHAVTHANKAR",
        "Dr.Govinda Rajkumar",
        "DR. MADHAVAN NIRMAL",
        "Dr Pooja Adtani",
        "Department Of Oral Pathology - Online Slide Seminar Program",
        "Dr.Pouyyan Aminishakib",
        "Prof.V.Ramesh Oration- Dr. Anand Ramanathan",
        "Dr. T.R.Saraswathi Oration- Dr. K. Ranganathan",
        "Dr Kalpana Balakrishnan",
        "Dr.Deepu George Mathew",
        "Dr.Priyathershini",
       "Dr. Rakesh",
        "Dr. Anuradha Priyadharshini",
        "Dr.Prathiba Ramani",
        "Dr.Anna P Joseph",
        "Dr.Shika Saxena",
        "Dr.G.C.Shivakumar",
        "Dr.S. Sri Gayathri",
        "Dr. Madhu Narayan Senior Lecturer",
        "Dr.Anjana Majumdhar",
        "Dr.Rashmi",
        "Dr.Deepa Parvathi V",
        "Activity Session",
        "Dr. Alka Kale",
        "Dr. Rajiv Desai",
    ]);

    const [eligibility, setEligibility] = useState(["Postgraduates", "Faculty", "International"]);
          

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getSpecificEvent(type));
        }, []);

    const reduxState = useSelector((globalStore) => globalStore.event);
    useEffect(() => {
        reduxState?.events && setEventData(reduxState.events?.events);        
    }, [reduxState]);
    console.log(eventData);

    const submit = () => {
        dispatch(
            updateEventData({
            ...eventData,
          })
        );
    }

  return (
    <>
      <div className="flex flex-col items-end gap-10 bg-white px-4 py-5 border shadow-xl rounded-md">
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-row items-center gap-5 w-full">
            <TextField
              required
              name="eventName"
              id="outlined-required"
              helperText="Event name"
              fullWidth
              value={eventData?.eventName}
              //onChange={handleChange("eventName")}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, eventName: e.target.value }))
              }
            />
            <TextField
              required
              name="subHeading"
              fullWidth
              id="outlined-required"
              helperText="Sub Heading"
              value={eventData?.subHeading}
              //onChange={handleChange("subHeading")}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  subHeading: e.target.value,
                }))
              }
            />
            <TextField
              required
              name="conferenceYear"
              fullWidth
              id="outlined-required"
              helperText="Conference Year"
              value={eventData?.conferenceYear}
              //onChange={handleChange("conferenceYear")}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  conferenceYear: e.target.value,
                }))
              }
            />
          </div>
          <TextField
            required
            name="description"
            id="outlined-required"
            helperText="Event Description"
            value={eventData?.description}
            fullWidth
            //onChange={handleChange("description")}
            onChange={(e) =>
              setEventData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <TextField
            required
            name="specialNotes"
            id="outlined-required"
            helperText="Event Special Notes"
            value={eventData?.specialNotes}
            fullWidth
            //onChange={handleChange("specialNotes")}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                specialNotes: e.target.value,
              }))
            }
          />
          <div className="w-64">
            <Multiselect
              isObject={false}
              options={speaker}
              selectedValues={eventData?.speaker}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, speaker: e }))
              }
              onSelect={(e) => {
                setEventData((prev) => ({ ...prev, speaker: e }));
              }}
              onRemove={(e) => {
                setEventData((prev) => ({ ...prev, speaker: e }));
              }}
              placeholder="Select Speaker"
            />
          </div>
          <div className="w-64">
            <Multiselect
              isObject={false}
              options={organiser}
              selectedValues={eventData?.organiser}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, organiser: e }))
              }
              onSelect={(e) =>
                setEventData((prev) => ({ ...prev, organiser: e }))
              }
              onRemove={(e) =>
                setEventData((prev) => ({ ...prev, organiser: e }))
              }
              placeholder="Select Organiser"
            />
          </div>
          <Multiselect
            isObject={false}
            options={eligibility}
            selectedValues={eventData?.eligibility}
            onChange={(e) =>
              setEventData((prev) => ({ ...prev, eligibility: e }))
            }
            onSelect={(e) =>
              setEventData((prev) => ({ ...prev, eligibility: e }))
            }
            onRemove={(e) =>
              setEventData((prev) => ({ ...prev, eligibility: e }))
            }
            placeholder="Eligibility"
          />
          <div className="flex flex-row items-center gap-8 w-full">
            <TextField
              name="status"
              id="status"
              select
              defaultValue=""
              value={eventData ? eventData.status : ""}
              helperText={`Selected Status = ${eventData?.status}`}
              //onChange={handleChange("status")}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <MenuItem value={"active"} key={"active"}>
                Active
              </MenuItem>
              <MenuItem value={"inactive"} key={"inactive"}>
                In-Active
              </MenuItem>
            </TextField>
            <TextField
              name="currentHome"
              id="status"
              select
              defaultValue=""
              value={eventData ? eventData.currentHome : " "}
              helperText={`Selectd Current Home = ${eventData?.currentHome}`}
              //onChange={handleChange("currentHome")}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  currentHome: e.target.value,
                }))
              }
            >
              <MenuItem value={"yes"}>Yes</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </TextField>
            <TextField
              name="abstractForm"
              id="status"
              select
              defaultValue=""
              value={eventData ? eventData.abstractForm : " "}
              helperText={`Selectd Abstract Form = ${eventData?.abstractForm}`}
              //onChange={handleChange("abstractForm")}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  abstractForm: e.target.value,
                }))
              }
            >
              <MenuItem value={"yes"}>Yes</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </TextField>
          </div>

          <div className="flex items-center gap-8 w-full">
            <div className="flex flex-col items-start">
              <p className="text-md text-gray-700 font-light">Register Date</p>
              <DatePicker
                onChange={(e) =>
                  setEventData((prev) => ({ ...prev, registerDate: e }))
                }
                value={eventData?.registerDate}
                className=""
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md text-gray-700 font-light">
                Conference Start Date
              </p>
              <DatePicker
                onChange={(e) =>
                  setEventData((prev) => ({ ...prev, conferenceStartDate: e }))
                }
                value={eventData?.conferenceStartDate}
                className=""
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md text-gray-700 font-light">
                Conference End Date
              </p>
              <DatePicker
                onChange={(e) =>
                  setEventData((prev) => ({ ...prev, conferenceEndDate: e }))
                }
                value={eventData?.conferenceEndDate}
                className=""
              />
            </div>
          </div>
          <div className="flex items-center gap-5 w-full">
            <TextField
              required
              name="image"
              id="outlined-required"
              helperText="Image url"
              value={eventData?.image}
              fullWidth
              //onChange={handleChange("image")}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, image: e.target.value }))
              }
            />
            <TextField
              required
              name="venues"
              id="outlined-required"
              helperText="Venue"
              value={eventData?.venues}
              fullWidth
              //onChange={handleChange("venues")}
              onChange={(e) =>
                setEventData((prev) => ({ ...prev, venues: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-row items-start justify-center gap-5 w-full">
            <div className="w-64">
              <TextField
                name="conferenceType"
                id="status"
                select
                required
                defaultValue={eventData?.value}
                value={eventData?.value}
                helperText={`Conference = ${eventData?.conferenceType}`}
                //onChange={handleChange("conferenceType")}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    conferenceType: e.target.value,
                  }))
                }
              >
                <MenuItem value={"paid"}>Paid</MenuItem>
                <MenuItem value={"free"}>Free</MenuItem>
              </TextField>
            </div>
            <div className="w-64">
              <TextField
                name="Event Type"
                id="status"
                select
                defaultValue=""
                value={eventData?.eventType}
                helperText={`Event Type = ${eventData?.eventType}`}
                //onChange={handleChange("conferenceType")}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    eventType: e.target.value,
                  }))
                }
              >
                <MenuItem value={"conference"}>Conference</MenuItem>
                <MenuItem value={"cde"}>CDE</MenuItem>
              </TextField>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TextField
                required
                name="Online Price"
                value={eventData?.onlineprice}
                id="outlined-required"
                helperText="Online Price"
                fullWidth
                // onChange={handleChange("conferenceURL")}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    onlineprice: e.target.value,
                  }))
                }
              />
              <TextField
                required
                name="Offline Price"
                id="outlined-required"
                helperText="Offline Price"
                value={eventData?.offlineprice}
                fullWidth
                // onChange={handleChange("conferenceURL")}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    offlineprice: e.target.value,
                  }))
                }
              />
              <TextField
                required
                name="International Price"
                id="outlined-required"
                value={eventData?.internationalprice}
                helperText="International Price"
                fullWidth
                // onChange={handleChange("conferenceURL")}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    internationalprice: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex flex-row items-start justify-center gap-5 w-full">
            <TextField
              required
              name="conferenceURL"
              id="outlined-required"
              helperText="Conference Url"
              value={eventData?.conferenceURL}
              fullWidth
              // onChange={handleChange("conferenceURL")}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  conferenceURL: e.target.value,
                }))
              }
            />
          </div>
          {/* <div className="px-1 py-2 w-full border-t border-grey-900">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-gray-200 font-bold py-4">Schedule Conference</h2>
                        <button 
                            className="flex items-center gap-2 px-2 py-1 bg-blue-800 text-gray-50 rounded-md"
                        >
                            Add
                            <AiFillFileAdd />
                        </button>
                    </div>
                    <div className="flex items-center justify-around w-full gap-8 w-full shadow-md border px-4 py-2 border border-gray-200">
                        <div className="flex flex-col items-end justify-center gap-4">
                            <div className="flex  items-center gap-2">
                                <p className="text-md text-gray-700 font-light">Date</p>
                                <DatePicker onChange={setDDate} value={dDate}  className="text-blue-900"/>
                            </div>
                            <div className="flex  items-center gap-2">
                                <p className="text-md text-gray-700 font-light">Start Time</p>
                                <TimePicker onChange={setStartTime} value={startTime} closeClock />
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-md text-gray-700 font-light">End Time</p>
                                <TimePicker onChange={setEndTime} value={endTime} />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2  gap-4">
                            <TextField
                                required
                                name=""
                                id="outlined-required"
                                helperText="Topic" 
                                //value={eventData.}
                                //onChange={handleChange("conferenceYear")} 
                            />
                            <TextField
                                required
                                name=""
                                id="outlined-required"
                                helperText="Description"                      
                                //value={eventData.}
                                //onChange={handleChange("conferenceYear")} 
                            />
                        </div>
                        <TextField
                                name=""
                                id="status"
                                select
                                required
                                defaultValue=""
                                value={eventData?.status}
                                helperText="Select Conference Type"
                                //value={eventData.}
                                //onChange={handleChange("conferenceYear")} 
                            >{speaker?.map((data) => (
                                <MenuItem value={data}>{data}</MenuItem>
                            ))
                            }
                            </TextField>
                        <div>
                            <MdDelete className="w-10 h-10 text-red-600"/>
                        </div>
                    </div>                    
                </div> */}
        </div>
        <div className="flex flex-row items-center gap-5">
          <Link
            to="/admin/events"
            className="px-2 py-1 bg-rose-700 text-gray-50 rounded-md"
          >
            Cancel
          </Link>
          <Link
            to="/admin/events"
            onClick={submit}
            className="px-2 py-1 bg-green-900 text-gray-50 rounded-md"
          >
            Update
          </Link>
        </div>
      </div>
    </>
  );
}

export default UpdateEvent;
