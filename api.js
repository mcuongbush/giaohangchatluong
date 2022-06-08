const dboperations = require("./dboperations.js");
var DB = require("./dboperations.js");

var KhachHang=require("./KhachHang");
var NhanVien =require("./NhanVien");
var PhieuGuiHang=require("./PhieuGuiHang");


var express= require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request } = require("http");
const { response } = require("express");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
     console.log('middleware');
     next();
})


//GET

router.route('/khachhang').get((req,res)=>{
    dboperations.getKhachHang().then(result => {
        res.json(result[0]);
    })
});

router.route('/taikhoan').get((req,res)=>{
    dboperations.getTaiKhoanKH().then(result => {
        res.json(result[0]);
    })
});

router.route('/nhanvien').get((req,res)=>{
    dboperations.getNhanVien().then(result => {
        res.json(result[0]);
    })
});

router.route('/loaihh').get((req,res)=>{
    dboperations.getLoaiHH().then(result => {
        res.json(result[0]);
    })
});

router.route('/loaivc').get((req,res)=>{
    dboperations.getLoaiVC().then(result => {
        res.json(result[0]);
    })
});

//GET with ID
router.route('/khachhang/:SDT').get((req,res)=>{
    dboperations.getKhachHangId(req.params.SDT).then(result => {
        res.json(result[0]);
    })
});

router.route('/khachnhan/:SDT').get((req,res)=>{
    dboperations.getKhachNhanId(req.params.SDT).then(result => {
        res.json(result[0]);
    })
});

router.route('/ttkhachhang/:MaKH').get((req,res)=>{
    dboperations.getKhachHangInf(req.params.MaKH).then(result => {
        res.json(result[0]);
    })
});

router.route('/nhanvien/:SDT').get((req,res)=>{
    dboperations.getNhanVienId(req.params.SDT).then(result => {
        res.json(result[0]);
    })
});


router.route('/hoadon/:MaKH').get((req,res)=>{
    dboperations.getHoaDon(req.params.MaKH).then(result => {  
        res.json(result[0]);
    })
});

router.route('/phieuguihang/:MaKH').get((req,res)=>{
    dboperations.getPhieuGuiHang(req.params.MaKH).then(result => {  
        res.json(result[0]);
    })
});

//POST
router.route('/taikhoan').put((req,res)=>{
    let item = {...req.body}
    dboperations.addTaiKhoanKH(item).then(result => {
        res.json(result[0]);
    })
});

router.route('/khachhang').post((req,res)=>{
    let item = {...req.body}
    dboperations.addKhachHang(item).then(result => {
        res.json(result[0]);
    })
});



router.route('/khachnhan').post((req,res)=>{
    let item = {...req.body}
    dboperations.addKhachNhan(item).then(result => {
        res.json(result[0]);
    })
});


router.route('/phieuguihang').put((req,res)=>{
    let item = {...req.body}
    dboperations.addPhieuGuiHang(item).then(result => {
        res.status(201).json(result);
    })
});



var  port = process.env.PORT || 8090
;
app.listen(port);
console.log('API is runnning at ' + port);

