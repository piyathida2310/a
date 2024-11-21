import NavLogin from "../../component/Nav/NavLogin";
import "./Booking.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [date, setDate] = useState("");
  const [User_id, SetUser_ID] = useState("U123");
  const [data, setData] = useState([]); // แก้ไขให้ data เป็น array
  const [roomNames, SetRoomName] = useState([]);

  const LoadRoomName = async () => {
    console.log("LoadRoomName data...");
    axios
      .get("http://localhost:3001/ReadRoomNameUser") // ปิดวงเล็บให้ถูกต้อง
      .then((res) => {
        SetRoomName(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err); // หากมีข้อผิดพลาดให้แสดง error
      });
  };

  const LoadData = async () => {
    console.log("Loading data...");
    await LoadRoomName();
    axios
      .get("http://localhost:3001/ReadHistoryUser", {
        params: { User_ID: User_id }, // ส่งข้อมูลใน query string
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    LoadData();
  }, [User_id]); // ตรวจสอบให้แน่ใจว่า User_id ไม่เปลี่ยนค่าโดยไม่จำเป็น
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

  return (
    <body className="bg-white">
      <NavLogin />
      <div className="flex justify-center w-screen mt-2 h-[30px] font-bold">
        <div className="bg-[#e85234] text-white flex items-center justify-center w-[15%] font-sans">
          <h1>{date}</h1>
        </div>
      </div>

      <div className="flex items-center justify-center w-screen mt-2">
        <div className="bg-[#f2d7d3] text-center mt-2 w-[70%] h-[550px] rounded-xl max-w-4xl mx-auto font-bold text-xl">
          
          <p className="text-[#e85234] my-5">ประวัติการจอง</p>
          <div className="flex justify-center w-full h-[400px]">
            <div className="bg-white shadow-md h-full overflow-y-auto">
              <table>
                <thead>
                  <tr className="bg-gray-200">
                    <th className="bg-red-300 text-left px-3 py-2">ครั้งที่</th>
                    <th className="bg-blue-200 text-left px-60 py-2">ห้อง</th>
                    <th className="bg-lime-200 text-left px-6 py-2">เวลา</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => {
                    // Find the room name based on Room_ID
                    const room = roomNames.find(
                      (it) => item.Room_ID === it.Room_ID
                    );
                    const shownamroom = room ? room.Room_Name : "Unknown Room";

                    // Format Start_Time and End_Time to hours and minutes
                    const formatTime = (time) => {
                      if (!time) return "Invalid time"; // Handle empty or invalid time
                      const [hour, minute] = time.split(":");
                      return `${hour}:${minute}`;
                    };

                    return (
                      <tr key={i} className="border-b">
                        <th className="text-left px-4 py-2 bg-gray-100">
                          {i + 1}
                        </th>
                        <td className="px-4 py-2">{shownamroom}</td>
                        <td className="px-9 py-2">
                          {formatTime(item.Start_Time)} -{" "}
                          {formatTime(item.End_Time)}
                        </td>
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

export default Booking;
