import { createContext, useContext, useState } from "react";

// สร้าง Context
const UserContext = createContext();

// สร้าง Hook เพื่อดึงค่าจาก UserContext
export const useUser = () => useContext(UserContext);

// Provider สำหรับ component อื่นๆ
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // ค่า username และฟังก์ชันตั้งค่า
  const [ourmember, setOurmember] = useState([
    {
      name: "apiwat",
      password: "65110977",
      img: "../../public/mariposa-member/rif2.jpg",
    },
    {
      name: "sukhatai",
      password: "65112429",
      img: "../../public/mariposa-member/cream2.jpg",
    },
    {
      name: "naruemon",
      password: "65112125",
      img: "../../public/mariposa-member/kae2.jpg",
    },
    {
      name: "bhumipat",
      password: "65111552",
      img: "../../public/mariposa-member/tew2.jpg",
    },
    {
      name: "piyathida",
      password: "65112193",
      img: "../../public/mariposa-member/fai2.jpg",
    },
    {
      name: "duanpen",
      password: "65111987",
      img: "../../public/mariposa-member/tam2.jpg",
    },
  ]);

  return (
    <UserContext.Provider value={{ username, setUsername, ourmember }}>
      {children}
    </UserContext.Provider>
  );
};
