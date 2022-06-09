const  config = {
    user:  'sa', // sql user
    password:  '123', //sql user password
    server:  '127.0.0.1', // if it does not work try- localhost  Khi public database thi day la dia chi ip server
    database:  'QuanLyGiaoHang', //Database name
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'NMC\NMC'  // SQL Server instance name
    },
    port:  1433  //port connect Database
  }
  
  module.exports = config;