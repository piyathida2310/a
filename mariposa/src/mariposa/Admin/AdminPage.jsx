import NavLogin from "../../component/Nav/NavLogin";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";

const AdminPage = () => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [User_id, SetUser_ID] = useState("U123");
  const [data, setData] = useState([]); // แก้ไขให้ data เป็น array
  const [roomNames, SetRoomName] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [nameuser, setnamesuer] = useState([]); // สำหรับเก็บชื่อผู้ใช้
  const [showTable,SetSHowtable] = useState(false);
  


  
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
    setnamesuer([]);
    await LoadRoomName();

    axios
      .get("http://localhost:3001/AdminSeachRoomWaiting_to_pay")
      .then((res) => {
        if(res.data.length > 0 ){
          SetSHowtable(true)
          setData(res.data);
          console.log(res.data);
        }
        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  
  const AdminAcceptRoom = async (Booking_ID) => {
    console.log("AdminAcceptRoom data...");
    console.log(Booking_ID)
    try {
      const res = await axios.put("http://localhost:3001/AdminAcceptRoom", {
        Booking_ID: Booking_ID, // ส่งข้อมูลใน body แทน
      });
  
     console.log(res)
     LoadData();
     window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  
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


  useEffect(() => {
    LoadData();
  }, [User_id]); // ตรวจสอบให้แน่ใจว่า User_id ไม่เปลี่ยนค่าโดยไม่จำเป็น
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    navigate(`/${lng}${window.location.pathname.slice(3)}`);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const day = currentDate.toLocaleString("default", { weekday: "long" });
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="AdminPage-con">
      <NavLogin />
      <div className="admin-con">
        <div className="admin-date-con">
          <div className="admin-date-now">
            <h2>
              {day} {date} {month} {year}
            </h2>
          </div>
        </div>
        {showTable ? (
  <section className="admin-sec">
    <div className="admin-title">
      <h1 className="admin-h1">จัดการการจอง</h1>
    </div>
    <div className="mian-admin">
      <div className="user-pay-con">
        <div className="user-pay-title">
          <h5>No</h5>
          <h5>Name</h5>
          <h5>Room</h5>
          <h5>Time</h5>
        </div>

        {data.length > 0 ? (
          data.map((item, i) => {
            const room = roomNames.find(
              (it) => item.Room_ID === it.Room_ID
            );
            const shownamroom = room ? room.Room_Name : "Unknown Room";
            const Showname = nameuser[i] || "ไม่พบข้อมูลผู้ใช้..."; // แสดงชื่อผู้ใช้
            const formatTime = (time) => {
              if (!time) return "Invalid time";
              const [hour, minute] = time.split(":");
              return `${hour}:${minute}`;
            };

            return (
              <div className="admin-table" key={i}>
                <div className="adnum">{i + 1}</div>
                <div className="aduse">{Showname}</div>{" "}
                <div className="adroom">{shownamroom}</div>
                <div className="adtime">
                  {formatTime(item.Start_Time)} - {formatTime(item.End_Time)}
                </div>
                <div className="ad-btn">
                  <button onClick={() => AdminAcceptRoom(item.Booking_ID)} className="acc-btn">
                    Accept
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>ไม่มีข้อมูลการจอง</div>
        )}
      </div>
    </div>
  </section>
) : (
  <div>ไม่มีข้อมูลการจอง...</div>
)}

      
        <div className="buttons-room">
          <button>
            <Link to={`/${lang}/gameroom`} className="linkroom">
              game
            </Link>{" "}
          </button>
          <button>
            <Link to={`/${lang}/conference`} className="linkroom">
              confrrence
            </Link>
          </button>
          <button>
            <Link to={`/${lang}/cinemaroom`} className="linkroom">
              cinema
            </Link> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
