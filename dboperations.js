var  config = require('./dbconfig');
const  sql = require('mssql');
const Axios = require("axios");


//========================get==================================================
async  function  getNhanVien() {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request().query("SELECT * from NhanVien");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getKhachHang() {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request().query("SELECT * from KhachHang");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getLoaiHH() {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request().query("SELECT * from LoaiHH");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }
  async  function  getLoaiVC() {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request().query("SELECT * from LoaiVanChuyen");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


  async  function  getTaiKhoanKH() {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request().query("SELECT * from TaiKhoanKH");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }




///====================================get with Params===================================================
  async  function  getHoaDon(MaKH) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
      .input('MaKH',sql.Char,MaKH).query("select  H.SoHD, NgayLapHD, H.TongTien, H.TrangThai \n"+
                        " from PhieuGuiHang P , HoaDonVanChuyen H \n"+
                        " where P.MaKH = @MaKH  and P.SoPGH = H.SoPGH and P.MaNV != 'NULL' ");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

 
  async  function  getKhachHangId(SDT) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
      .input('SDT',sql.Char,SDT).query("SELECT * from KhachHang where SDT = @SDT");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getKhachNhanId(SDT) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
      .input('SDT',sql.Char,SDT).query("SELECT * from KhachNhan where SDT = @SDT");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getKhachHangInf(MaKH) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
      .input('MaKH',sql.Char,MaKH).query("SELECT * from KhachHang where MaKH = @MaKH");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getNhanVienId(SDT) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
      .input('SDT',sql.Char,SDT).query("SELECT * from NhanVien where SDT = @SDT");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getPhieuGuiHang(MaKH) {
    try {
      let  pool = await  sql.connect(config);
      let  item = await  pool.request()
        .input('MaKH',sql.Char,MaKH)
        .query("SELECT * from PhieuGuiHang where MaKH = @MaKH and MaNV != 'NULL' ");
      return  item.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


  //========================add===============================================================
  async function addKhachHang(KhachHang)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('TenKH',sql.NVarChar, KhachHang.TenKH)
        .input('DiaChi',sql.NVarChar,KhachHang.DiaChi)
        .input('SDT',sql.Char,KhachHang.SDT)
        .input('GioiTinh',sql.Bit,KhachHang.GioiTinh)
        .query(`INSERT dbo.KhachHang ( MaKH, TenKH, SDT, DiaChi, GioiTinh ) VALUES ( DEFAULT , @TenKH , @SDT , @DiaChi , @GioiTinh )`);
      let result = await pool.request()
        .input('SDT',sql.Char,KhachHang.SDT)
        .query("SELECT * from KhachHang where SDT = @SDT");
        return result.recordsets;
    }
    catch (error)
    {
      console.log(error);
    }
  }



  async function addKhachNhan(KhachNhan)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('TenKN',sql.NVarChar, KhachNhan.TenKN)
        .input('DiaChi',sql.NVarChar,KhachNhan.DiaChi)
        .input('SDT',sql.Char,KhachNhan.SDT)
        .query(`INSERT dbo.khachNhan ( MaKN, TenKN, SDT, DiaChi ) VALUES ( DEFAULT , @TenKN , @SDT , @DiaChi )`);
      let result = await pool.request()
      .input('SDT',sql.Char,KhachNhan.SDT)
      .query("SELECT * from KhachNhan where SDT = @SDT ");
      return result.recordsets;
    }
    catch (error)
    {
      console.log(error);
    }
  }

  
  async function addTaiKhoanKH(TaiKhoanKH)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('TenTK',sql.VarChar, TaiKhoanKH.TenTK)
        .input('MatKHau',sql.NVarChar,TaiKhoanKH.MatKhau)
        .input('MaKH',sql.Char,TaiKhoanKH.MaKH)
        .query(`INSERT dbo.TaiKhoanKH ( TenTK , MatKhau , MaKH ) VALUES ( @TenTK , @MatKhau , @MaKH )`);
        let result = await pool.request()
        .input('MaKH',sql.Char,TaiKhoanKH.MaKH)
        .query("SELECT * from TaiKhoanKH where MaKH = @MaKH ");
        return result.recordsets;
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function addPhieuGuiHang(PhieuGuiHang)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('NgayGui',sql.Date, PhieuGuiHang.NgayGui)
        .input('COD',sql.Bit,PhieuGuiHang.COD)
        .input('MaKH',sql.Char,PhieuGuiHang.MaKH)
        .input('MaLVC',sql.Char,PhieuGuiHang.MaLVC)
        .input('MaKN',sql.Char,PhieuGuiHang.MaKN)
        .query(`INSERT dbo.PhieuGuiHang ( SoPGH , NgayGui, COD , MaKH, MaLVC, MaNV, MaKN ) VALUES ( DEFAULT, @NgayGui , @COD , @MaKH, @MaLVC, NULL, @MaKN )`);
        return item.recordsets;
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function addPhieuYeuCau(PhieuYeuCau)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('NgayLap',sql.Date, PhieuYeuCau.NgayLap)
        .input('MaKH',sql.Char, PhieuYeuCau.MaKH)
        .input('KhoiLuong',sql.Decimal(3,1), PhieuYeuCau.KhoiLuong)
        .input('MaKN',sql.Char, PhieuYeuCau.MaKN)
        .input('MaLVC',sql.Char, PhieuYeuCau.MaLVC)
        .input('ThanhToan',sql.BigInt, PhieuYeuCau.ThanhToan)
        .query(`INSERT dbo.PhieuYeuCau ( SoPYC , NgayLap, MaKH , KhoiLuong, MaKN, MaLVC, ThanhToan ) VALUES ( DEFAULT, @NgayLap , @MaKH , @KhoiLuong, @MaKN, @MaLVC, @ThanhToan )`);
      let result = await pool.request()
      .input('MaKH',sql.Char,PhieuYeuCau.MaKH)
      .input('NgayLap',sql.Date,PhieuYeuCau.NgayLap)
      .query("SELECT * from PhieuYeuCau where MaKH = @MaKH and NgayLap = @NgayLap")
      return result.recordsets;
    }
    catch (error)
    {
      console.log(error);
    }
  }

  //===============update===============
  async function updKhachHang(KhachHang)
  {
    try{
      let pool = await sql.connect(config);
      let item = await pool.request()
        .input('MaKH',sql.Char,KhachHang.MaKH)
        .input('TenKH',sql.NVarChar, KhachHang.TenKH)
        .input('DiaChi',sql.NVarChar,KhachHang.DiaChi)
        .input('SDT',sql.Char,KhachHang.SDT)
        .input('GioiTinh',sql.Bit,KhachHang.GioiTinh)
        .query(`UPDATE KhachHang SET TenKH = @TenKH, SDT = @SDT, DiaChi= @DiaChi, GioiTinh = @GioiTinh WHERE MaKH = @MaKH`);
      // let result = await pool.request()
      //   .input('SDT',sql.Char,KhachHang.SDT)
      //   .query("SELECT * from KhachHang where SDT = @SDT");
        return item.recordset;
    }
    catch (error)
    {
      console.log(error);
    }
  }







  //============================get distance=======================
  

