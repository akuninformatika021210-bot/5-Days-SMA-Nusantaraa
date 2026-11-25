(()=>{'use strict';
const $=i=>document.getElementById(i),pick=a=>a[Math.random()*a.length|0],cl=(n,a=0,b=100)=>Math.max(a,Math.min(b,n)),d20=()=>1+Math.random()*20|0;
const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const SL=['Pagi','Pelajaran','Istirahat','Siang','Pulang'],WX=['Cerah','Mendung','Gerimis','Berangin'];
function planDay(){const n=2+(Math.random()*4|0),mid=[1,2,3,4].sort(()=>Math.random()-.5).slice(0,n-1).sort((a,b)=>a-b);S.timeline=[0,...mid];S.limit=S.timeline.length;S.eventGoal=1+(Math.random()*Math.min(3,S.limit)|0);S.dayEvents=0}
const LB={h:'Stamina',m:'Mental',i:'Pintar',r:'Aturan',s:'Sosial'};
const ST=[['h','❤️','#ef5b6b'],['m','🧠','#9b7cf0'],['i','📚','#3fa7e8'],['r','⚖️','#e8a317'],['s','🤝','#2bb673']];
const IT={ponsel:'📱',contekan:'📝',komik:'📖',surat:'📄'};
const LN={g:'Gerbang',k:'Kelas',c:'Kantin',b:'Ruang BK',l:'Lapangan',p:'Perpustakaan',t:'Taman Belakang'};
const ZL=['g','k','c','b','l','p','t'];
const PLACE={gerbang:'g',kelas:'k',kantin:'c',bk:'b','ruang bk':'b',lapangan:'l',perpus:'p',taman:'t'};
const LOVE=['dina','siska','arga','naya'];
const NP={
ratna:{n:'Bu Ratna',e:'👩‍🏫',lk:{belajar:2,maaf:1,bantu:1,nyontek:-3,bolos:-3,bohong:-2,sogok:-3,canda:-1},cp:['Disiplin itu kunci.','Ibu percaya padamu.']},
budi:{n:'Pak Budi',e:'🧔',lk:{maaf:2,belajar:1,curhat:1,bolos:-3,nyontek:-3,sogok:-4,bohong:-2,berantem:-3,canda:-1},cp:['Saya mengawasi.','Aturan tetap aturan.']},
raka:{n:'Raka',e:'😏',lk:{canda:2,bolos:2,nyontek:1,ajak:1,gosip:1,belajar:-1},cp:['Santai, bro.','Gas aja lah!']},
siska:{n:'Siska',e:'📋',lk:{bantu:2,belajar:1,ajak:1,bolos:-3,nyontek:-3,gosip:-2},cp:['Ayo kerja yang rapi.','Jangan lupa jadwal.']},
yanti:{n:'Mbak Yanti',e:'👩‍🍳',lk:{hadiah:1,bantu:2,canda:1,minta:-2,bohong:-2},cp:['Makan dulu, Nak.','Utang itu dicatat, lho.']},
dina:{n:'Dina',e:'🌼',lk:{puji:1,curhat:2,belajar:1,hadiah:2,ajak:1,gosip:-1,berantem:-3},cp:['Hehe, iya.','Aku senang ngobrol sama kamu.']},
arga:{n:'Kak Arga',e:'🏀',lk:{ajak:1,canda:1,bantu:1,puji:1,berantem:-1},cp:['Yuk main!','Santai aja.']},
naya:{n:'Naya',e:'🎨',lk:{curhat:1,puji:2,hadiah:2,ajak:1,gosip:-2},cp:['Eh… iya.','Aku ***** menggambar.']}
};
const PR={k:['ratna','raka','naya','dina'],c:['yanti','dina','arga','raka'],b:['budi'],l:['siska','arga','raka'],p:['ratna','dina','naya'],t:['raka','naya','siska'],g:['arga','siska']};
const parse=s=>s.trim().split('\n').map(l=>{const p=l.split('|');return{l:p[0],c:p[1],t:p[2],ch:p.slice(3).map(x=>x.split('~'))}});
// loc|syarat|teks|pilihan~efek|...   efek: h m i r s (stat) c (uang ribuan) nama+n (hubungan) #tag ^item _item @pacar
const EV=parse(`k||Bu Ratna mengumumkan kuis dadakan. Kelas langsung riuh.|Kerjakan dengan tenang~i+4 m-2 ratna+1|Intip jawaban sebelah~i+5 r-6 #nyontek ratna-1|Pura-pura sakit perut~h+3 r-3 #nakal
k||Pensil Raka patah dan ia menatapmu memelas.|Pinjamkan pensilmu~raka+3 s+1|Minta uang sewa~raka-1 c+1|Pura-pura tidak lihat~raka-2
k|d>2|Tugas kelompok! Bu Ratna menunjuk pasanganmu secara acak.|Bagi tugas adil~i+3 s+2 ratna+1|Kerjakan sendiri semuanya~i+4 h-5 m-2|Titip ke teman~h+2 r-2 #nakal
k|dina>4|Dina menaruh sebungkus permen di mejamu tanpa penjelasan.|Ucapkan terima kasih~dina+3 m+3|Tanya maksudnya~dina+1 s+1|Bagikan ke Raka~raka+2 dina-2
k||Guru terlambat dan kelas gaduh. Papan tulis penuh coretan iseng.|Ikut mencoret~m+4 r-4 raka+2|Hapus papan tulis~r+3 ratna+2|Baca buku saja~i+2 #belajar
k|d>3|Murid pindahan bernama Naya duduk di sebelahmu. Ia tampak gugup.|Sapa dan kenalkan sekolah~naya+4 s+2|Tawarkan catatan~naya+3 i+1|Biarkan dulu~naya-1
k|t_nyontek>1|Bu Ratna menemukan dua jawaban yang sangat mirip dan menatap seisi kelas.|Mengaku jujur~r-2 ratna+2 #jujur m-3|Diam dan berharap aman~m-4 ratna-1|Tuduh teman lain~r-6 s-4 #nakal
k|r<45|Bu Ratna membahas catatan kedisiplinanmu di depan kelas.|Janji berubah~r+5 ratna+2 #jujur|Membantah~r-4 ratna-3 m-2|Menunduk diam~m-3
k|d>4|Pemilihan ketua kelas! Namamu dicalonkan seseorang.|Terima pencalonan~s+4 m-2 #osis|Tolak halus~m+2|Calonkan Raka~raka+3 s+1
k|siska>5|Siska membawa formulir OSIS dan mencarimu.|Daftar sukarelawan~s+3 h-3 siska+3 #osis|Tanya tugasnya dulu~i+1 siska+1|Tolak, bilang sibuk~siska-2
k||Bu Ratna: ujian lisan sekarang atau PR ekstra?|Ujian lisan~i+4 m-3|PR ekstra~i+2 h-3|Tawar-menawar~s+2 ratna-1
k|h<40|Matamu hampir terpejam di tengah pelajaran.|Cuci muka~h+4 m+1|Tidur sebentar~h+8 r-3 ratna-1|Minta izin ke UKS~h+10 #jujur
k|dina>9|Dina mengembalikan bukumu dengan catatan kecil terselip di dalamnya.|Balas catatannya~dina+4 m+4|Pura-pura tidak lihat~dina-2|Tunjukkan ke Raka~raka+2 dina-3 #gosip
k|d>2|Raka menerbangkan pesawat kertas dari lembar soal ke arah guru.|Cegah Raka~r+3 raka-1|Ikut tertawa~m+3 r-3 raka+3|Ambil kesalahannya~raka+4 r-4 ratna-1 #bantu
k|c>20|Teman-teman patungan membeli kado untuk Bu Ratna dan menunggumu.|Patungan 10rb~c-10 s+3 ratna+2 #dermawan|Patungan 5rb~c-5 s+1|Menghindar~s-3
k|c<5|Uang kas kelas hilang dan semua mata mulai curiga.|Bantu mencari~s+3 ratna+1 #bantu|Cari kambing hitam~s-3 r-3|Diam saja~m-2
k||Kamu menemukan surat tanpa nama di dalam lacimu.|Baca di tempat~m+4 s+1|Simpan diam-diam~m+2|Serahkan ke Bu Ratna~r+2 ratna+1 #jujur
k|d>1|Seseorang meninggalkan contekan rumus di mejamu.|Simpan~^contekan r-1|Buang~r+2|Kembalikan ke pemiliknya~s+2 #jujur
c||Antrean kantin panjang dan adik kelas menyerobot di depanmu.|Tegur dengan sopan~r+2 s+1|Biarkan saja~m-1|Serobot balik~r-4 m+2 #nakal
c||Mbak Yanti butuh juri cicip menu baru.|Beri nilai jujur~yanti+3 h+6 #jujur|Puji berlebihan~yanti+1 h+6|Minta porsi gratis~yanti-2 h+8
c|c<6|Uangmu menipis dan perut keroncongan.|Bantu cuci piring~c+7 h-4 yanti+3 #kerja|Ngutang dulu~h+8 yanti-2 #utang|Minum air putih~h+2 m-1
c|t_utang>0|Mbak Yanti menagih utangmu dengan suara cukup keras.|Bayar 5rb sekarang~c-5 yanti+3 #jujur|Minta waktu~yanti-1 m-2|Menghilang~yanti-4 r-2 #nakal
c|arga>3|Kak Arga duduk di mejamu dan menawarkan gorengan.|Terima dan ngobrol~arga+4 s+2|Tanya soal basket~arga+3|Menolak canggung~arga-1 m-1
c|dina>6|Dina memilih minuman sendirian dan tersenyum melihatmu.|Traktir es teh~c-4 dina+4 m+3|Ajak duduk bersama~dina+3 s+2|Sapa lalu pergi~dina+1
c||Raka memesan terlalu banyak dan berharap kamu menanggung.|Bayar setengah~c-5 raka+3|Tolak sambil bercanda~raka+1|Pura-pura dompet kosong~raka-2
c||Kantin mati lampu dan seluruh sekolah bersorak.|Ikut berteriak~m+4 r-1|Bantu Mbak Yanti pegang senter~yanti+3 #bantu|Main tebak-tebakan~s+3 m+2
c|siska>4|Siska menggalang dana di kantin dan kotaknya hampir kosong.|Donasi 5rb~c-5 siska+3 #dermawan|Bantu bikin poster~siska+3 h-3 #osis|Lewat saja~siska-1
c|d>2|Adik kelas menangis karena dompetnya hilang.|Beri 5rb~c-5 s+3 #dermawan|Temani mencari dompetnya~s+2 h-2 #bantu|Cuek~s-2 m-2
c|naya>4|Naya makan sendirian dan ragu apakah boleh duduk bersamamu.|Ajak duduk bareng~naya+4 s+2|Bagi bekalmu~naya+3 #dermawan|Sapa lalu pergi~naya+0
c||Lomba makan kerupuk dadakan antar-meja!|Ikut lomba~m+4 h+4 s+2|Jadi supporter~s+2 raka+1|Jadi juri~r+1
c|d>3|Seorang siswa jajan saat jam pelajaran dan memohon agar kamu tidak lapor.|Janji tutup mulut~s+2 r-2|Laporkan ke Pak Budi~r+3 budi+2 s-3|Ikut jajan~h+6 r-4 #bolos
b||Pak Budi mengajakmu ngobrol soal cita-cita.|Jawab serius~m+3 i+1 budi+3|Jawab asal-asalan~r-1 budi-1|Tanya balik soal karirnya~budi+2 s+1
b|t_ketahuan>0|Pak Budi memanggilmu karena ada laporan tentang kelakuanmu.|Akui semuanya~r+2 budi+3 #jujur m-2|Beri alasan~r-1 budi-2|Salahkan orang lain~r-5 budi-4 #nakal
b|m<45|Pak Budi menawarkan sesi curhat karena kamu tampak lesu.|Cerita jujur~m+9 budi+3 #curhat|Bilang baik-baik saja~m-1|Minta tips atur waktu~i+2 m+4 budi+2
b|d>3|Formulir peminatan harus diisi hari ini.|Isi serius~i+3 budi+2|Isi asal~r-1|Ajak Dina mengisi bersama~dina+3 i+1
b|t_berantem>0|Pak Budi menggelar mediasi setelah keributan kemarin.|Minta maaf tulus~r+5 s+2 #jujur budi+3|Menyalahkan pihak lain~r-4 budi-3|Diam saja~m-3
b|r>85|Pak Budi menawarimu masuk tim ketertiban siswa.|Terima~r+2 s+2 budi+4 #osis|Tolak sopan~budi+1|Tanya imbalannya~budi-1 c+3
b|dina>8|Dina datang ke ruang BK dengan wajah bingung dan meminta ditemani.|Temani dan dengarkan~dina+5 m-2 #curhat|Antar lalu pergi~dina+1|Bilang kamu sibuk~dina-3
b||Seorang siswa menangis di depan ruang BK saat Pak Budi keluar.|Tenangkan dia~s+3 m-2 #bantu|Panggilkan Pak Budi~s+2 budi+2|Lewat saja~m-1 s-2
l||Tim basket kurang satu pemain. Raka melambai padamu.|Ikut main total~h-8 m+4 s+3 raka+3 #olahraga|Jadi wasit adil~r+2 s+2|Tolak, stamina tipis~m+1
l|arga>3|Kak Arga mengajakmu latihan lemparan bebas.|Ikut berlatih~h-5 arga+4 #olahraga s+2|Minta diajari trik~arga+3 i+1|Menolak malu~arga-1
l|d>2|Pertandingan antarkelas dimulai dan kelasmu kekurangan pemain.|Maju sebagai pemain~h-7 s+4 #olahraga|Jadi kapten tim~s+5 h-5 siska+2|Teriakkan semangat~s+2 m+2
l||Gerimis turun tiba-tiba. Semua berlarian mencari tempat berteduh.|Berbagi payung~s+3 #bantu|Hujan-hujanan~m+5 h-4|Lari ke kelas~r+1
l|d>3|Lomba estafet dimulai dan Siska mencari pelari terakhir.|Jadi pelari terakhir~h-6 s+4 siska+4 #olahraga|Bantu catat waktu~siska+2 i+1|Menolak~siska-1
l|dina>7|Dina menonton dari tribun dan melambai padamu.|Pamer gaya main~h-4 dina+3 s+2|Lambaikan balik~dina+3 m+2|Pura-pura tidak lihat~dina-2
l||Bola nyasar mengenai kepala Pak Budi. Semua menoleh padamu.|Akui dan minta maaf~r+1 budi+2 #jujur|Tuding Raka~raka-4 s-2 #nakal|Kabur~r-5 budi-3 #nakal
l|h>70|Guru olahraga menantang siswa lari sepuluh putaran.|Terima tantangan~h-10 m+4 s+3 #olahraga|Lari santai~h-4 m+1|Pura-pura keseleo~r-3 h+3 #nakal
p||Perpustakaan hening. Kamu menemukan buku catatan tua penuh corat-coret misterius.|Baca semuanya~i+4 m+1 #belajar|Serahkan ke petugas~r+2 #jujur|Bawa pulang diam-diam~i+2 r-3 ^contekan
p|dina>3|Dina duduk di dekat jendela dan menepuk kursi kosong di sebelahnya.|Duduk dan belajar bareng~i+3 dina+4 m+2 #belajar|Tanya buku favoritnya~dina+3 m+2|Bilang akan balik nanti~dina-1
p|d>3|Ujian dekat dan hanya tersisa satu kursi. Seseorang mengincarnya juga.|Mengalah~s+2 r+1|Rebut cepat~i+3 s-3|Bagi meja~s+3 i+2 #bantu
p|naya>3|Naya kesulitan mengambil buku seni di rak tinggi.|Ambilkan bukunya~naya+4 s+1|Tawarkan tangga~naya+3|Lewat saja~naya-1
p||Petugas memintamu menjaga meja sebentar.|Terima dan rapikan buku~r+3 i+1 ratna+1|Sambil baca komik~m+4 ^komik|Menolak~r-1
p|i<30|Bu Ratna menyodorkan buku latihan soal remedial.|Kerjakan sungguh~i+6 h-4 ratna+2 #belajar|Minta Dina membantu~dina+2 i+3|Pura-pura lupa~r-2 ratna-2
t||Kamu menemukan taman kecil terawat di balik pagar.|Siram tanamannya~m+4 s+1|Duduk menikmati sepi~m+6 h+4|Foto dan pamer~s+2 #gosip
t|naya>5|Naya melukis di bawah pohon dan memintamu jadi model.|Jadi model~naya+5 m+3|Beri saran warna~naya+3 i+1|Menolak malu~naya-2
t|d>2|Raka menawarkan ide bolos sejam ke warnet.|Ikut Raka~m+6 r-12 raka+4 #bolos|Tolak, ajak makan nanti~r+2 raka+1|Ajak Raka kembali ke kelas~r+3 #jujur
t|dina>10|Dina mengajakmu duduk di bangku taman setelah jam pulang.|Duduk dekat dia~dina+5 m+5|Duduk berjarak~dina+2|Ajak dia jalan~dina+4 s+2
t||Dua kelompok siswa saling berhadapan. Suasana makin panas.|Panggil guru~r+4 s+2 budi+2|Jadi penengah~s+4 m-3 #bantu|Ikut membela kelompokmu~r-12 h-8 #berantem
t||Sebuah ponsel tergeletak dengan pesan masuk menyala.|Serahkan ke guru~r+3 #jujur|Cari pemiliknya~s+2 #bantu|Jual diam-diam~c+8 r-6 #nakal
t|siska>6|Siska panik mencari map proposal OSIS yang tertinggal di taman.|Bantu mencari~siska+5 h-3 #bantu|Hubungi pengurus lain~siska+3 i+1|Bilang buru-buru~siska-2
g||Bel hampir berbunyi dan satpam mulai menutup gerbang.|Lari sprint~h-4 r+1|Rayu satpam~r-2 s+2|Lewat gerbang samping~r-5 #nakal
g|d>2|Seorang siswa dihukum berdiri di gerbang karena terlambat.|Beri semangat~s+2 #bantu|Foto untuk gosip~s+1 r-1 #gosip|Pura-pura tak lihat~m-1
g|arga>6|Kak Arga menawarkan boncengan pulang.|Terima~arga+5 s+3|Tolak sopan~arga+1|Ajak Raka sekalian~raka+2 arga+2
g|dina>12|Dina menunggumu di gerbang membawa payung.|Pulang berdua~dina+6 m+5|Pinjamkan jaketmu~dina+4 h-2|Lari menembus hujan~h-4 dina-1
g||Penjual cilok keliling mangkal di depan gerbang.|Beli 5rb~c-5 h+8|Traktir teman~c-5 s+3 #dermawan|Abaikan~m+1
g|siska>7|Siska memintamu menemaninya mengantar proposal.|Bawakan berkas~siska+5 s+2 #osis|Temani sebentar~siska+3|Bilang ada janji lain~siska-2
*|d>2|Gosip menyebar: ada yang diam-diam menyukaimu.|Cari tahu sumbernya~s+2 m-2|Cuek~m+2|Manfaatkan untuk pamer~s+3 r-2 #gosip
*|t_pacar>0|Gosip hubunganmu menyebar dan orang-orang bertanya.|Akui dengan bangga~s+4 m+3|Elak sambil bercanda~s+1|Marahi penyebar gosip~r-3 s-2
*||Listrik padam dan sekolah mendadak santai.|Main kartu bareng Raka~raka+3 m+4|Belajar pakai senter~i+3 #belajar|Tidur~h+8
*|d>3|Lomba kebersihan kelas dengan hadiah uang jajan.|Pimpin kerja bakti~s+4 h-5 c+5 #osis|Ikut membantu~h-3 c+3 #bantu|Kabur dari tugas~r-3 #nakal
*|d>4|Rumor beredar: pensi sekolah digelar akhir pekan.|Daftar tampil~s+5 m+3|Jadi panitia~h-4 s+3 #osis|Jadi penonton~m+2
*|c>25|Teman menawarkan jual-beli barang bekas dengan untung besar.|Ikut modal 10rb~c-10 i+1|Tolak, takut rugi~m+1|Laporkan ke guru~r+2 budi+1
*||Cek kesehatan siswa dadakan di UKS.|Ikuti dengan tertib~r+2 h+3|Menyelinap pergi~r-3 #bolos|Bantu petugas UKS~s+3 #bantu
*|s>50|Kamu diminta menjadi MC acara kecil.|Terima~s+5 m-2|Cari alasan~m+1|Oper ke Dina~dina+2
*|dina>13,siska>8|Dina dan Siska menghampirimu bersamaan. Suasana canggung.|Bicara dengan Dina~dina+4 siska-4|Bicara dengan Siska~siska+4 dina-4|Bagi waktu adil~s+3 m-4
*|arga>8,dina>8|Kak Arga dan Dina sama-sama menunggu jawabanmu atas ajakan masing-masing.|Pilih Dina~dina+5 arga-4|Pilih Kak Arga~arga+5 dina-4|Bilang butuh waktu~m-3 s+1
*|naya>8|Naya menyelipkan kartu kecil bertuliskan terima kasih.|Balas dengan gambar kecil~naya+5 m+4|Tunjukkan ke teman~naya-3 #gosip|Simpan di tas~naya+2 m+3
*|r>70,d>3|Bu Ratna menunjukmu mewakili kelas ke cerdas cermat.|Terima dan latihan~i+5 h-4 ratna+3 #belajar|Tolak halus~m+2|Ajak Dina jadi partner~dina+3 i+3
*|h<30|Tubuhmu lemas dan kepalamu berat.|Istirahat di UKS~h+12 m+3|Paksakan masuk kelas~h-3 i+2|Minta dijemput~h+10 r-2
*|d>4|Kelasmu masuk nominasi kelas terbaik jika nilai naik.|Ajak belajar bersama~i+3 s+3 #belajar|Kerjakan tugas teman~i+2 r-2|Biarkan saja~m+1
*|raka>12|Raka mengaku ada masalah di rumah dan butuh didengar.|Dengarkan sampai habis~raka+5 m-2 #curhat|Ajak ke kantin~raka+3 c-3|Bilang kamu sibuk~raka-4
*|siska>10|Siska bertanya terus terang soal perasaanmu padanya.|Jujur ada rasa~@siska siska+4 m+5|Bilang hanya teman~siska-2|Pura-pura tidak paham~siska-1 m-1
*|dina>8|Dina menitipkan pesan lewat Raka: ia ingin bicara berdua.|Temui Dina~dina+4 m+3|Pura-pura lupa~dina-3|Ajak Raka menemani~dina+1 raka+1
*|dina>15|Dina mengajakmu menonton pensi bersama. Rasanya seperti kencan.|Terima senang hati~dina+6 m+6|Tanya apakah ini kencan~dina+4 s+2|Tolak karena sibuk~dina-4
*|arga>10|Kak Arga mengaku sering memperhatikanmu dari lapangan.|Balas perasaannya~@arga arga+4 m+4|Bilang butuh waktu~arga+1|Tolak halus~arga-3
*|naya>10|Naya menunjukkan lukisan dirimu yang diam-diam ia kerjakan.|Berterima kasih hangat~@naya naya+4 m+5|Puji karyanya~naya+4 i+1|Minta lukisannya~naya+3
*|siska>12|Siska mengajak rapat berdua sepulang sekolah dan tampak gugup.|Datang tepat waktu~siska+5 s+2|Datang terlambat~siska-3|Bawa camilan~siska+4 c-3
*|t_nakal>1|Surat panggilan orang tua dikirim ke rumahmu.|Jelaskan jujur~r+4 m-4 #jujur|Cegat suratnya~r-4 #nakal|Minta Bu Ratna membantu~ratna+2 r+2
*|t_ketahuan>1,d>3|Pak Budi mencatatmu sebagai siswa dalam pengawasan.|Minta kesempatan kedua~r+4 budi+2|Protes~r-2 budi-3|Pasrah~m-3
*|t_dermawan>0|Adik kelas yang pernah kamu bantu membawakan kue.|Bagi ke teman~s+4 raka+1|Makan sendiri~h+8|Tolak halus~r+1 s+1
*|t_belajar>2|Bu Ratna merekomendasikanmu ikut olimpiade sekolah.|Terima~i+5 ratna+3 h-4|Tolak~m+2|Ajak Dina jadi tim~dina+3 i+2
*|t_bolos>1|Raka tertangkap bolos dan menyebut namamu saat ditanya.|Bantu menjelaskan~raka+3 r-3 #jujur|Bantah keras~raka-4 s-1|Datang ke BK~budi+1 r-2
*|d>2|Seseorang menaruh surat izin palsu di tasmu.|Simpan~^surat r-2|Buang~r+2|Laporkan~budi+2 r+3
*|d>3|Teman mengajak taruhan kecil saat main kartu.|Ikut taruhan 3rb~c-3 m+3 r-3|Tolak~r+2|Menonton saja~s+1`);
const RZ=`k|tas|Razia tas! Pak Budi dan pengurus OSIS masuk kelas dan memeriksa isi tas satu per satu.
l|atribut|Apel dadakan di lapangan: Pak Budi memeriksa rambut, kuku, dan atribut seragam setiap siswa.
k|hp|Razia ponsel: semua diminta mengumpulkan HP ke kotak di depan kelas.
t|umum|Razia di taman belakang! Pak Budi muncul dari balik pagar mencari siswa yang bersembunyi.
c|umum|Sidak kantin: Pak Budi mencari siswa yang bolos jam pelajaran.
k|umum|Razia laci: semua berdiri di samping meja saat laci diperiksa satu per satu.`.split('\n').map(l=>l.split('|'));
const AM={k:['Kelas terasa tenang. Kamu merapikan meja.','Papan tulis penuh rumus. Waktu berjalan pelan.'],c:['Aroma gorengan memenuhi kantin.','Mbak Yanti menyapamu dari balik etalase.'],b:['Lorong BK sunyi. Papan pengumuman penuh jadwal.','Pak Budi sedang menulis sesuatu di mejanya.'],l:['Angin bertiup di lapangan. Beberapa siswa pemanasan.','Bola menggelinding melewatimu.'],p:['Kipas tua berderit pelan saat kamu membaca.','Sinar matahari jatuh di meja baca.'],t:['Pepohonan bergoyang pelan. Kamu menikmati jeda.','Taman belakang lengang dan adem.'],g:['Gerbang ramai oleh siswa yang lalu-lalang.','Satpam menyapa dengan anggukan.']};
const IN=[['tembak',/tembak|nembak|sayang|cinta|jadian|pacar|pacaran/],['maaf',/maaf|sorry|ampun/],['bolos',/bolos|kabur|cabut|warnet/],['nyontek',/contek|nyontek|jawaban|salin/],['sogok',/sogok|suap|tutup mulut|uang damai/],['hadiah',/hadiah|bunga|cokelat|coklat|kado|traktir/],['ajak',/ajak|jalan|nonton|bareng/],['puji',/cantik|ganteng|keren|manis|hebat|pintar|baik banget/],['minta',/minta|pinjam|utang|ngutang/],['bantu',/bantu|tolong|biar aku/],['curhat',/curhat|sedih|capek|galau|cerita|bingung/],['belajar',/belajar|ujian|\bpr\b|tugas|soal|buku/],['berantem',/hajar|pukul|berantem|tantang|lawan/],['gosip',/gosip|rumor|kabar/],['bohong',/bohong|alasan|pura-pura|ngeles/],['canda',/wkwk|haha|lucu|bercanda|iseng|receh/],['salam',/halo|hai|\bhi\b|pagi|siang|sore|selamat/]];
const RS={
talk:['T+1','','Hmm, iya juga ya.','Oh gitu… terus?'],
salam:['T+1 s+1','m-1','Halo juga! Senang ketemu kamu.','Hmm, iya… halo.'],
puji:['T+3 m+2','T-2 s-1','Eh? Makasih ya, jadi malu.','Basa-basi banget deh.'],
ajak:['T+3 s+2','T-1','Boleh! Seru juga kayaknya.','Lain kali aja ya, aku lagi sibuk.'],
minta:['c+4 T-1 #utang','T-3 m-2','Nih, jangan lupa dikembalikan ya.','Maaf, nggak bisa.'],
bantu:['T+3 s+2 h-3 #bantu','T-1','Wah, makasih banget sudah mau bantu!','Nggak usah, aku bisa sendiri.'],
curhat:['m+7 T+3 #curhat','m-3 T-1','Aku dengerin kok. Pelan-pelan aja ceritanya.','Duh, aku lagi buru-buru. Nanti ya.'],
belajar:['i+4 T+2 #belajar','i+1','Ayo belajar bareng, aku bantu jelasin.','Kayaknya belum nyambung… coba lagi nanti.'],
canda:['m+4 T+2 s+1','T-1 s-1','Hahaha receh banget, tapi lucu!','…garing. Tapi nggak apa-apa.'],
gosip:['s+3 T+1 r-1 #gosip','T-3 r-2','Serius?! Ceritain lebih lengkap dong!','Aku nggak ***** ngomongin orang.'],
bohong:['r-2 m+2 #nakal','r-5 T-3 #nakal #ketahuan','Oh begitu ya… oke, aku percaya.','Aku tahu kamu bohong. Jangan diulang.'],
berantem:['s+3 r-10 h-6 #berantem','r-14 h-9 T-4 #berantem #ketahuan','Kamu menang adu mulut dan semua menoleh…','Keributan pecah! Guru langsung datang.'],
nyontek:['i+4 r-4 #nyontek ^contekan','r-8 T-3 #nyontek #ketahuan','Nih, lihat cepat sebelum ada yang lihat.','Eh, nggak boleh! Aku laporkan nih.'],
bolos:['m+6 r-10 #bolos T+1','r-8 T-2 #bolos #ketahuan','Ayo cabut, lewat belakang!','Nggak mau. Kamu juga jangan bolos.'],
sogok:['r-4 s+1 #nakal','r-12 T-5 #nakal #ketahuan','…baiklah, kali ini kuanggap tidak ada apa-apa.','Kamu mau menyuap saya?! Ke ruang BK sekarang.'],
hadiah:['c-3 T+4 m+2','T-1','Ya ampun, buat aku? Makasih banyak!','Eh… nggak usah repot-repot.'],
maaf:['r+2 m+3 T+4 #jujur','T+1','Iya, aku maafin. Makasih sudah jujur.','Hmm… aku masih kesal.']};
const ENDS=[
['dropout','Gerbang yang Tertutup',()=>S.r<=0,'Catatan pelanggaran menumpuk sampai sekolah mengambil keputusan berat.'],
['burnout','Jeda yang Terlambat',()=>S.h<=0||S.m<=0,'Tubuh dan pikiranmu minta berhenti. Kesehatan lebih penting dari apa pun.'],
['skors','Langganan Ruang BK',()=>tc('ketahuan')>=5,'Terlalu sering ketahuan, sekolah menskorsmu panjang.'],
['dua','Dua Hati, Satu Tas',()=>S.pacar&&tc('selingkuh')>=1,'Menjalin dengan dua hati berbuah drama yang dibicarakan satu sekolah.'],
['dina','Payung untuk Berdua',()=>S.pacar==='dina','Lima hari yang hangat berakhir dengan payung dan senyum Dina.'],
['siska','Rapat Dua Hati',()=>S.pacar==='siska','Ketua OSIS yang ambisius ternyata menyimpan ruang untukmu.'],
['arga','Kapten dan Kamu',()=>S.pacar==='arga','Kak Arga resmi menjadikanmu pendukung nomor satunya.'],
['naya','Kanvas Berdua',()=>S.pacar==='naya','Naya melukis cerita kalian dengan warna paling cerah.'],
['patah','Patah Hati Berseri',()=>tc('ditolak')>=2&&!S.pacar,'Dua kali ditolak, tapi kamu tetap berdiri dan tersenyum.'],
['hampir','Hampir Jadi',()=>!S.pacar&&Math.max(R('dina'),R('siska'),R('arga'),R('naya'))>=14,'Begitu dekat, tetapi tak ada kata yang terucap.'],
['ninja','Bayangan Anti Razia',()=>tc('lolos_razia')>=2,'Razia datang dan pergi tanpa bisa menyentuhmu.'],
['kucing','Kucing-Kucingan Pak Budi',()=>tc('lolos_razia')>=1&&tc('ketahuan')>=2,'Kadang lolos, kadang ketahuan. Pak Budi hafal wajahmu.'],
['bolos','Raja Bolos',()=>tc('bolos')>=3,'Warnet dan belakang sekolah adalah kerajaanmu.'],
['joki','Joki Kelas',()=>tc('nyontek')>=3,'Contekanmu legendaris, hati nuranimu tidak.'],
['legenda','Legenda Lapangan',()=>tc('berantem')>=2,'Namamu disebut-sebut tiap ada keributan.'],
['tobat','Tobat di Tikungan',()=>tc('berantem')+tc('nakal')+tc('bolos')>=2&&tc('jujur')>=2,'Pernah salah jalan, tetapi memilih jujur dan berbalik.'],
['juara','Juara Umum',()=>S.i>=70&&S.r>=50,'Nilaimu melesat dan namamu terpampang di papan prestasi.'],
['kutu','Kutu Buku Sejati',()=>tc('belajar')>=4&&S.i>=50,'Perpustakaan serasa rumah keduamu.'],
['ketua','Ketua Baru',()=>tc('osis')>=2||(R('siska')>=14&&S.s>=50),'Kamu dipercaya memimpin dan Siska mengangguk bangga.'],
['emas','Hati Emas Sekolah',()=>tc('dermawan')+tc('bantu')>=4,'Semua orang punya cerita tentang kebaikanmu.'],
['sultan','Sultan Kantin',()=>tc('kerja')>=3&&S.c>=50000,'Dompetmu tebal dan Mbak Yanti menyimpan kursi untukmu.'],
['utang','Catatan Utang Mbak Yanti',()=>tc('utang')>=2,'Namamu tercatat paling tebal di buku Mbak Yanti.'],
['geng','Geng Bangku Belakang',()=>R('raka')>=18,'Kamu dan Raka melewati kekacauan sambil saling menjaga.'],
['kuat','Kuat Karena Bercerita',()=>tc('curhat')>=2&&S.m>=65,'Berbagi beban membuatmu lebih kuat dari dugaan.'],
['gosip','Selebriti Mading',()=>tc('gosip')>=3,'Kabar tentangmu selalu lebih cepat dari bel pulang.'],
['atlet','Atlet Harapan',()=>tc('olahraga')>=3&&S.h>=55,'Pelatih mulai melirikmu untuk tim sekolah.'],
['budi','Murid Kesayangan Pak Budi',()=>R('budi')>=12,'Pak Budi tersenyum tipis setiap kali melihatmu.'],
['teladan','Siswa Teladan Murni',()=>tc('ketahuan')===0&&S.r>=85,'Catatanmu bersih tanpa noda sehari pun.'],
['bintang','Bintang Pergaulan',()=>S.s>=75,'Hampir semua orang menyapamu di koridor.'],
['nakal','Anak Nakal Berhati Baik',()=>tc('nakal')>=3,'Usil, tapi tak pernah kehilangan hati.'],
['seimbang','Rapor Penuh Warna',()=>S.i>=45&&S.m>=45&&S.h>=45&&S.s>=40,'Belajar, berteman, istirahat, semuanya seimbang.'],
['biasa','Sampai Jumpa di Koridor',()=>true,'Tidak semua cerita harus jadi legenda. Bab berikutnya menunggu.']];
const KEY='5days_v2';
const ld=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{e:[],n:[]}}catch(e){return{e:[],n:[]}}};
const sv=c=>{try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}};
const seen=id=>{const c=ld();if(!c.e.includes(id)){c.e.push(id);sv(c)}};
const col=()=>{const c=ld();$('coll').textContent='Koleksi: '+c.n.length+'/'+ENDS.length+' ending · '+c.e.length+'/'+(EV.length+RZ.length)+' kejadian'};
let S;
const tc=k=>S.tg[k]||0,R=n=>S.rel[n]||0;
// ---------- tampilan ----------
$('hud').innerHTML=ST.map(([k,e,c])=>'<div class="m" id="m'+k+'" style="--c:'+c+'"><span>'+e+'</span><b></b><i><u></u></i></div>').join('');
const put=e=>{$('feed').append(e);$('feed').scrollTop=1e6};
const fxc=(a,chips)=>{if(chips&&chips.length){const f=mk('div','fx');chips.forEach(([t,s])=>f.append(mk('span',s>0?'up':s<0?'dn':'',t)));a.append(f)}};
function add(cls,text,chips){
if(cls==='you'){put(mk('div','you',text));return}
if(cls==='sys'){put(mk('div','sys',text));return}
if(cls==='sep'){put(mk('div','sep',text));return}
const a=mk('article','dm nd'+(cls==='res'?' res':''));a.append(mk('p','',text));fxc(a,chips);put(a)}
function say(N,line,roll,sc,chips){const a=mk('article','dm'),L=sc>=19?['#7c4dff','LUAR BIASA']:sc>=11?['#2bb673','BERHASIL']:sc>=7?['#d9534f','GAGAL']:['#8a1f3a','GAGAL PARAH'],d=mk('div','dice');d.style.setProperty('--dc',L[0]);d.append(mk('b','',roll),mk('small','',L[1]));a.append(d,mk('p','',N.e+' '+N.n+': “'+line+'”'));fxc(a,chips);put(a)}
function choices(arr){const h=$('ch');h.innerHTML='';arr.forEach(([l,fn,dis])=>{const b=mk('button','',l);b.type='button';b.disabled=!!dis;b.onclick=fn;h.append(b)});$('sg').innerHTML=''}
const clr=()=>{$('ch').innerHTML=''};
function sug(){const g=$('sg');g.innerHTML='';if(S.busy||S.over)return;
const chip=(t,fn)=>{const b=mk('button','',t);b.type='button';b.onclick=fn;g.append(b)};
S.cur.forEach(n=>chip('💬 '+NP[n].n,()=>{$('in').value='halo '+n+' ';$('in').focus()}));
ZL.forEach(z=>chip((z===S.loc?'📍 ':'🚶 ')+LN[z],()=>go(z)));
chip('📖 Belajar',()=>act('study'));chip('☕ Istirahat',()=>act('rest'));chip('🪙 Kerja',()=>act('work'));chip('⏭ Lanjut',wait)}
function hud(){$('loc').textContent='📍 '+LN[S.loc]+' · '+S.wx;$('cash').textContent='Rp'+S.c.toLocaleString('id-ID');
$('days').innerHTML=[1,2,3,4,5].map(n=>'<i class="'+(n<S.day?'done':n===S.day?'now':'')+'">Hari '+n+'</i>').join('');
$('slots').innerHTML=S.timeline.map((phase,i)=>'<i class="'+(i<S.slot?'done':i===S.slot?'now':'')+'">'+SL[phase]+'</i>').join('');
ST.forEach(([k])=>{const el=$('m'+k);el.querySelector('b').textContent=S[k];el.querySelector('u').style.width=S[k]+'%'});
$('bag').innerHTML='🎒 '+(S.inv.length?S.inv.map(x=>(IT[x]||'📦')+' '+x).join(' · '):'kosong');
$('rel').innerHTML=Object.keys(NP).map(k=>'<div class="rl"><span>'+NP[k].e+' '+NP[k].n+(S.pacar===k?' 💗':'')+'</span><i><u style="width:'+cl((S.rel[k]+10)*3)+'%"></u></i><em>'+S.rel[k]+'</em></div>').join('');
sug()}
// ---------- mesin ----------
function ok(c){return!c||c.split(',').every(q=>{const m=q.match(/^([a-z_]+)([<>])(-?\d+)$/);if(!m)return true;const k=m[1],n=+m[3];let v;
if(k==='d')v=S.day;else if(k==='c')v=S.c/1000;else if(k.length===1&&'himrs'.includes(k))v=S[k];else if(k.startsWith('t_'))v=tc(k.slice(2));else v=R(k);
return m[2]==='>'?v>n:v<n})}
function fx(str,T){const o=[];String(str||'').split(' ').filter(Boolean).forEach(k=>{let m;
if(m=k.match(/^([himrs])([+-]\d+)$/)){const v=+m[2];S[m[1]]=cl(S[m[1]]+v);o.push([LB[m[1]]+' '+(v>0?'+':'−')+Math.abs(v),v>0?1:-1])}
else if(m=k.match(/^c([+-]\d+)$/)){const v=+m[1]*1000;S.c=Math.max(0,S.c+v);o.push(['Uang '+(v>0?'+':'−')+Math.abs(m[1])+'rb',v>0?1:-1])}
else if(m=k.match(/^T([+-]\d+)$/)){if(T&&+m[1]){S.rel[T]=cl(S.rel[T]+ +m[1],-30,100);o.push(['♥ '+NP[T].n+' '+(m[1]>0?'+':'−')+Math.abs(m[1]),m[1]>0?1:-1])}}
else if((m=k.match(/^([a-z]+)([+-]\d+)$/))&&NP[m[1]]){if(+m[2]){S.rel[m[1]]=cl(S.rel[m[1]]+ +m[2],-30,100);o.push(['♥ '+NP[m[1]].n+' '+(m[2]>0?'+':'−')+Math.abs(m[2]),m[2]>0?1:-1])}}
else if(k[0]==='#'){S.tg[k.slice(1)]=tc(k.slice(1))+1}
else if(k[0]==='^'){const it=k.slice(1);if(!S.inv.includes(it))S.inv.push(it);o.push(['🎒 +'+it,0])}
else if(k[0]==='_'){S.inv=S.inv.filter(x=>x!==k.slice(1))}
else if(k[0]==='@'){const id=k.slice(1);if(S.pacar&&S.pacar!==id){S.rel[S.pacar]=cl(S.rel[S.pacar]-8,-30,100);S.tg.selingkuh=tc('selingkuh')+1}S.pacar=id;S.tg.pacar=tc('pacar')+1;o.push(['💗 Jadian: '+NP[id].n,1])}});
return o}
const cost=s=>(s||'').split(' ').reduce((a,k)=>{const m=k.match(/^c-(\d+)$/);return a+(m?m[1]*1000:0)},0);
function pres(){S.pres={};for(const k in PR)S.pres[k]=PR[k].filter(()=>k==='b'||Math.random()<.7)}
function newGame(){S={day:1,slot:0,h:85,m:75,i:20,r:70,s:20,c:15000,rel:{ratna:0,budi:0,raka:8,siska:0,yanti:2,dina:0,arga:0,naya:0},tg:{},pacar:'',inv:['ponsel'],ev:[],rz:[2,3,4,5].sort(()=>Math.random()-.5).slice(0,2).map(d=>[d,1+(Math.random()*2|0),false]),loc:'g',cur:[],pres:{},used:false,chat:false,busy:false,over:false,wx:pick(WX)};
planDay();pres();S.cur=S.pres.g;$('ov').hidden=true;$('feed').innerHTML='';clr();
add('sep','HARI 1 · '+SL[S.timeline[0]].toUpperCase());
add('nar','Senin pagi di SMA Nusantara. Kamu berdiri di gerbang. Narator membuka '+S.limit+' babak hari ini dan memperkirakan '+S.eventGoal+' kejadian penting—alur dapat berubah karena pilihanmu. Waktu berjalan berurutan; pilih tempat, bertindak, atau bicara.');
if(S.cur.length)add('sys','Di sini: '+S.cur.map(n=>NP[n].e+' '+NP[n].n).join(', '));
hud();$('in').focus()}
function adv(){S.slot++;S.chat=false;
if(S.slot>=S.limit){S.slot=0;S.day++;if(S.day>5){finish();return}S.h=cl(S.h+10);S.m=cl(S.m+2);S.wx=pick(WX);add('sys','🌙 Kamu tidur nyenyak: stamina +10, mental +2.');planDay();add('nar','Narator menyusun hari baru: '+S.limit+' babak berurutan, dengan ruang untuk sekitar '+S.eventGoal+' kejadian penting.')}
S.used=false;pres();S.cur=S.pres[S.loc]||[];add('sep','HARI '+S.day+' · '+SL[S.timeline[S.slot]].toUpperCase());hud()}
function spend(){if(S.used){adv();if(S.over)return false}S.used=true;return true}
function wait(){if(S.busy||S.over)return;adv()}
function checkOver(){if(S.over)return;if(S.r<=0||S.h<=0||S.m<=0||tc('ketahuan')>=5)finish()}
function go(z){if(S.busy||S.over)return;if(!spend())return;S.loc=z;S.cur=S.pres[z]||[];
add('sys','📍 '+LN[z]+(S.cur.length?' · ada '+S.cur.map(n=>NP[n].e+' '+NP[n].n).join(', '):' · sepi'));
const rzT=S.rz.find(x=>x[0]===S.day&&x[1]===S.slot&&!x[2]);if(rzT){rzT[2]=true;razia();hud();return}
const pool=EV.filter(e=>(e.l===z||e.l==='*')&&!S.ev.includes(EV.indexOf(e))&&ok(e.c));
const finalBeat=S.slot===S.limit-1,needsScene=S.dayEvents<S.eventGoal;
if(pool.length&&(Math.random()<.62||(finalBeat&&needsScene))){const e=pick(pool),id=EV.indexOf(e);S.ev.push(id);S.dayEvents++;seen(id);showEv(e)}
else{add('nar',pick(AM[z]));checkOver()}
hud()}
function sceneText(){
const phase=SL[S.timeline[S.slot]]||'Pagi';
const weather={Cerah:'Cahaya matahari jatuh di lantai dan membuat bayangan jendela tampak panjang.',Mendung:'Langit kelabu membuat cahaya terasa lembut dan redup.',Gerimis:'Rintik hujan terdengar di atap; beberapa orang sesekali melirik ke luar.',Berangin:'Angin menyusup lewat jendela, menggerakkan kertas dan dedaunan.'}[S.wx]||'';
const place={k:'Bangku-bangku berjajar menghadap papan tulis. Obrolan kecil bercampur dengan bunyi kursi bergeser.',c:'Kantin ramai oleh bunyi baki, obrolan, dan aroma makanan hangat. Antrean bergerak pelan di antara meja.',b:'Lorong ruang BK lebih sunyi daripada bagian sekolah lain. Langkah kaki sesekali terdengar mendekat.',l:'Lapangan terbuka dipenuhi bunyi sepatu dan seruan siswa. Angin membawa debu tipis dari tepi lapangan.',p:'Perpustakaan terasa hening; hanya halaman buku, kipas tua, dan langkah pelan yang terdengar.',t:'Pepohonan menaungi taman belakang. Suara sekolah terdengar samar dari kejauhan.',g:'Gerbang sekolah sibuk oleh siswa yang datang dan pergi, sementara satpam mengawasi arus orang.'}[S.loc]||'Suasana sekolah terasa hidup di sekelilingmu.';
const people=S.cur.map(n=>NP[n]&&NP[n].n).filter(Boolean);let who='';if(people.length)who=' Di dekatmu ada '+(people.length===1?people[0]:people.slice(0,-1).join(', ')+' dan '+people[people.length-1])+', bersama siswa lain yang mulai memperhatikan.';
return phase+'. '+place+' '+weather+who;
}
function showEv(e){S.currentEvent=e.t;const a=mk('div','ev');a.append(mk('b','',(/dina|siska|arga|naya/.test(e.c||'')?'💌 ':'🔔 ')+'KEJADIAN · '+LN[S.loc].toUpperCase()),mk('p','scene',sceneText()),mk('span','',e.t));put(a);S.busy=true;
choices(e.ch.map(c=>[c[0],()=>choose(c),cost(c[1])>S.c]))}
function checkChoice(c){const text=(c[0]+' '+(S.currentEvent||'')).toLowerCase();let stat='s';
if(/belajar|ujian|soal|rumus|buku|catatan|tugas|kuis|jawaban/.test(text))stat='i';
else if(/lari|kabur|basket|lari|angkat|olahraga|main total|sprint/.test(text))stat='h';
else if(/jujur|mengaku|lapor|aturan|serahkan|disiplin|maaf|mengakui/.test(text))stat='r';
else if(/tenang|istirahat|curhat|menahan|fokus|sabar/.test(text))stat='m';
let dc=10;
if(/bolos|nyontek|sogok|bohong|kabur|jual diam|curi|serobot|berantem|hajar|palsu/.test(text))dc+=4;
if(/ujian|lomba|pertandingan|pidato|ketua|rahasia|razia|dihukum/.test(text))dc+=2;
if(/bantu|minta maaf|mengalah|dengarkan|temani|serahkan ke guru/.test(text))dc-=1;
if(stat==='h'&&S.h<35)dc+=2;if(stat==='m'&&S.m<35)dc+=2;if(stat==='i'&&S.i<25)dc+=2;
dc=cl(dc,8,18);const mod=cl(Math.floor((S[stat]-50)/10),-3,5),roll=d20(),total=roll+mod;
return{stat,mod,roll,total,dc,success:roll===20||(roll!==1&&total>=dc),critical:roll===20||roll===1}}
function scaleEffects(source,success){if(success)return source;return String(source||'').split(' ').map(k=>{let m;if((m=k.match(/^([himrs])([+-])(\d+)$/))){const n=+m[3];return m[1]+m[2]+(m[2]==='+'?Math.max(1,Math.ceil(n*.5)):n+Math.ceil(n*.5))}if((m=k.match(/^([a-z]+)([+-])(\d+)$/))&&NP[m[1]]){const n=+m[3];return m[1]+m[2]+(m[2]==='+'?Math.max(1,Math.ceil(n*.5)):n+Math.ceil(n*.5))}if((m=k.match(/^c([+-])(\d+)$/))){const n=+m[2];return 'c'+m[1]+(m[1]==='+'?Math.max(1,Math.ceil(n*.5)):n+Math.ceil(n*.5))}return k}).join(' ')}
function aftermath(action,success,critical,eventText=''){
const t=(action+' '+eventText).toLowerCase();
const who=Object.keys(NP).find(k=>t.includes(k))||Object.keys(NP).find(k=>t.includes(NP[k].n.toLowerCase()));
const name=who?NP[who].n:'';
const place=LN[S.loc]||'sekolah';
let line;
if(/berantem|hajar|pukul|serang|dorong|lawan|tantang/.test(t))line=success?'Suasana langsung pecah: beberapa siswa mundur, sementara guru piket bergegas memisahkan kalian. Kejadian ini akan jadi bahan pembicaraan setelah bel.':'Gerakanmu meleset dan keadaan berbalik. Kamu kehilangan momentum; orang-orang mulai memanggil guru sebelum masalah membesar.';
else if(/bohong|pura-pura|ngeles|alasan|tuduh|kambing hitam/.test(t))line=success?'Alasanmu diterima untuk saat ini, tetapi beberapa orang saling bertukar pandang. Mereka akan mengingat ceritamu jika ada bukti yang berbeda.':'Ceritamu tidak meyakinkan. Suasana menjadi canggung dan orang yang kamu hadapi mulai mengawasimu lebih dekat.';
else if(/bolos|kabur|menyelinap|sembunyi|curi|diam-diam/.test(t))line=success?'Kamu berhasil menjauh dari keramaian tanpa menarik perhatian. Namun, tempat yang kamu tuju membuatmu kehilangan kesempatan mengikuti kegiatan di '+place+'.':'Langkahmu terdengar di lorong. Seorang siswa menoleh dan petugas mulai mencari sumber keributan; jalan keluar itu tak lagi terasa aman.';
else if(/maaf|mengaku|jujur|lapor|serahkan|jelaskan/.test(t))line=success?'Kamu menyampaikan semuanya tanpa mengelak. Ketegangan mereda; orang-orang kini tahu apa yang sebenarnya terjadi dan siapa yang bertanggung jawab.':'Kamu mencoba menjelaskan, tetapi suasana telanjur panas. Mereka meminta bukti atau penjelasan lebih lanjut sebelum mau percaya.';
else if(/bantu|tolong|menolong|temani|antar|selamatkan|bagi tugas/.test(t))line=success?(name?name+' menerima bantuanmu dan beban yang tadi ditanggungnya kini terbagi. Ia mengangguk lega; hubungan kalian terasa lebih akrab.':'Bantuanmu membuat keadaan lebih terkendali. Siswa di sekitar ikut bergerak, dan masalah yang tadi menghambat kegiatan mulai selesai.'):(name?'Kamu berusaha membantu '+name+', tetapi caramu belum menyelesaikan masalah. Ia tetap harus mengurus bagian yang tersisa sendiri.':'Niatmu baik, tetapi bantuanmu datang terlambat atau kurang tepat. Masalahnya belum selesai dan orang-orang masih menunggu langkah berikutnya.');
else if(/belajar|baca|membaca|meneliti|periksa|menyelidiki|cari tahu|kerjakan|soal|kuis/.test(t))line=success?'Kamu menemukan petunjuk penting dari '+(eventText||'situasi di sekitarmu')+'. Setelah memeriksa detailnya, kamu tahu langkah berikutnya dan tidak lagi menebak-nebak.':'Konsentrasimu buyar oleh keadaan di '+place+'. Kamu belum mendapat jawaban, sementara waktu untuk menyelesaikannya terus berkurang.';
else if(/istirahat|tidur|rehat|duduk santai/.test(t))line=success?'Kamu menepi dari keramaian dan memberi tubuh waktu untuk pulih. Saat kembali memperhatikan sekitar, keadaan sudah sedikit lebih tenang.':'Kamu mencoba beristirahat, tetapi suara dan urusan di sekelilingmu terus mengganggu. Jeda singkat itu tak cukup untuk benar-benar lepas dari masalah.';
else if(/beli|membeli|jajan|traktir|bayar|patungan/.test(t))line=success?'Uang berpindah tangan dan urusan itu selesai. Orang yang menerima pemberianmu tersenyum, sementara teman-teman di dekatmu ikut memperhatikan gestur tersebut.':'Transaksi itu tidak berjalan mulus. Ada yang salah paham soal uang atau barang, jadi kamu harus membereskannya sebelum pergi.';
else if(/ajak|mengajak|tanya|bertanya|bicara|ngobrol|puji|memuji|dengarkan|curhat/.test(t))line=success?(name?name+' menanggapi dengan lebih terbuka. Obrolan kalian menarik perhatian beberapa siswa, tetapi untuk sesaat kalian bisa bicara tanpa terburu-buru.':'Seseorang di dekatmu menyambut percakapan itu. Suasana yang semula kaku mencair dan orang-orang mulai menanggapi satu sama lain.'):(name?name+' menjawab singkat lalu kembali pada urusannya. Kamu belum mendapat respons yang diharapkan; mungkin perlu pendekatan lain.':'Percakapan terpotong oleh kesibukan di sekitar. Tak ada yang tersinggung, tetapi maksudmu belum tersampaikan.');
else if(/lari|sprint|kejar|hindari|menghindar|latihan|berlatih|olahraga|basket/.test(t))line=success?'Kamu bergerak cepat dan berhasil mencapai tujuan lebih dulu. Beberapa siswa memberi jalan, meski napasmu mulai berat.':'Kakimu tersandung atau kehilangan ritme. Kamu tetap sampai, tetapi terlambat dan perhatian orang-orang tertuju padamu.';
else line=success?'Pilihanmu mengubah suasana di '+place+'. Orang-orang bereaksi terhadap tindakanmu, dan urusan yang sedang berlangsung bergerak ke tahap berikutnya.':'Tindakanmu menemui hambatan di '+place+'. Keadaan tidak berhenti, tetapi kini kamu harus menghadapi akibat dari rencana yang kurang berhasil.';
if(critical)line+=' Keberhasilanmu begitu meyakinkan sehingga beberapa orang langsung menawarkan bantuan.';
return line
}
function choose(c){clr();add('you',c[0]);const check=checkChoice(c),effect=scaleEffects(c[1],check.success);let ch=fx(effect);
if(check.critical&&check.roll===20)ch=ch.concat(fx(check.stat+'+2'));
if(!check.success&&check.roll===1){ch=ch.concat(fx('m-2'));if(/bolos|nyontek|sogok|bohong|kabur|jual diam|curi|berantem|hajar/.test(c[0].toLowerCase()))ch=ch.concat(fx('r-2 #ketahuan'))}
add('sys','🎲 d20 '+check.roll+(check.mod>=0?' + ':' − ')+Math.abs(check.mod)+' '+LB[check.stat]+' = '+check.total+' · DC '+check.dc+' ('+(check.success?'berhasil':'gagal')+')');
add('res',aftermath(c[0],check.success,check.roll===20,S.currentEvent),ch);
S.currentEvent='';S.busy=false;hud();checkOver()}
function razia(){const ri=Math.random()*RZ.length|0,[l,tp,tx]=RZ[ri];seen(100+ri);S.loc=l;S.cur=S.pres[l]||[];
const risk=S.inv.filter(x=>x!=='ponsel'||tp==='hp'||tp==='tas');if(tp==='atribut'&&S.r<55)risk.push('atribut');
const a=mk('div','ev rz');a.append(mk('b','','🚨 RAZIA!'),mk('span','',tx+(risk.length?' Kamu membawa: '+risk.join(', ')+'.':' Tasmu bersih.')));put(a);S.busy=true;
if(!risk.length){add('res','Pak Budi mengangguk puas. Kamu lolos dengan bersih.',fx('r+3 budi+2 m+2'));S.busy=false;return}
const fin=k=>{clr();const n=risk.length,roll=d20();let win=false,f;
if(k===0){S.inv=S.inv.filter(x=>!risk.includes(x));add('res','Kamu menyerahkan semuanya dan Pak Budi mencatat dengan teliti.',fx('r-3 m-2 budi+2 #jujur #ketahuan'))}
else{win=k===1?roll+(S.s>=40?2:0)+(S.i>=40?1:0)-(n>1?3:0)>=12:k===2?roll+(S.h>=50?3:0)>=13:roll+Math.floor(R('budi')/4)>=18;
if(k===3)fx('c-5');
if(win){f=fx('#lolos_razia '+(k===1?'m+3':k===2?'m+4 #nakal':'r-4 #nakal'));add('res','🎲 '+roll+' Berhasil! '+(k===1?'Barangmu tidak ketahuan.':k===2?'Kamu kabur sebelum diperiksa.':'Pak Budi pura-pura tidak melihat.'),f)}
else{S.inv=S.inv.filter(x=>!risk.includes(x));f=fx('r-'+(6+3*n)+' m-3 budi-'+(k===3?4:1)+' #ketahuan'+(k!==1?' #nakal':''));add('res','🎲 '+roll+' Gagal! Pak Budi menyita barangmu dan mencatat namamu.',f)}}
S.busy=false;hud();checkOver()};
choices([['Jujur dan serahkan',()=>fin(0)],['Sembunyikan barangmu',()=>fin(1)],['Kabur lewat jalan lain',()=>fin(2)],['Sogok Pak Budi (Rp5.000)',()=>fin(3),S.c<5000]])}
function talk(tx){if(S.busy||S.over)return;add('you',tx);
if(S.chat){add('sys','Kamu sudah mengobrol di waktu ini. Pindah tempat atau lanjut waktu.');return}
if(!S.cur.length){add('nar','Tidak ada siapa-siapa di sini. Kamu bergumam sendiri. Coba tempat lain.');return}
const low=tx.toLowerCase();let id=Object.keys(NP).find(k=>low.includes(k));
if(id&&!S.cur.includes(id)){add('nar',NP[id].n+' tidak ada di sini.');return}
if(!id)id=S.pacar&&S.cur.includes(S.pacar)?S.pacar:pick(S.cur);
const it=(IN.find(x=>x[1].test(low))||['talk'])[0],N=NP[id];
if(it==='hadiah'&&S.c<3000){add('nar','Uangmu tidak cukup untuk memberi hadiah.');return}
S.chat=true;const roll=d20(),sc=roll+(N.lk[it]||0)*2+Math.floor(R(id)/5);let line,f;
if(it==='tembak'){
if(!LOVE.includes(id)){f='T-2 s-2';line='Hah? Maksudnya apa? Aneh deh.'}
else if(S.pacar===id){f='T+1';line='Kita kan sudah jadian, hehe.'}
else if(R(id)>=11&&roll>=10){f='@'+id+' T+4 m+8';line=pick(['Aku juga sayang kamu… ayo jadian.','Iya. Aku mau.'])}
else{f='T-1 m-5 #ditolak';line=R(id)<11?'Kita belum sedekat itu… maaf ya.':'Maaf, aku belum siap.'}}
else{const r=RS[it]||RS.talk;if(sc>=11){f=r[0]+(sc>=19?' T+1 m+2':'');line=r[2]}else{f=r[1];line=r[3]}}
say(N,line+(Math.random()<.35?' '+pick(N.cp):''),roll,sc,fx(f,id));hud();checkOver()}
function act(k){if(S.busy||S.over)return;if(!spend())return;add('you',{study:'Belajar',rest:'Istirahat',work:'Cari uang'}[k]);
const A={study:['Kamu belajar mandiri. Catatan mulai masuk akal.','i+4 h-4 m-2 #belajar'],rest:['Kamu beristirahat dan menarik napas panjang.','h+14 m+4'],work:['Kamu membantu kerja ringan dan dapat uang saku.','c+7 h-5 s+1 #kerja']}[k];
const rzT=S.rz.find(x=>x[0]===S.day&&x[1]===S.slot&&!x[2]);if(rzT){rzT[2]=true;razia();hud();return}
add('nar',A[0],fx(A[1]));hud();checkOver()}
function freeAction(tx){
const low=tx.toLowerCase();
const rules=[
[/\b(bantu|menolong|tolong|selamatkan|temani|antar)\b/,'s','s+3 r+1 h-2 #bantu','Kamu mengulurkan bantuan dan mencoba menyelesaikannya bersama.'],
[/\b(minta maaf|meminta maaf|mengaku|jujur|jelaskan|laporkan|serahkan)\b/,'r','r+3 s+1 #jujur','Kamu memilih bersikap terbuka dan menjelaskan keadaan.'],
[/\b(bolos|kabur|menyelinap|sembunyi|bersembunyi|curi|mencuri)\b/,'r','m+2 r-2 #nakal','Kamu bergerak diam-diam, berusaha agar tak menarik perhatian.'],
[/\b(berantem|hajar|pukul|dorong|lawan|serang|tantang)\b/,'h','h-6 r-8 #berantem #ketahuan','Kamu bertindak keras; suasana sekitar langsung menegang.'],
[/\b(lari|sprint|kejar|mengejar|hindari|menghindar)\b/,'h','h-4 m+1','Kamu bergerak cepat melewati keramaian.'],
[/\b(belajar|membaca|baca|mengerjakan|kerjakan|meneliti|periksa|memeriksa|cari tahu|menyelidiki)\b/,'i','i+4 m-2 #belajar','Kamu memusatkan perhatian untuk mencari tahu atau memahami lebih banyak.'],
[/\b(istirahat|tidur|duduk santai|menenangkan diri|tarik napas)\b/,'m','h+8 m+4','Kamu berhenti sejenak untuk memulihkan tenaga dan menenangkan pikiran.'],
[/\b(latihan|berlatih|berolahraga|main basket|lempar|berlari)\b/,'h','h-4 s+2 #olahraga','Kamu mencoba latihan dengan tenaga yang tersisa.'],
[/\b(beli|membeli|jajan|traktir)\b/,'s','c-5 h+4 s+1','Kamu mengeluarkan uang untuk membeli sesuatu di sekitar.'],
[/\b(ambil|mengambil|angkat|memungut|bawa|membawa|kembalikan|mengembalikan)\b/,'s','s+1 #bantu','Kamu mendekati benda itu dan berusaha menanganinya dengan hati-hati.'],
[/\b(tanya|bertanya|ajak|mengajak|puji|memuji|hibur|bercanda|ngobrol|bicara)\b/,'s','s+2 m+1','Kamu mencoba membuka percakapan dengan orang di dekatmu.'],
[/\b(amati|mengamati|lihat|melihat|dengarkan|mendengarkan|ikuti|mengikuti)\b/,'i','i+2 m+1','Kamu mengamati keadaan sekitar sebelum menentukan langkah berikutnya.']
];
const rule=rules.find(([re])=>re.test(low));if(!rule)return false;
if(rule[1]==='s'&&rule[2].includes('c-5')&&S.c<5000){add('nar','Uangmu tidak cukup untuk melakukan itu.');return true}
if(!spend())return true;
add('you',tx);add('nar','Kamu mencoba: '+tx+'. '+sceneText());
const target=Object.keys(NP).find(k=>low.includes(k)&&S.cur.includes(k));
let effects=rule[2]+(target?' '+target+'+2':'');
const check=checkChoice([tx]),scaled=scaleEffects(effects,check.success);let chips=fx(scaled);
if(check.critical&&check.roll===20)chips=chips.concat(fx(check.stat+'+2'));
if(!check.success&&check.roll===1){chips=chips.concat(fx('m-2'));if(/bolos|kabur|menyelinap|sembunyi|curi|berantem|hajar|pukul|serang/.test(low))chips=chips.concat(fx('r-2 #ketahuan'))}
add('sys','🎲 d20 '+check.roll+(check.mod>=0?' + ':' − ')+Math.abs(check.mod)+' '+LB[check.stat]+' = '+check.total+' · DC '+check.dc+' ('+(check.success?'berhasil':'gagal')+')');
add('res',aftermath(tx,check.success,check.roll===20,S.currentEvent),chips);
hud();checkOver();return true
}
function submit(raw){const tx=raw.trim();if(!tx||S.over)return;if(S.busy){add('sys','Pilih salah satu opsi di atas dulu.');return}
const low=tx.toLowerCase(),nm=Object.keys(NP).find(k=>low.includes(k));
if(!nm){const pl=low.match(/gerbang|kelas|kantin|\bbk\b|ruang bk|lapangan|perpus|taman/);
if(pl&&/\b(ke|menuju|mampir|pergi|masuk|samperin|jalan)\b/.test(low)){add('you',tx);go(PLACE[pl[0]]);return}
if(/\b(istirahat|tidur|rehat)\b/.test(low)){act('rest');return}
if(/\b(kerja|cari uang|jualan)\b/.test(low)){act('work');return}
if(/\bbelajar\b/.test(low)){act('study');return}
if(/\b(lanjut|tunggu|skip)\b/.test(low)){add('you',tx);wait();return}}
if(freeAction(tx))return;
talk(tx)}
function finish(){if(S.over)return;S.over=true;clr();$('sg').innerHTML='';const e=ENDS.find(x=>x[2]()),dead=['dropout','burnout','skors'].includes(e[0]);
const X=[];if(S.pacar)X.push('Kamu menutup lima hari bersama '+NP[S.pacar].n+'.');if(tc('lolos_razia'))X.push('Kamu lolos razia '+tc('lolos_razia')+' kali.');if(tc('ketahuan'))X.push('Kamu ketahuan melanggar '+tc('ketahuan')+' kali.');if(tc('bolos'))X.push('Kamu bolos '+tc('bolos')+' kali.');if(tc('dermawan')+tc('bantu'))X.push('Kamu membantu orang '+(tc('dermawan')+tc('bantu'))+' kali.');
const c=ld(),fresh=!c.n.includes(e[0]);if(fresh){c.n.push(e[0]);sv(c)}col();
$('ov').innerHTML='<div class="card"><span class="badge" style="background:'+(dead?'var(--dn)':'var(--up)')+'">'+(dead?'GAME OVER':'LULUS · 5 HARI SELESAI')+'</span><h2>'+e[1]+'</h2><p>'+e[3]+' '+X.join(' ')+'</p><div class="rep"><span>📚 Pintar <b>'+S.i+'</b></span><span>🧠 Mental <b>'+S.m+'</b></span><span>❤️ Stamina <b>'+S.h+'</b></span><span>⚖️ Aturan <b>'+S.r+'</b></span><span>🤝 Sosial <b>'+S.s+'</b></span><span>🪙 Uang <b>'+S.c.toLocaleString('id-ID')+'</b></span></div><p class="hint">Ending '+c.n.length+'/'+ENDS.length+(fresh?' · BARU!':'')+' · Kejadian '+c.e.length+'/'+(EV.length+RZ.length)+'</p><button id="again">Main lagi</button></div>';
$('ov').hidden=false;$('again').onclick=newGame}
$('f').addEventListener('submit',e=>{e.preventDefault();const v=$('in').value;$('in').value='';submit(v)});
$('st').onclick=newGame;
S={day:1,slot:0,h:85,m:75,i:20,r:70,s:20,c:15000,rel:{ratna:0,budi:0,raka:8,siska:0,yanti:2,dina:0,arga:0,naya:0},tg:{},pacar:'',inv:['ponsel'],ev:[],rz:[],loc:'g',cur:[],pres:{},timeline:[0,1,2],limit:3,eventGoal:2,dayEvents:0,currentEvent:'',used:false,chat:false,busy:true,over:false,wx:'Cerah'};
hud();col();
})();
