const db = require("../connectDatabase/DatabaseSql");
const moment = require('moment'); // ใช้ moment.js เพื่อช่วยในการจัดการเวลาง่ายขึ้น


exports.AmideReadHistoryFromDate = async (req,res) =>{
    
    const Date = req.query.Date;
    try{
        await db.query(
                `SELECT * FROM booking WHERE Date = ? `,Date,
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



exports.AdminAcceptRoom = async (req,res) =>{

    const Booking_ID = req.body.Booking_ID;
    try{
        await db.query(
                `UPDATE booking 
                    SET status = ? 
                        WHERE Booking_ID = ?; `,["Confirm",Booking_ID],
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



exports.Paymentdeadlineexceeded = async (req,res) =>{

    const Booking_ID = req.body.Booking_ID;
    try{
        await db.query(
                `UPDATE booking 
                    SET status = ? 
                        WHERE Booking_ID = ?; `,["Payment deadline exceeded",Booking_ID],
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


exports.AdminUpdateCleaningRoom = async (req,res) =>{

    const Room_ID = req.body.Room_ID;
    try{
        await db.query(
                `UPDATE Rooms 
                    SET StatusRoom = ? 
                        WHERE Room_ID = ?; `,["Cleaning",Room_ID],
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

exports.AdminUpdateNotCleaningRoom = async (req,res) =>{
   
    const Room_ID = req.body.Room_ID;
    try{
        await db.query(
                `UPDATE Rooms 
                    SET StatusRoom = ? 
                        WHERE Room_ID = ?; `,["Not Cleaning",Room_ID],
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



exports.AdminReadUser = async (req,res) =>{

    
    const User_ID = req.query.User_ID;
    try{
        await db.query(
                `SELECT * FROM user WHERE User_ID = ? `,User_ID,
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




exports.AdminSeachRoomWaiting_to_pay = async (req,res) =>{
    x = 10
    const currentTime = moment(); 
    let i = 0;
    const EditstatusNotpaying = async(Booking_ID) =>{
    
    try{
        await db.query(
                `UPDATE Booking 
                    SET status = ? 
                        WHERE Booking_ID = ?;  `,["Not_paying",Booking_ID],
                        (err, result) => {
                            try {
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

    const CheckTime = async(result)=>{
        for (i = 0; i < result.length; i++)         {
                            
            const startTime = moment(result[i].Start_Time, "HH:mm");
            const diffInMinutes = currentTime.diff(startTime, 'minutes'); // คำนวณความต่างในนาที
            if (diffInMinutes > 15) {
                console.log(result[i].Booking_ID)
                EditstatusNotpaying(result[i].Booking_ID)
                console.log("เวลาปัจจุบันเกิน 15 นาทีจากเวลาเริ่ม");
            } else {
                console.log("เวลายังไม่เกิน 15 นาที");
            }
        }
        x = 20
       
    }

  
        try{
            await db.query(
                    `SELECT * FROM Booking WHERE status = ? `,"Waiting_to_paY",
                    (err, result) => {
                        
                        try {
                          let re =   CheckTime(result);
                          console.log("ddddddd",x)
                          if (x = 20) {
                            db.query(
                                'SELECT * FROM Booking WHERE status = ?',
                                'Waiting_to_pay', // ใช้ `?` แทนค่าคงที่
                                (err, results) => {
                                  if (err) {
                                    console.error('Query error:', err);
                                    
                                  }
                                  console.log('Query results:', results);
                                  res.send(result)
                                }
                              );
                        }
                      
                            
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
    
    


    