async function getDistance (AddrFrom,AddrTo) {  


    var formattedAddrFrom = AddrFrom.replace(/ /g,'+');
    var formattedAddrTo = AddrTo.replace(/ /g,'+');
    var distance;
    // Google API key
    

    var dirFrom = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formattedAddrFrom + "&sensor=false&key="+ apiKey ;
    var dirTo ="https://maps.googleapis.com/maps/api/geocode/json?address="+formattedAddrTo+"&sensor=false&key="+apiKey ;

    var latitudeFrom;
    var longitudeFrom;
    var latitudeTo;
    var longitudeTo;
    const repoFrom = [
        {
          url: encodeURI(dirFrom)
        }
      ]
      const repoTo = [
        {
          url: encodeURI(dirTo)
        }
      ]
    const proFrom = repoFrom.map(async repo => {
        const response = await Axios({
            method: 'GET',
            url: repo.url
        })
        return {
            
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
        }
    })
    const proTo = repoTo.map(async repo => {
        const response = await Axios({
            method: 'GET',
            url: repo.url
        })
        return {
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
        }
    })
      // wait until all promises resolve
    await Promise.all(proFrom).then(results => {
        latitudeFrom=results[0].latitude;
        longitudeFrom=results[0].longitude;
    })
    await Promise.all(proTo).then(results => {
        latitudeTo=results[0].latitude;
        longitudeTo=results[0].longitude;
    }) 


    var theta    = longitudeFrom - longitudeTo;
    var dist    = Math.sin(deg2rad(latitudeFrom)) * Math.sin(deg2rad(latitudeTo)) +  Math.cos(deg2rad(latitudeFrom)) * Math.cos(deg2rad(latitudeTo)) * Math.cos(deg2rad(theta));
    var dist    = Math.acos(dist);
    var dist    = rad2deg(dist);
    var miles    = dist * 60 * 1.1515;
    
    distance=  Math.round(miles * 1.609344, 2);
    return distance;
}
function rad2deg(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
  function deg2rad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

  

  
  module.exports={
    getNhanVien:getNhanVien,
    getKhachHangId:getKhachHangId,
    getPhieuGuiHang:getPhieuGuiHang,
    getKhachHang:getKhachHang,
    addKhachHang:addKhachHang,
    addTaiKhoanKH:addTaiKhoanKH,
    addKhachNhan:addKhachNhan,
    getTaiKhoanKH:getTaiKhoanKH,
    getNhanVienId:getNhanVienId,
    getKhachHangInf:getKhachHangInf,
    getLoaiHH:getLoaiHH,
    getKhachNhanId:getKhachNhanId,
    addPhieuGuiHang:addPhieuGuiHang,
    getHoaDon:getHoaDon,
    getLoaiVC:getLoaiVC,
    addPhieuYeuCau:addPhieuYeuCau,
    updKhachHang:updKhachHang,
    getDistance:getDistance
  }
