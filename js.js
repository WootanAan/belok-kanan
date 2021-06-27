let posisi = [[0,-30],[0,-20],[0,-10]]
let arah = "keKanan"
let kecepatan = 500
let posisiMakanan = [angkaAcak(), angkaAcak()]
let posisiRacun = [angkaAcak(), angkaAcak()]
let skor = 0
let rotateDepan = 90
let skorTertinggi = 0

function mulai() {
	kecepatan = 500
	rotateDepan = 90
	skor = 0
	arah = "keKanan"
	posisi = [[0,-30],[0,-20],[0,-10]]
	jalan()
	document.getElementById('pembukaan').style = "display: none;"
	document.getElementById('kalah').style = "display: none;"
	document.getElementById('game').style = "opacity: 1;"
	document.addEventListener("keydown", keybord)
}

function jalan() {
	mengikuti()
	if (arah == "keKanan") {
		posisi[2][1] += 10
		rotateDepan = 90
	} else if (arah == "keBawah") {
		posisi[2][0] += 10
		rotateDepan = 180
	} else if (arah == "keKiri") {
		posisi[2][1] -= 10
		rotateDepan = -90
	} else if (arah == "keAtas") {
		posisi[2][0] -= 10
		rotateDepan = 0
	}
	tampil()
	cek()
}

function cek() {
	if (posisi[2][1] == 90 || posisi[2][0] == 90 || posisi[2][1] == -10 || posisi[2][0] == -10) {
		new Audio("araara.mp3").play();
		document.getElementById('kalah').style = "display: block;"
	} else {
		if ((posisiMakanan[0] * 10) == posisi[2][0] && (posisiMakanan[1] * 10) == posisi[2][1]) {
			skor += 1
			putarMusik();
			document.getElementById('skor').innerHTML = skor
			posisiMakanan[0] = angkaAcak()
			posisiMakanan[1] = angkaAcak()
		}
		if ((posisiRacun[0] * 10) == posisi[2][0] && (posisiRacun[1] * 10) == posisi[2][1]) {
			skor -= 1
			document.getElementById('skor').innerHTML = skor
			posisiRacun[0] = angkaAcak()
			posisiRacun[1] = angkaAcak()
		}
		if (kecepatan > 100) {
			kecepatan -= 2
		}
		setTimeout(jalan, kecepatan);
	}
}

function tampil() {
	document.getElementById('makanan').style = "left: "+(posisiMakanan[1]*10+2)+"vmin; top: "+(posisiMakanan[0]*10+2)+"vmin;"
	document.getElementById('racun').style = "left: "+(posisiRacun[1]*10+2)+"vmin; top: "+(posisiRacun[0]*10+2)+"vmin;"
	document.getElementById('belakang').style = "left: "+posisi[0][1]+"vmin; top: "+posisi[0][0]+"vmin;"
	document.getElementById('tengah').style = "left: "+posisi[1][1]+"vmin; top: "+posisi[1][0]+"vmin;"
	document.getElementById('depan').style = "left: "+posisi[2][1]+"vmin; top: "+posisi[2][0]+"vmin;transform: rotate("+rotateDepan+"deg);"
}

function mengikuti() {
	posisi[0][1] = posisi[1][1]
	posisi[0][0] = posisi[1][0]
	posisi[1][1] = posisi[2][1]
	posisi[1][0] = posisi[2][0]
}

function keybord(evt) {
	switch(evt.keyCode) {
		case 32:
			kemana();
			break;
	}
}

function kemana() {
	if (arah == "keKanan") {
		arah = "keBawah"
	} else if (arah == "keBawah") {
		arah = "keKiri"
	} else if (arah == "keKiri") {
		arah = "keAtas"
	} else if (arah == "keAtas") {
		arah = "keKanan"
	}
}

function angkaAcak() {
	return Math.floor(Math.random() * 9);
}

function putarMusik() {
	var musik = new Audio("musik.mp3")
	musik.play()
}

function sudah() {
	document.getElementById('game').style = "opacity: 0;"
	if (skor > skorTertinggi) {skorTertinggi = skor}
	document.getElementById('pembukaan').style = "display: block;"
	document.getElementById('skorTertinggiNilai').innerHTML = skorTertinggi
}