class NhanVien{
    constructor(MaNV,TenNV,NgaySinh,DiaChi,ChucVu,Bacluong,MaPB,SDT,GioiTinh, MaNK)
    {
        this.Bacluong=Bacluong;
        this.MaNK=MaNK;
        this.MaNV=MaNV;
        this.TenNV=TenNV;
        this.NgaySinh=NgaySinh
        this.ChucVu=ChucVu;
        this.DiaChi=DiaChi;
        this.MaPB=MaPB;
        this.SDT=SDT;
        this.GioiTinh=GioiTinh;
    }
}
module.exports = NhanVien;