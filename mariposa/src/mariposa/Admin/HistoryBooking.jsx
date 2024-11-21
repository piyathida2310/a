import NavLogin from "../../component/Nav/NavLogin";
import "./HistoryBooking.css";
import { useState, useEffect } from "react";
import axios from "axios";

const HistoryBooking = () => {
  const [date, setDate] = useState("");
  const [User_id, SetUser_ID] = useState("U123");
  const [data, setData] = useState([]); // แก้ไขให้ data เป็น array
  const [roomNames, SetRoomName] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [nameuser, setnamesuer] = useState([]); // สำหรับเก็บชื่อผู้ใช้

  console.log(selectedDate);

  const SeachNameUser = async (userid) => {
    try {
      console.log("SeachNameUser...");
      console.log(userid);

      const res = await axios.get("http://localhost:3001/AdminReadUser", {
        params: { User_ID: userid },
      });
      const rt = res.data[0].User_FName + " " + res.data[0].User_LName
      return rt; // คืนค่าชื่อผู้ใช้
    } catch (err) {
      console.error(err);
      throw err; // ส่งข้อผิดพลาดไปยังผู้เรียกใช้งาน
    }
  };

  const LoadRoomName = async () => {
    console.log("LoadRoomName data...");
    
    axios
      .get("http://localhost:3001/ReadRoomNameUser")
      .then((res) => {
        SetRoomName(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const LoadData = async () => {
    console.log("Loading data...");
    setnamesuer([])
    await LoadRoomName();
    axios
      .get("http://localhost:3001/ReadHistoryUser", {
        params: { User_ID: User_id },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const LoadDataFromDate = async () => {
    console.log("Loading data...");
    setnamesuer([])
    await LoadRoomName();
    axios
      .get("http://localhost:3001/AmideReadHistoryFromDate", {
        params: { Date: selectedDate },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ตรวจสอบให้แน่ใจว่า User_id ไม่เปลี่ยนค่าโดยไม่จำเป็น
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      };
      const dateString = now.toLocaleDateString("th-TH", options);
      setDate(dateString);
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000 * 60 * 60);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const userIds = data.map((item) => item.User_ID);
        const userNamePromises = userIds.map((id) => SeachNameUser(id));
        const userNames = await Promise.all(userNamePromises);
        setnamesuer(userNames); // เก็บชื่อผู้ใช้ทั้งหมด
      } catch (err) {
        console.error(err);
      }
    };

    if (data.length > 0) fetchUserNames();
  }, [data]);

  return (
    <body className="bg-white overflow-x-hidden">
      <NavLogin />
      <div className="flex justify-center w-screen mt-2 h-[45px] font-bold">
        <div className="bg-[#e85234] text-white flex items-center justify-center w-[20%] font-sans">
          <h1>{date}</h1>
        </div>
      </div>

      <div className="flex justify-center w-screen mt-2 h-[80px] font-bold">
        <div className="bg-[#d698e9] text-white hover:bg-indigo-300 text-lg rounded-xl hover:border-4 hover:border-lime-900 flex items-center justify-center w-[50%] font-sans">
          <label
            htmlFor="date"
            className="mr-4 text-lg font-medium text-gray-700"
          >
            เลือกวันที่:
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
          />
          <p className="ml-4 text-gray-700">
            วันที่เลือก: {selectedDate || "ยังไม่ได้เลือก"}
          </p>
          <div
            onClick={LoadDataFromDate}
            className="px-4 py-3 cursor-pointer bg-amber-200 text-black rounded-xl ml-4 hover:bg-amber-100"
          >
            <button>ยืนยัน</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-screen mt-2 h-[80px] font-bold">
        <div className="bg-[#83bbe7] text-white hover:bg-indigo-300 text-lg rounded-xl hover:border-4 hover:border-lime-900 flex items-center justify-center w-[50%] font-sans">
          <label
            htmlFor="date"
            className="mr-4 text-lg font-medium text-gray-700"
          >
            กรอกรหัสประจำตัว
          </label>
          <input
            id="date"
            type="text"
            value={User_id}
            onChange={(e) => SetUser_ID(e.target.value)}
            className="px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
          />

          <div
            onClick={LoadData}
            className="px-4 py-3 cursor-pointer bg-lime-300 text-black rounded-xl ml-4 hover:bg-amber-100"
          >
            <button>ยืนยัน</button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-screen mt-2">
        <div className="bg-[#f2d7d3] text-center px-5 rounded-lg mt-2 h-[550px] w-[90%] mx-auto font-bold text-xl">
          <p className="text-[#e85234] my-5">ประวัติการจอง</p>
          <div className="flex justify-center w-full h-[400px]">
            <div className="bg-white shadow-md h-full overflow-y-auto">
              <table>
                <thead>
                  <tr className="bg-gray-200">
                    <th className="bg-red-300 text-left px-3 py-2">ครั้งที่</th>
                    <th className="bg-lime-200 text-left px-10 py-2">ไอดีผู้ใช้</th>
                    <th className="bg-lime-200 text-left px-20 py-2">ชื่อ</th>
                    <th className="bg-blue-200 text-left px-56 py-2">ห้อง</th>
                    <th className="bg-lime-200 text-left px-6 py-2">เวลา</th>
                    <th className="bg-lime-200 text-left px-6 py-2">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, i) => {
                      // ค้นหาชื่อห้องจาก Room_ID
                      const room = roomNames.find(
                        (it) => item.Room_ID === it.Room_ID
                      );
                      const shownamroom = room
                        ? room.Room_Name
                        : "Unknown Room";

                      const Showname = nameuser[i] || "ไม่พบข้อมูลผู้ใช้..."; // แสดงชื่อผู้ใช้

                      // จัดรูปแบบเวลา
                      const formatTime = (time) => {
                        if (!time) return "Invalid time"; // กรณีเวลาไม่ถูกต้อง
                        const [hour, minute] = time.split(":");
                        return `${hour}:${minute}`;
                      };

                      // ส่งผลลัพธ์แต่ละแถว
                      return (
                        <tr key={i} className="border-b">
                          <th className="text-left px-4 py-2 bg-gray-100">
                            {i + 1}
                          </th>
                          <td className="px-4 py-2">{item.User_ID}</td>
                          <td className="px-4 py-2">{Showname}</td>
                          <td className="px-4 py-2">{shownamroom}</td>
                          <td className="px-9 py-2">
                            {formatTime(item.Start_Time)} -{" "}
                            {formatTime(item.End_Time)}
                          </td>
                          <td className="px-9 py-2">{item.status}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default HistoryBooking;
