// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama: '',
    nomorHp: ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Satu Data \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            // lanjutkan menu pilihanya disini secara urut
            simpan()
            break;
        case 2:
            lihatData()
            break;
        case 3:
            resetData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            hapusData()
            break;
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data !  ");
    readline.question("Nama :", (nama) => {
        if (!/^[A-Za-z\s]+$/.test(nama)) {
            console.log('Nama harus berupa string yang tidak boleh kosong');
            simpan();
        } else {
            objectKontak.nama = nama
            console.log(`Input data berhasil ! ${nama}`);
            ambilInputanNomor()
        };

    });

}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        objectKontak.nomorHp = nomor
        databaseKontak.push(Object.assign({}, objectKontak)) // insert data kedalam array databseKOntak
        kembali()
    })
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if (pilihan === "y") {
            viewMenu()
        } else {
            readline.close()
        }

    })
}

function lihatData() { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData() {
    // tambahkan fungsi reset  data disini
    console.log("Menghapus semua data kontak...");
    databaseKontak.length = 0; // Mengosongkan array databaseKontak
    console.log("Semua data kontak telah dihapus.");
    kembali();
}

function pencarianData() {
    // tambahkan fungsi pencarian data disini 
    readline.question("Masukkan nama yang ingin Anda cari: ", (namaCari) => {
        const hasilPencarian = databaseKontak.filter((kontak) => {
            return kontak.nama.toLowerCase().includes(namaCari.toLowerCase());
        });

        if (hasilPencarian.length > 0) {
            console.log("Hasil Pencarian:");
            console.table(hasilPencarian);
        } else {
            console.log("Kontak dengan nama tersebut tidak ditemukan.");
        }

        kembali();
    });
}




function hapusData() {
    // tambahkan fungsi hapus data data disini 
    if (databaseKontak.length === 0) {
        console.log("Tidak ada data kontak yang tersimpan.");
        kembali();
        return;
    }

    console.log("Daftar Data Kontak:");
    console.table(databaseKontak);

    readline.question("Masukkan indeks data yang ingin Anda hapus: ", (indeks) => {
        indeks = parseInt(indeks);

        if (indeks >= 0 && indeks < databaseKontak.length) {
            const dataYangDihapus = databaseKontak.splice(indeks, 1);
            console.log(`Data kontak dengan nama "${dataYangDihapus[0].nama}" telah dihapus.`);
        } else {
            console.log("Indeks data tidak valid.");
        }

        kembali();
    });
}




viewMenu() // panggil fungsi view menu untuk pertama kali
