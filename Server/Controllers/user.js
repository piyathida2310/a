const db = require("../connectDatabase/DatabaseSql");


exports.ReadHistoryUser = async (req,res) =>{
    const User_ID = req.query.User_ID;

    try{
        await db.query(
                `SELECT * FROM booking WHERE User_ID = ? `,User_ID,
                (err, result) => {
                    try {
                        res.send(result);
                        console.log(result)
                    } catch (err) {
                        console.log(err);
                    }
                }
            )
            }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error <read>");
    }

}


exports.ReadRoomNameUser = async (req,res) =>{
    try {
        // ดึงแค่ Room_ID และ NameRoom จากตาราง Rooms
        await db.query(
            `SELECT 	Room_ID, Room_Name FROM Rooms`, // เปลี่ยน SQL query เพื่อเลือกเฉพาะคอลัมน์ที่ต้องการ
            (err, result) => {
                if (err) {
                    // ถ้ามี error ในการ query
                    console.error(err);
                    return res.status(500).send("Database query error");
                }

                // ส่งข้อมูลที่ได้กลับไป
                res.send(result);
                console.log(result); // อาจจะลบออกหากไม่ต้องการให้แสดงใน console
            }
        );
    } catch (error) {
        // ถ้ามีข้อผิดพลาดที่เกิดขึ้นจาก try-catch
        console.log(error);
        res.status(500).send("Server Error <read>");
    }

}
