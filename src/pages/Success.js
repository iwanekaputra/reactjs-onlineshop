import { Link } from "react-router-dom";

const Success = () => {
  return <div className="mt-4 text-center">
  <img src="assets/images/success.png" width={500}/>
  <h2 className="text-success mt-2">Sukses Pesan</h2>
  <p>Terima kasih Sudah Memesan!</p>
  <p>Pesananmu akan kami proses secepatnya!</p>
    <Link to={'/'} className="btn btn-primary">
    Kembali
    </Link>
</div>
}

export default Success;