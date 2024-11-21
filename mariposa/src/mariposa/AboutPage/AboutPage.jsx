import Nav from "../../component/Nav/Nav";
import "./AboutPage.css";
import logo2 from "../../assets/mariposalogo2.png";
import { useState } from "react";
import { Link ,useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams(); // ดึงค่าภาษาออกจาก URL
  const [member, setMember] = useState([
    {
      fullName: `นายอภิวัฒน์ ลานทอง`,
      Name:`นายอภิวัฒน์`,
      LastName:`ลานทอง`,
      duty: `เอวี่ติง 🥴.`,
      imgSm: "../../../public/mariposa-member/rif2.jpg",
      imgLg: "../../../public/mariposa-member/rif2.jpg",
    },
    {
      fullName: "นางสาวนฤมล สีละมุด",
      Name:"นางสาวนฤมล",
      LastName:"สีละมุด",
      duty: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam iste modi atque distinctio commodi ducimus.",
      imgSm: "../../../public/mariposa-member/kae2.jpg",
      imgLg: "../../../public/mariposa-member/kae2.jpg",
    },
    {
      fullName: "นางสาวสุขหทัย พลยะเรศ",
      Name:"นางสาวสุขหทัย",
      LastName:"พลยะเรศ",
      duty: "รับผิดชอบและดูแลระบบหน้า Game Room รวมถึงจัดการการเปลี่ยนภาษาบนหน้าของตนเองที่รับผิดชอบ และกำหนดเงื่อนไขการจองห้อง.",
      imgSm: "../../../public/mariposa-member/cream2.jpg",
      imgLg: "../../../public/mariposa-member/cream2.jpg",
    },
    {
      fullName: "นางสาวเดือนเพ็ญ โฉมฉาย",
      Name:"นางสาวเดือนเพ็ญ",
      LastName:"โฉมฉาย",
      duty: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam iste modi atque distinctio commodi ducimus.",
      imgSm: "../../../public/mariposa-member/tam2.jpg",
      imgLg: "../../../public/mariposa-member/tam2.jpg",
    },
    {
      fullName: "นางสาวปิยธิดา อันชม",
      Name:"นางสาวปิยธิดา",
      LastName:"อันชม",
      duty: "ดูแลระบบหน้า conference จะมีการจองและเห็นว่าใครจองบ้าง และ booking ดูแลระบบหลังจองจะมีประวัติการจองของผู้ใช้.",
      imgSm: "../../../public/mariposa-member/fai2.jpg",
      imgLg: "../../../public/mariposa-member/fai2.jpg",
    },
    {
      fullName: "นายภูมิพัฒน์ เวฬุฬฐ์วรรณราช",
      Name:"นายภูมิพัฒน์",
      LastName:"เวฬุฬฐ์วรรณราช",
      duty: "รับผิดชอบในส่วนของหน้า Service ทั้งหมดและในหน้า Service ยังประกอบไปด้วย ลิงก์ที่เชื่อมต่อไปยังหน้า Servicefee และ Floorplan รวมทั้งยังออกแบบหน้าตาของเว็บไซต์โดยรวมร่วมกับคณะผู้จัดทำ.",
      imgSm: "../../../public/mariposa-member/tew2.jpg",
      imgLg: "../../../public/mariposa-member/tew2.jpg",
    },
  ]);

  return (
    <div className="about-page-con">
      <Nav />
      <div className="about-con">
        <div className="aboutPage-logo-con">
          <img className="about-page-logo" src={logo2} />
        </div>
        <div className="about-uni-name">
          <h2 className="name-uni-aboutPage">
            {t("Library")}
            <br />
            {t("mariposaU")}
          </h2>
        </div>
        <div className="aboutPage-content-con">
          <p className="aboutPage-text">
            {t('aboutpage-text-1')} <br /> {t('aboutpage-text-2')} <br /> {t('aboutpage-text-3')}
            <br /> {t('aboutpage-text-4')}
          </p>
        </div>
      </div>
      <div className="memmer-con">
        <h4 className="h4-about">{t('aboutpage-production-team')}</h4>
        <div className="member">
          {member.map((member, index) => {
            return (
              <div className="member-card" key={index}>
                <Link to={`/${lang}/about/member`} state={{ member }}>
                  <img
                    className="member-about-img"
                    src={member.imgSm}
                    alt={member.fullName}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
