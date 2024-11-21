const express = require('express');
const router = express.Router();

const {  ReadHistoryUser,ReadRoomNameUser }  = require("../Controllers/user")
const {  AmideReadHistoryFromDate,AdminAcceptRoom,Paymentdeadlineexceeded,AdminUpdateCleaningRoom
    ,AdminUpdateNotCleaningRoom,AdminReadUser,AdminSeachRoomWaiting_to_pay
 }  
= require("../Controllers/admin")

//user
router.get('/ReadHistoryUser',ReadHistoryUser)
router.get('/ReadRoomNameUser',ReadRoomNameUser)

//admin
router.get('/AmideReadHistoryFromDate',AmideReadHistoryFromDate)
router.get('/AdminReadUser',AdminReadUser)
router.get('/AdminSeachRoomWaiting_to_pay',AdminSeachRoomWaiting_to_pay)
router.put('/AdminAcceptRoom',AdminAcceptRoom)
router.put('/Paymentdeadlineexceeded',Paymentdeadlineexceeded)
router.put('/AdminUpdateCleaningRoom',AdminUpdateCleaningRoom)
router.put('/AdminUpdateNotCleaningRoom',AdminUpdateNotCleaningRoom)


module.exports = router;