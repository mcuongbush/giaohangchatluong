const  config = {
    user:  'sa', // sql user
    password:  '16021310', //sql user password
    server:  '171.239.244.179', // if it does not work try- localhost
    database:  'QuanLyGiaoHang',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  '171.239.244.179,1433'  // SQL Server instance name
    },
    port:  1433
  }
  
  module.exports = config;