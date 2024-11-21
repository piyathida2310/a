import "./NavLogin.css";
import { Link, useParams, useNavigate } from "react-router-dom"; // เพิ่ม useParams และ useNavigate
import mainlogo from "../../assets/libarylogo.png";
import { MdOutlineExpandMore } from "react-icons/md";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { useUser } from "../../utils/UserContext";
import responImg from "../../assets/mariposalogo1.png";

const NavLogin = () => {
  const { lang } = useParams(); // ดึงค่าภาษาออกจาก URL
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { username, ourmember } = useUser(); // ดึง username จาก useUser
  const [isOpen, setIsOpen] = useState(false); // ใช้ useState ในการเก็บสถานะของเมนู

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let userImg = "https://www.w3schools.com/howto/img_avatar.png";
  // วนลูปเพื่อหารูปภาพของผู้ใช้งาน
  ourmember.forEach((member) => {
    if (member.name == username) {
      userImg = member.img;
    }
  });

  const navigate = useNavigate(); // สร้าง navigate สำหรับการนำทาง

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // เปลี่ยนภาษาโดยใช้ฟังก์ชัน changeLanguage
    navigate(`/${lng}${window.location.pathname.slice(3)}`); // เปลี่ยนภาษาที่ path เดิม
  };

  return (
    <div className="nav-log-con">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <nav>
          <div className="logo-con">
            <Link to={`/${lang}/room`}>
              <img className="main-logo" src={mainlogo} alt="main logo" />
              <img className="respon-nav-log-logo" src={responImg} />
            </Link>
          </div>
          <div
            className={`berger-navlog ${isOpen ? "change" : ""}`}
            onClick={toggleMenu}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className={isOpen ? 'DropdownMenu-con':'close'}>
            <div className="drop-con-navlog">
              <ul className={`ul-nav-log ${isOpen ? "show" : "close"}`}>
                <li className="li-nav-log">
                  <Link to={`/${lang}/room`} className="a-nav-log">
                    {i18n.t("Home")}
                  </Link>
                </li>
                <li className="li-nav-log">
                  <Link to={`/${lang}/about`} className="a-nav-log">
                    {i18n.t("About")}
                  </Link>
                </li>
                <li className="li-nav-log">
                  <Link to={`/${lang}/service`} className="a-nav-log">
                    {i18n.t("Service")}
                  </Link>
                </li>
                <li className="li-nav-log">
                  <Link to={`/${lang}/member`} className="a-nav-log">
                    {i18n.t("Member")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-con">
            <ul className="ul-nav-log">
              <li className="li-nav-log">
                <img className="userPic" src={userImg} alt={username} />
                <div className="user-con">
                  <p className="p-name">{username}</p>
                  <MdOutlineExpandMore className="expand" />
                </div>
              </li>
            </ul>
            <div className="lang-con">
              <a
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    changeLanguage("th");
                    setLoading(false);
                  }, 1000);
                }}
                className="lang-a"
              >
                ไทย
              </a>
              <a
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    changeLanguage("en");
                    setLoading(false);
                  }, 1000);
                }}
                className="lang-a"
              >
                ENG
              </a>
              <span className="just-span2">|</span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavLogin;
