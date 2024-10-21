import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeList: Recipe[] = [
		{
			id: 1,
			name: "Csak egy teszt, nincs itt semmi látnivaló. Én más vagyok imnt a többiek.",
			description: "Modi necessitatibus itaque aliquam repellat assumenda vitae. Ipsam hic eos voluptatem aliquam qui labore dolorum cupiditate. Minus nostrum aut facilis dolores ut voluptas nemo. Sint id ut explicabo. Libero tempore adipisci earum sint quia. Et officiis perferendis veniam rerum maxime.",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=uwu",
			categories: ["1", "2", "3", "4", "5", "6", "7"],
			time: 666,
			rating: 3.2,
			servings: 2,
			ingredients: [
				{title: "a tetejére", ingredientList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]},
			],
			instructions: [
				{text: "Sütsd meg a vajat, majd háladózjuk a csokit", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=007"]},
			],
		},
		{
			id: 2,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 3,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 4,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 5,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 6,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 7,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		{
			id: 8,
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			time: 15,
			rating: 4.6,
			servings: 8,
			ingredients: [
				{title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"]},
				{title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"]},
				{title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"]},
			],
			instructions: [
				{text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük"},
				{text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük."},
				{text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett"},
				{text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz."},
				{text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem."},
				{text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz."},
				{text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"]},
				{text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"]},
				{text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"]},
				{text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!"},
				{text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!"}
			],
		},
		
	]

  	constructor() { }

	getAllRecipes(): Recipe[] {    
		return this.recipeList;  
	}  

	getRecipeById(id: number): Recipe | undefined {    
		return this.recipeList.find((recipe) => 
			recipe.id === id
		);
	}
}
